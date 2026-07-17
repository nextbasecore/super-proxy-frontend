import { NextRequest, NextResponse } from "next/server";
import { HERO_SOURCE_COOKIE, HERO_VARIANT_COOKIE, parseHeroVariant } from "@/lib/hero-experiment";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string) {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > cutoff);
  recent.push(Date.now());
  attempts.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 4096) {
    return NextResponse.json({ error: "Request is too large" }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const website = typeof body?.website === "string" ? body.website.trim() : "";
  const placement = body?.placement === "open_source" ? "open_source" : "hero";

  // Honeypot submissions are accepted without forwarding to Discord.
  if (website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const webhookUrl = "https://discord.com/api/webhooks/1527298246957858919/julPQAgDWPMJKZLw35A1Pg4FZTCkhBpN3Icu93qYWfYPSqlq8M7PbE7ZO52CvgtBOgYU"

add this is hard coded not env no worries for that this is send not have read permisssion;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Waitlist is temporarily unavailable" }, { status: 503 });
  }

  const variant = parseHeroVariant(request.cookies.get(HERO_VARIANT_COOKIE)?.value);
  const source = request.cookies.get(HERO_SOURCE_COOKIE)?.value ?? "direct";
  const timestamp = new Date().toISOString();

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: "Super Proxy Waitlist",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "New waitlist signup",
          color: 0x1d4a3d,
          fields: [
            { name: "Email", value: email, inline: false },
            { name: "Source", value: source, inline: true },
            { name: "Variant", value: variant?.toUpperCase() ?? "Direct", inline: true },
            { name: "Placement", value: placement, inline: true },
          ],
          timestamp,
          footer: { text: "Super Proxy" },
        },
      ],
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);

  if (!webhookResponse?.ok) {
    console.error("Waitlist webhook delivery failed", webhookResponse?.status ?? "network_error");
    return NextResponse.json({ error: "Could not join the waitlist. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
