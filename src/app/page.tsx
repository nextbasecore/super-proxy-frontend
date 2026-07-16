import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import AdminControls from "@/components/AdminControls";
import OpenSourceTrust from "@/components/OpenSourceTrust";
import HeroDiagram from "@/components/HeroDiagram";
import CustomModels from "@/components/CustomModels";
import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroExperimentActions from "@/components/HeroExperimentActions";
import { cookies } from "next/headers";
import { HERO_SOURCE_COOKIE, HERO_VARIANTS, HERO_VARIANT_COOKIE, parseHeroVariant } from "@/lib/hero-experiment";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function KeyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 8.5-8.5M16 7l3 3" />
    </svg>
  );
}
function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  );
}
function ChartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
    </svg>
  );
}
function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const providers = [
  { name: "OpenAI", logo: "openai" as const, top: 68 },
  { name: "Anthropic", logo: "anthropic" as const, top: 172 },
  { name: "GLM", logo: "glm" as const, top: 276 },
  { name: "Kimi", logo: "kimi" as const, top: 380 },
];

const members = [
  { name: "Alex", role: "Developer", key: "key_alx_7f2...", allowed: "GPT-4o, Claude 3.5 Sonnet", slug: "alex", top: 0 },
  { name: "Sam", role: "Product", key: "key_sam_3c8...", allowed: "GLM-4-Plus", slug: "sam", top: 128 },
  { name: "Maya", role: "Design", key: "key_mya_1k4...", allowed: "Kimi K2", slug: "maya", top: 256 },
  { name: "Jordan", role: "Ops", key: "key_jrd_9p1...", allowed: "GPT-4o", slug: "jordan", top: 384 },
];

const topModels = [
  { name: "GPT-4o", count: "1.23M", pct: 51 },
  { name: "Claude 3.5 Sonnet", count: "742K", pct: 31 },
  { name: "GLM-4-Plus", count: "287K", pct: 12 },
  { name: "Kimi K2", count: "156K", pct: 6 },
];

const sidebar = ["Overview", "Keys", "Models", "Usage", "Members", "Settings"];

function Avatar({ slug, name, size }: { slug: string; name: string; size: number }) {
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
/* Right visual — diagram + dashboard                                  */
/* ------------------------------------------------------------------ */
function Dashboard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_2px_10px_rgba(24,58,50,0.05)]" aria-hidden>
      <div className="flex">
        <div className="hidden w-[140px] shrink-0 border-r border-border p-3 sm:block">
          {sidebar.map((item, i) => (
            <div key={item} className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${i === 0 ? "bg-surface text-forest" : "text-muted"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-forest" : "bg-[#c3ccc7]"}`} />
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-forest">Overview</p>
            <span className="rounded-lg border border-border px-2.5 py-1 text-[10px] text-muted">This month ▾</span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-[11px] font-semibold text-muted">Usage</p>
              <p className="mt-1 text-2xl font-bold text-forest">2.41M</p>
              <p className="text-[11px] text-muted">Requests</p>
              <svg viewBox="0 0 140 34" className="mt-2 h-9 w-full">
                <path d="M0,28 C18,27 24,23 38,22 S66,17 82,12 S112,9 140,3" fill="none" stroke="#2e6b57" strokeWidth="1.6" />
              </svg>
              <span className="mt-1 inline-block rounded-full bg-surface px-2 py-0.5 text-[9px] font-semibold text-[#2e6b57]">↑ 18% vs last month</span>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-[11px] font-semibold text-muted">Top models by usage</p>
              <div className="mt-2.5 space-y-2">
                {topModels.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 text-[10px] text-muted">
                    <span className="w-[80px] truncate font-medium text-forest">{m.name}</span>
                    <span className="w-9 text-right">{m.count}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                      <span className="block h-full rounded-full bg-[#2e6b57]" style={{ width: `${m.pct}%` }} />
                    </span>
                    <span className="w-7 text-right">{m.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-muted">Default spend limit</p>
                <span className="text-[10px] font-semibold text-[#2e6b57]">Edit</span>
              </div>
              <p className="mt-1.5 text-base font-bold text-forest">$200 <span className="text-[11px] font-medium text-muted">/ month</span></p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-muted">Per-user access</p>
                <span className="text-[10px] font-semibold text-[#2e6b57]">Edit</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {members.map((m) => (
                  <span key={m.name} className="flex items-center gap-1 text-[9px] text-muted">
                    <Avatar slug={m.slug} name={m.name} size={18} />{m.name}
                  </span>
                ))}
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border text-[10px] text-muted">+</span>
              </div>
              <p className="mt-2 text-[9px] leading-3 text-muted">Each key has admin-approved models and limits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-[#fbfcfb] px-5 py-2.5 text-[10px] text-muted">
        <span className="flex items-center gap-1.5"><span className="text-[#2e6b57]"><CheckIcon className="h-2.5 w-2.5" /></span> All requests pass through Super Proxy Gateway</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default async function Home({ searchParams }: { searchParams: Promise<{ variant?: string | string[]; ref?: string | string[]; __ab?: string | string[] }> }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const ref = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const previewVariant = parseHeroVariant(params.variant);
  const campaignVariant = ref === "x" ? parseHeroVariant(params.__ab) : null;
  const assignedVariant = parseHeroVariant(cookieStore.get(HERO_VARIANT_COOKIE)?.value);
  const variant = previewVariant ?? campaignVariant ?? assignedVariant ?? "a";
  const trackingEnabled = !previewVariant && (
    (ref === "x" && campaignVariant !== null) ||
    (assignedVariant !== null && cookieStore.get(HERO_SOURCE_COOKIE)?.value === "x_launch")
  );
  const hero = HERO_VARIANTS[variant];

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="mx-auto max-w-7xl px-8 py-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center lg:gap-12">
          {/* LEFT — trimmed */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-forest">
              <GitHubIcon className="h-4 w-4" /> Open source&ensp;·&ensp;Repository coming soon
            </span>

            <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-forest">
              {hero.category}
            </p>

            <h1 className="mt-4 font-sans text-5xl font-semibold leading-[1.08] tracking-tight text-forest sm:text-6xl">
              {hero.headline}{" "}
              <span className="text-vermilion">{hero.headlineAccent}</span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-[#3d4a44]">
              {hero.description}
            </p>

            <HeroExperimentActions variant={variant} cta={hero.cta} microcopy={hero.microcopy} trackingEnabled={trackingEnabled} />
          </div>

          {/* RIGHT — diagram only */}
          <div className="flex items-center">
            <HeroDiagram providers={providers} members={members} gatewayTitle={hero.gatewayTitle} gatewaySubtitle={hero.gatewaySubtitle} />
          </div>
        </div>

        {hero.showBenefitStrip && (
          <div className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
            {[
              { icon: <KeyIcon />, label: "One key per teammate" },
              { icon: <ShieldIcon />, label: "Only approved models" },
              { icon: <ChartIcon />, label: "See who used what" },
            ].map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3 rounded-xl bg-surface/60 px-4 py-3 text-sm font-semibold text-forest">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest shadow-sm">{benefit.icon}</span>
                {benefit.label}
              </div>
            ))}
          </div>
        )}
      </section>

      <Reveal><HowItWorks /></Reveal>
      <Reveal><BeforeAfter /></Reveal>
      <Reveal><AdminControls /></Reveal>
      <Reveal><CustomModels /></Reveal>
      <Reveal><OpenSourceTrust /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Footer />
    </main>
  );
}
