import { mkdir, appendFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  HERO_EXPERIMENT_ID,
  HERO_SOURCE_COOKIE,
  HERO_VISITOR_COOKIE,
  parseHeroVariant,
} from "@/lib/hero-experiment";

export const runtime = "nodejs";

const ALLOWED_EVENTS = new Set(["exposure", "primary_cta", "secondary_cta"]);
const MAX_LOG_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const event = typeof body?.event === "string" ? body.event : "";
  const variant = parseHeroVariant(body?.variant);
  const source = request.cookies.get(HERO_SOURCE_COOKIE)?.value ?? "direct";

  if (!ALLOWED_EVENTS.has(event) || !variant) {
    return NextResponse.json({ error: "Invalid experiment event" }, { status: 400 });
  }

  if (source !== "x_launch") {
    return NextResponse.json({ ignored: true }, { status: 202 });
  }

  const record = {
    timestamp: new Date().toISOString(),
    experiment: HERO_EXPERIMENT_ID,
    event,
    variant,
    visitorId: request.cookies.get(HERO_VISITOR_COOKIE)?.value ?? "unknown",
    source,
    path: typeof body?.path === "string" ? body.path.slice(0, 200) : "/",
  };

  const day = record.timestamp.slice(0, 10);
  const dataDirectory = path.join(process.cwd(), "data");
  const logFile = path.join(dataDirectory, `experiment-${day}.ndjson`);

  await mkdir(dataDirectory, { recursive: true });
  const currentSize = await stat(logFile).then((file) => file.size).catch(() => 0);
  if (currentSize < MAX_LOG_BYTES) {
    await appendFile(logFile, `${JSON.stringify(record)}\n`, "utf8");
  }

  if (process.env.AB_EVENT_WEBHOOK_URL) {
    await fetch(process.env.AB_EVENT_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
