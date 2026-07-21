"use client";

import { useEffect, useState } from "react";

const TRACK_ID = "673c42hDp";
const GITHUB_URL = "https://github.com/Nextbasedev/super-proxy";
const PIXEL_URL = "https://api.chromastudio.ai/link-tap/pixel";
// Keep redirect snappy, but never abort the track request.
const MAX_WAIT_MS = 700;
const MIN_WAIT_MS = 80;

function getOrCreateVisitorId(hash: string): string {
  try {
    const existing = localStorage.getItem("_lt_vid");
    if (existing) return existing;

    const created =
      "v_" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
    localStorage.setItem("_lt_vid", created);
    localStorage.setItem("s_hash", hash);
    return created;
  } catch {
    return "v_" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
  }
}

function buildPayload(trackId: string) {
  return {
    track_id: trackId,
    hash: trackId,
    visitor_id: getOrCreateVisitorId(trackId),
    url: window.location.href,
    referrer: document.referrer || "",
    screen: `${window.screen.width}x${window.screen.height}`,
  };
}

function fireTrack(trackId: string): Promise<"sent" | "queued" | "failed"> {
  const payload = buildPayload(trackId);
  const body = JSON.stringify(payload);

  // Prefer sendBeacon so navigation does not cancel the request.
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      const queued = navigator.sendBeacon(PIXEL_URL, blob);
      if (queued) return Promise.resolve("queued");
    }
  } catch {
    // Fall through to fetch.
  }

  // keepalive fetch also survives page unload better than normal fetch.
  return fetch(PIXEL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    mode: "cors",
    cache: "no-store",
  })
    .then((res) => (res.ok ? "sent" : "failed"))
    .catch(() => "failed");
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function TrackAndRedirect() {
  const [status, setStatus] = useState("Redirecting…");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setStatus("Redirecting…");

      // Fire tracking immediately; do not abort it.
      const trackPromise = fireTrack(TRACK_ID);

      // Wait briefly for the request to leave the browser, then redirect.
      // Never cancel/abort the network call — that is what showed as cancelled.
      await Promise.race([
        trackPromise.then(() => undefined),
        wait(MAX_WAIT_MS),
      ]);
      await wait(MIN_WAIT_MS);

      if (cancelled) return;
      setStatus("Opening GitHub…");
      window.location.replace(GITHUB_URL);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-[#183a32]">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2e6b57]">
          Super Proxy
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">{status}</h1>
        <p className="mt-3 text-sm leading-6 text-[#66726c]">
          Taking you to the GitHub repository.
        </p>
        <a
          href={GITHUB_URL}
          className="mt-8 inline-flex text-sm font-semibold text-[#2e6b57] underline-offset-4 hover:underline"
        >
          Continue manually
        </a>
      </div>
    </main>
  );
}
