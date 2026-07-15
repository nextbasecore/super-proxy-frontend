/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function AlertCircle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16h.01" />
    </svg>
  );
}
function CheckCircle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}
function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}
function GlobeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}
function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}
function EyeOff({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M9.9 5.2A9.4 9.4 0 0 1 12 5c5 0 9 5 9 7a11 11 0 0 1-2.4 3M6.1 6.6C3.7 8 2 11 2 12c0 2 4 7 10 7a9.6 9.6 0 0 0 4-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
    </svg>
  );
}
function RefreshIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 11a8 8 0 0 0-14-4.5L4 8M4 5v3h3" />
      <path d="M4 13a8 8 0 0 0 14 4.5L20 16M20 19v-3h-3" />
    </svg>
  );
}
function ShuffleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  );
}
function ShieldCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const before = [
  { icon: LockIcon, label: "Shared passwords and 2FA codes" },
  { icon: GlobeIcon, label: "Access to every provider model" },
  { icon: UserIcon, label: "One employee can consume the limit" },
  { icon: EyeOff, label: "No visibility by employee" },
  { icon: RefreshIcon, label: "Change passwords for everyone" },
  { icon: ShuffleIcon, label: "Employees switch between providers" },
];

const after = [
  "Individual API key per employee",
  "Only admin-approved models",
  "Per-user limits and controls",
  "Usage tracked by employee",
  "Revoke or rotate one key instantly",
  "One OpenAI-compatible endpoint",
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function BeforeAfter() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#2e6b57]">
          Before vs after
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-center font-serif text-5xl leading-[1.02] tracking-tight text-forest sm:text-6xl">
          From shared credentials to{" "}
          <span className="text-vermilion">controlled AI access.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg leading-8 text-[#3d4a44]">
          Replace provider passwords, repeated logins, and uncontrolled model
          access with individual keys managed from one place.
        </p>

        {/* Comparison — one bordered frame, split by a divider on desktop */}
        <div className="relative mt-14 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-0 lg:rounded-3xl lg:border lg:border-border lg:bg-white lg:p-8 lg:shadow-[0_2px_16px_rgba(24,58,50,0.04)]">
          {/* Center VS divider (desktop) */}
          <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="h-full w-px bg-border" />
          </div>
          <span className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-[11px] font-bold uppercase tracking-wide text-muted shadow-sm lg:flex">
            vs
          </span>

          {/* Before */}
          <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_2px_16px_rgba(24,58,50,0.04)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pr-10 lg:shadow-none">
            <div className="flex items-center gap-3">
              <span className="text-vermilion"><AlertCircle className="h-6 w-6" /></span>
              <h3 className="text-xl font-bold text-forest">Before</h3>
            </div>
            <ul className="mt-6">
              {before.map(({ icon: Icon, label }, i) => (
                <li key={label} className={`flex items-center gap-3.5 py-3.5 ${i < before.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdefe9] text-vermilion">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] text-[#3d4a44]">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_2px_16px_rgba(24,58,50,0.04)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pl-10 lg:shadow-none">
            <div className="flex items-center gap-3">
              <span className="text-[#2e6b57]"><CheckCircle className="h-6 w-6" /></span>
              <h3 className="text-xl font-bold text-[#2e6b57]">After</h3>
            </div>
            <ul className="mt-6">
              {after.map((label, i) => (
                <li key={label} className={`flex items-center gap-3.5 py-3.5 ${i < after.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2e6b57]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] text-[#3d4a44]">{label}</span>
                </li>
              ))}
            </ul>

            {/* Footer pill */}
            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-surface px-4 py-3 text-[13px] font-medium text-forest">
              <span className="text-[#2e6b57]"><ShieldCheck className="h-4 w-4" /></span>
              <span>Controlled access</span>
              <span className="text-muted">·</span>
              <span>Usage visibility</span>
              <span className="text-muted">·</span>
              <span>One key per teammate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
