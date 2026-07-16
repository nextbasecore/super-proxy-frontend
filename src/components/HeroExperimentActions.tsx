"use client";

import { useEffect } from "react";
import { HERO_EXPERIMENT_ID, type HeroVariant } from "@/lib/hero-experiment";

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

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
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

  const subject = variant === "b" ? "Super Proxy GitHub link" : "Super Proxy early access";

  return (
    <>
      <form
        id="waitlist"
        action={`mailto:contact@ampere.sh?subject=${encodeURIComponent(subject)}`}
        method="post"
        encType="text/plain"
        onSubmit={() => trackingEnabled && trackExperimentEvent("primary_cta", variant)}
        className="mt-8 flex max-w-md scroll-mt-24 flex-col gap-2.5 sm:flex-row sm:gap-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:bg-white"
      >
        <input name="email" type="email" required placeholder="Work email address" className="min-w-0 flex-1 rounded-lg border border-border bg-white px-4 py-3.5 text-sm text-forest outline-none placeholder:text-muted sm:rounded-none sm:border-0 sm:bg-transparent" />
        <button type="submit" className="press flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-forest px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#122d26] sm:rounded-none">
          {cta} <ArrowIcon />
        </button>
      </form>
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
