"use client";

import { useEffect, useState } from "react";

const TRACK_ID = "673c42hDp";
const GITHUB_URL = "https://github.com/nextbasecore/super-proxy-frontend";
const PIXEL_URL = "https://api.chromastudio.ai/link-tap/pixel";
// Fail open quickly if the tracker is slow/unavailable.
const TRACK_TIMEOUT_MS = 450;

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

async function sendTrackBeacon(trackId: string): Promise<void> {
  const visitorId = getOrCreateVisitorId(trackId);
  const payload = {
    track_id: trackId,
    hash: trackId,
    visitor_id: visitorId,
    url: window.location.href,
    referrer: document.referrer || "",
    screen: `${window.screen.width}x${window.screen.height}`,
  };

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TRACK_TIMEOUT_MS);

  try {
    await fetch(PIXEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      signal: controller.signal,
    });
  } catch {
    // Never block the redirect on tracking failures.
  } finally {
    window.clearTimeout(timer);
  }
}

export default function TrackAndRedirect() {
  const [status, setStatus] = useState("Redirecting…");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setStatus("Redirecting…");
      await sendTrackBeacon(TRACK_ID);
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
