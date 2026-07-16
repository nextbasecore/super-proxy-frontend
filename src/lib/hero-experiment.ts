export const HERO_EXPERIMENT_ID = "x-launch-hero-v1";
export const HERO_VARIANT_COOKIE = "sp_ab_hero";
export const HERO_VISITOR_COOKIE = "sp_ab_visitor";
export const HERO_SOURCE_COOKIE = "sp_ab_source";

export type HeroVariant = "a" | "b";

export type HeroCopy = {
  category: string;
  headline: string;
  headlineAccent: string;
  description: string;
  cta: string;
  microcopy: string;
  gatewayTitle: string;
  gatewaySubtitle: string;
  showBenefitStrip: boolean;
};

export const HERO_VARIANTS: Record<HeroVariant, HeroCopy> = {
  a: {
    category: "AI access management for small teams",
    headline: "AI subscriptions are cheap.",
    headlineAccent: "Managing them is chaos.",
    description:
      "Give every teammate their own API key — only the models admins approve, with usage limits and full visibility.",
    cta: "Join the waitlist",
    microcopy: "Opens a pre-filled email to request early access. No newsletters.",
    gatewayTitle: "Super Proxy Gateway",
    gatewaySubtitle: "OpenAI-compatible",
    showBenefitStrip: false,
  },
  b: {
    category: "AI access management for small dev teams",
    headline: "Stop sharing",
    headlineAccent: "AI logins.",
    description:
      "Connect your team’s approved AI providers and APIs once. Give every teammate an individual key, choose which models they can use, set limits, and see who used what.",
    cta: "Get the GitHub link",
    microcopy: "No spam. One email when the repository goes live.",
    gatewayTitle: "Super Proxy",
    gatewaySubtitle: "One OpenAI-compatible endpoint",
    showBenefitStrip: true,
  },
};

export function parseHeroVariant(value: unknown): HeroVariant | null {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === "a" || normalized === "b" ? normalized : null;
}
