import Reveal from "@/components/Reveal";
import { OpenAILogo, AnthropicLogo, GLMLogo, KimiLogo, GeminiLogo } from "@/components/ProviderLogos";

function CheckCircle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}
function XCircle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  );
}
function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function KeyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 8.5-8.5M16 7l3 3" />
    </svg>
  );
}
function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  );
}
function ChartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const providers = [
  { name: "OpenAI", Logo: OpenAILogo },
  { name: "Anthropic", Logo: AnthropicLogo },
  { name: "GLM", Logo: GLMLogo },
  { name: "Kimi", Logo: KimiLogo },
  { name: "Gemini", Logo: GeminiLogo },
];

const members = [
  { name: "Alex", role: "Developer", key: "key_alx_7f2...", slug: "alex" },
  { name: "Maya", role: "Designer", key: "key_mya_9c1...", slug: "maya" },
  { name: "Sam", role: "Product", key: "key_sam_a3b...", slug: "sam" },
  { name: "Jordan", role: "Ops", key: "key_jrd_2d8...", slug: "jordan" },
  { name: "Angela", role: "Marketing", key: "key_ang_5e4...", slug: "angela" },
];

const allowed = [
  { name: "GPT-4o", ok: true },
  { name: "Claude 3.5 Sonnet", ok: true },
  { name: "GLM-4-Plus", ok: true },
  { name: "Kimi K2", ok: false },
];

const steps = [
  { n: "01", title: "Connect your providers", desc: "Admins connect the AI providers and API accounts the company is authorized to use." },
  { n: "02", title: "Create individual API keys", desc: "Every teammate receives their own key. No provider passwords, shared accounts, or repeated logins." },
  { n: "03", title: "Approve models and limits", desc: "Admins control model access and usage limits for each employee, role, or team." },
];

function Avatar({ slug, name, size = 36 }: { slug: string; name: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/avatars/${slug}.png`}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Cards (shared between desktop row + mobile interleaved layout)       */
/* ------------------------------------------------------------------ */
function ProvidersCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
      <p className="text-sm font-bold text-forest">Your providers</p>
      <div className="mt-5 space-y-2.5">
        {providers.map((p) => (
          <div key={p.name} className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5">
            <span className="flex items-center gap-3">
              <span className="text-forest"><p.Logo className="h-5 w-5" /></span>
              <span className="text-sm font-semibold text-forest">{p.name}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#2e6b57]">
              <CheckCircle className="h-3.5 w-3.5" /> Connected
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
      <p className="text-sm font-bold text-forest">Team members</p>
      <div className="mt-5 space-y-4">
        {members.map((m) => (
          <div key={m.name} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <Avatar slug={m.slug} name={m.name} />
              <span className="leading-tight">
                <span className="block text-sm font-bold text-forest">{m.name}</span>
                <span className="block text-xs text-muted">{m.role}</span>
              </span>
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
              <span className="font-mono text-[11px] text-forest">{m.key}</span>
              <CopyIcon className="h-3.5 w-3.5 text-muted" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyDetailsCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-forest">Key details – Alex</p>
        <span className="rounded-full border border-[#bfe0d3] bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-[#2e6b57]">
          Active
        </span>
      </div>
      <div className="mt-5 rounded-xl border border-border p-4">
        <p className="text-xs font-bold text-forest">Allowed models</p>
        <div className="mt-3 space-y-3">
          {allowed.map((a) => (
            <div key={a.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-forest">
                <span className={a.ok ? "text-[#2e6b57]" : "text-vermilion"}>
                  {a.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                </span>
                {a.name}
              </span>
              <span className={`text-[11px] font-medium ${a.ok ? "text-muted" : "text-vermilion"}`}>
                {a.ok ? "Allowed" : "Not allowed"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs font-bold text-forest">Spend limit</p>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-4 py-3">
        <span className="flex items-center gap-2 text-sm text-forest">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface text-forest">
            <ChartIcon className="h-3.5 w-3.5" />
          </span>
          $200 / month
        </span>
        <span className="text-[11px] font-semibold text-[#2e6b57]">Edit</span>
      </div>
    </div>
  );
}

const stepCards = [ProvidersCard, TeamCard, KeyDetailsCard];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-24">
        {/* Heading */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#2e6b57]">
          How it works
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-center font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-forest sm:text-6xl">
          One gateway.
          <br />
          Access for every <span className="text-vermilion">teammate.</span>
        </h2>
        {/* Steps (desktop row) */}
        <div className="mt-16 hidden gap-10 md:grid md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-bold text-forest">
                {s.n}
              </span>
              <div>
                <h3 className="text-lg font-bold text-forest">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#4a564f]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* MOBILE: interleaved step → card → step → card ... */}
        <div className="mt-10 space-y-6 md:hidden">
          {steps.map((s, i) => {
            const CardComp = stepCards[i];
            return (
              <Reveal key={s.n} className="space-y-4">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-bold text-forest">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-forest">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#4a564f]">{s.desc}</p>
                  </div>
                </div>
                <CardComp />
              </Reveal>
            );
          })}
        </div>

        {/* DESKTOP / TABLET: three connected cards in a row */}
        <div className="mt-10 hidden flex-col items-stretch gap-4 md:flex lg:flex-row lg:items-stretch">
          {/* Card 1 — providers */}
          <div className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
            <p className="text-sm font-bold text-forest">Your providers</p>
            <div className="mt-5 space-y-2.5">
              {providers.map((p) => (
                <div key={p.name} className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5">
                  <span className="flex items-center gap-3">
                    <span className="text-forest"><p.Logo className="h-5 w-5" /></span>
                    <span className="text-sm font-semibold text-forest">{p.name}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#2e6b57]">
                    <CheckCircle className="h-3.5 w-3.5" /> Connected
                  </span>
                </div>
              ))}
            </div>
          </div>

          <span className="hidden shrink-0 self-center text-muted lg:block"><ArrowRight className="h-6 w-6" /></span>

          {/* Card 2 — team members */}
          <div className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
            <p className="text-sm font-bold text-forest">Team members</p>
            <div className="mt-5 space-y-4">
              {members.map((m) => (
                <div key={m.name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Avatar slug={m.slug} name={m.name} />
                    <span className="leading-tight">
                      <span className="block text-sm font-bold text-forest">{m.name}</span>
                      <span className="block text-xs text-muted">{m.role}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
                    <span className="font-mono text-[11px] text-forest">{m.key}</span>
                    <CopyIcon className="h-3.5 w-3.5 text-muted" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <span className="hidden shrink-0 self-center text-muted lg:block"><ArrowRight className="h-6 w-6" /></span>

          {/* Card 3 — key details */}
          <div className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-[0_1px_4px_rgba(24,58,50,0.05)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-forest">Key details – Alex</p>
              <span className="rounded-full border border-[#bfe0d3] bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-[#2e6b57]">
                Active
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-border p-4">
              <p className="text-xs font-bold text-forest">Allowed models</p>
              <div className="mt-3 space-y-3">
                {allowed.map((a) => (
                  <div key={a.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-forest">
                      <span className={a.ok ? "text-[#2e6b57]" : "text-vermilion"}>
                        {a.ok ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </span>
                      {a.name}
                    </span>
                    <span className={`text-[11px] font-medium ${a.ok ? "text-muted" : "text-vermilion"}`}>
                      {a.ok ? "Allowed" : "Not allowed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs font-bold text-forest">Spend limit</p>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-forest">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface text-forest">
                  <ChartIcon className="h-3.5 w-3.5" />
                </span>
                $200 / month
              </span>
              <span className="text-[11px] font-semibold text-[#2e6b57]">Edit</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
