import TrackAndRedirect from "@/components/TrackAndRedirect";

export default function Home() {
  // Previous marketing landing page intentionally replaced with a fast
  // track → GitHub redirect flow for the current campaign.
  return <TrackAndRedirect />;
}

/*
 * Previous Super Proxy marketing homepage (kept for easy restore):
 *
 * import HowItWorks from "@/components/HowItWorks";
 * import BeforeAfter from "@/components/BeforeAfter";
 * import AdminControls from "@/components/AdminControls";
 * import OpenSourceTrust from "@/components/OpenSourceTrust";
 * import HeroDiagram from "@/components/HeroDiagram";
 * import CustomModels from "@/components/CustomModels";
 * import Reveal from "@/components/Reveal";
 * import Header from "@/components/Header";
 * import FAQ from "@/components/FAQ";
 * import Footer from "@/components/Footer";
 * import HeroExperimentActions from "@/components/HeroExperimentActions";
 * import { cookies } from "next/headers";
 * import { HERO_SOURCE_COOKIE, HERO_VARIANTS, HERO_VARIANT_COOKIE, parseHeroVariant } from "@/lib/hero-experiment";
 *
 * export default async function Home({ searchParams }: { searchParams: Promise<{ variant?: string | string[]; ref?: string | string[]; __ab?: string | string[] }> }) {
 *   ... full previous landing page UI ...
 * }
 */
