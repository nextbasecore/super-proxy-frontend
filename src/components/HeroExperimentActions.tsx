"use client";

import { useEffect } from "react";
import { HERO_EXPERIMENT_ID, type HeroVariant } from "@/lib/hero-experiment";
import WaitlistForm from "@/components/WaitlistForm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackExperimentEvent(event: "exposure" | "primary_cta" | "secondary_cta", variant: HeroVariant) {
  const payload = { event, variant, path: window.location.pathname };

  fetch("/api/experiment", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);

  window.gtag?.("event", `ab_${event}`, {
    experiment_id: HERO_EXPERIMENT_ID,
    variant,
  });
}

export default function HeroExperimentActions({
  variant,
  cta,
  microcopy,
  trackingEnabled,
}: {
  variant: HeroVariant;
  cta: string;
  microcopy: string;
  trackingEnabled: boolean;
}) {
  useEffect(() => {
    if (!trackingEnabled) return;
    const key = `sp_ab_exposure_${HERO_EXPERIMENT_ID}_${variant}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // Tracking still works when storage is unavailable.
    }
    trackExperimentEvent("exposure", variant);
  }, [trackingEnabled, variant]);

  return (
    <>
      <WaitlistForm
        id="waitlist"
        cta={cta}
        placement="hero"
        onSuccess={() => trackingEnabled && trackExperimentEvent("primary_cta", variant)}
        className="mt-8 flex max-w-md scroll-mt-24 flex-col gap-2.5 sm:flex-row sm:gap-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:bg-white"
      />
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">{microcopy}</p>
      <a
        href="#how-it-works"
        onClick={() => trackingEnabled && trackExperimentEvent("secondary_cta", variant)}
        className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-forest underline-offset-4 hover:underline"
      >
        See how it works <span aria-hidden>↓</span>
      </a>
    </>
  );
}
