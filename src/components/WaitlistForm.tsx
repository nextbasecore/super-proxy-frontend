"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function WaitlistForm({
  cta,
  placement,
  id,
  className,
  onSuccess,
}: {
  cta: string;
  placement: "hero" | "open_source";
  id?: string;
  className: string;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dialogOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website, placement }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof result.error === "string" ? result.error : "Could not join the waitlist. Please try again.");
      }

      setEmail("");
      setDialogOpen(true);
      onSuccess?.();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not join the waitlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form id={id} onSubmit={handleSubmit} className={className}>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email address"
          className="min-w-0 flex-1 rounded-lg border border-border bg-white px-4 py-3.5 text-sm text-forest outline-none placeholder:text-muted sm:rounded-none sm:border-0 sm:bg-transparent"
        />
        <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          disabled={submitting}
          className="press flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-forest px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#122d26] disabled:cursor-wait disabled:opacity-70 sm:rounded-none"
        >
          {submitting ? "Joining…" : cta} {!submitting && <ArrowIcon />}
        </button>
      </form>

      {error && <p role="alert" className="mt-2 max-w-md text-sm font-medium text-vermilion">{error}</p>}

      {dialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/30 px-5 backdrop-blur-sm" role="presentation" onMouseDown={() => setDialogOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-success-title"
            className="dialog-in w-full max-w-sm rounded-3xl border border-border bg-background p-7 text-center shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface text-[#2e6b57]"><CheckIcon /></span>
            <h2 id="waitlist-success-title" className="mt-5 font-sans text-2xl font-semibold tracking-tight text-forest">You&apos;re on the waitlist.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">We&apos;ll send one email when the Super Proxy repository goes live.</p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setDialogOpen(false)}
              className="press mt-6 w-full rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#122d26]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
