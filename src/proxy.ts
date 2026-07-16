import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  HERO_SOURCE_COOKIE,
  HERO_VARIANT_COOKIE,
  HERO_VISITOR_COOKIE,
  parseHeroVariant,
} from "@/lib/hero-experiment";

const THIRTY_DAYS = 60 * 60 * 24 * 30;
const ONE_YEAR = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const isXCampaign = request.nextUrl.searchParams.get("ref") === "x";
  const isPreview = parseHeroVariant(request.nextUrl.searchParams.get("variant")) !== null;

  if (!isXCampaign || isPreview) {
    return NextResponse.next();
  }

  const existingVariant = parseHeroVariant(request.cookies.get(HERO_VARIANT_COOKIE)?.value);
  const variant = existingVariant ?? (Math.random() < 0.5 ? "a" : "b");
  const visitorId = request.cookies.get(HERO_VISITOR_COOKIE)?.value ?? randomUUID();

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.searchParams.set("__ab", variant);

  const response = NextResponse.rewrite(rewriteUrl);
  const secure = request.nextUrl.protocol === "https:";
  const cookieDefaults = { httpOnly: true, sameSite: "lax" as const, secure, path: "/" };

  response.cookies.set(HERO_VARIANT_COOKIE, variant, { ...cookieDefaults, maxAge: THIRTY_DAYS });
  response.cookies.set(HERO_VISITOR_COOKIE, visitorId, { ...cookieDefaults, maxAge: ONE_YEAR });
  response.cookies.set(HERO_SOURCE_COOKIE, "x_launch", { ...cookieDefaults, maxAge: THIRTY_DAYS });

  return response;
}

export const config = {
  matcher: "/",
};
