"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { OpenAILogo, AnthropicLogo, GeminiLogo, KimiLogo } from "@/components/ProviderLogos";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function AccessIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 8.5-8.5M16 7l3 3" />
    </svg>
  );
}
function LimitsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}
function UsageIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
    </svg>
  );
}
function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function TrendUp({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 17 9 11l4 4 8-8M15 5h6v6" />
    </svg>
  );
}
function ChevronDown({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function Plus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" />
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
function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  );
}
function GaugeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4.5 17.5a8 8 0 1 1 15 0" />
      <path d="M12 17.5 15.5 11" />
      <circle cx="12" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
function EyeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function BoltIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
function CheckMark({ ok, off }: { ok?: boolean; off?: boolean }) {
  /* De-emphasize the default (allowed) state so exceptions stand out —
     plain check for ok, tinted badge only for the "off" exception. */
  if (ok)
    return (
      <span className="flex h-6 w-6 items-center justify-center text-green-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m5 13 4 4L19 7" /></svg>
      </span>
    );
  if (off)
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vermilion-50 text-vermilion-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </span>
    );
  return <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-faint"><span className="h-[2px] w-2.5 rounded bg-current" /></span>;
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const modelCols = ["GPT-5.6 Sol", "Claude Fable 5", "Gemini 3.5", "Kimi K3", "Other premium"];

/* Provider brand marks for the mobile access chips (first 4 columns) */
const modelMarks = [OpenAILogo, AnthropicLogo, GeminiLogo, KimiLogo];
const modelShort = ["GPT", "Claude", "Gemini", "Kimi"];

const accessRows = [
  { name: "Alex", role: "Developer", slug: "alex", access: ["ok", "ok", "ok", "na", "off"] },
  { name: "Sam", role: "Product", slug: "sam", access: ["ok", "ok", "ok", "ok", "off"] },
  { name: "Maya", role: "Design", slug: "maya", access: ["ok", "ok", "na", "ok", "off"] },
  { name: "Jordan", role: "Ops", slug: "jordan", access: ["ok", "na", "ok", "na", "off"] },
];

const limits = [
  { label: "Monthly spend limit", value: "$1,000 / month" },
  { label: "Daily spend limit", value: "$50 / day" },
  { label: "Premium model limit", value: "$200 / month" },
];

const baseTopMembers = [
  { name: "Alex", role: "Developer", slug: "alex", spend: "$518", model: "GPT-5.6 Sol", pct: 21 },
  { name: "Maya", role: "Design", slug: "maya", spend: "$463", model: "Claude Fable 5", pct: 19 },
  { name: "Sam", role: "Product", slug: "sam", spend: "$418", model: "Gemini 3.5", pct: 17 },
  { name: "Jordan", role: "Ops", slug: "jordan", spend: "$351", model: "Kimi K3", pct: 14 },
  { name: "Other members", role: "", slug: "", spend: "$661", model: "Mixed", pct: 29 },
];

type UsageRange = "7 days" | "30 days" | "This month";

const usageRanges: UsageRange[] = ["7 days", "30 days", "This month"];

const usageByRange: Record<UsageRange, {
  total: string;
  trend: string;
  comparison: string;
  chart: { d: string; v: number }[];
  spends: string[];
}> = {
  "7 days": {
    total: "$612",
    trend: "8%",
    comparison: "vs previous 7 days",
    chart: [
      { d: "Mon", v: 62 }, { d: "Tue", v: 74 }, { d: "Wed", v: 68 },
      { d: "Thu", v: 91 }, { d: "Fri", v: 85 }, { d: "Sat", v: 103 }, { d: "Sun", v: 96 },
    ],
    spends: ["$146", "$120", "$104", "$92", "$150"],
  },
  "30 days": {
    total: "$2.41K",
    trend: "18%",
    comparison: "vs previous 30 days",
    chart: [
      { d: "1", v: 62 }, { d: "3", v: 58 }, { d: "5", v: 71 }, { d: "7", v: 66 },
      { d: "9", v: 82 }, { d: "11", v: 75 }, { d: "13", v: 68 }, { d: "15", v: 90 },
      { d: "17", v: 84 }, { d: "19", v: 96 }, { d: "21", v: 88 }, { d: "23", v: 79 },
      { d: "25", v: 104 }, { d: "27", v: 95 }, { d: "29", v: 112 }, { d: "30", v: 108 },
    ],
    spends: ["$518", "$463", "$418", "$351", "$661"],
  },
  "This month": {
    total: "$1.84K",
    trend: "12%",
    comparison: "vs last month to date",
    chart: [
      { d: "1", v: 55 }, { d: "3", v: 63 }, { d: "5", v: 61 }, { d: "7", v: 76 },
      { d: "9", v: 72 }, { d: "11", v: 88 }, { d: "13", v: 83 }, { d: "15", v: 97 },
    ],
    spends: ["$396", "$352", "$311", "$274", "$507"],
  },
};

const chartConfig = {
  v: { label: "Spend", color: "var(--chart-1)" },
} satisfies ChartConfig;

const footerFeatures = [
  { icon: ShieldIcon, title: "Granular access", desc: "Control every model for every user." },
  { icon: GaugeIcon, title: "Smart limits", desc: "Prevent overuse and stay on budget." },
  { icon: EyeIcon, title: "Full visibility", desc: "Know who used what, and when." },
  { icon: BoltIcon, title: "Instant actions", desc: "Revoke, change, or update in one click." },
];

/* eslint-disable @next/next/no-img-element */
function Avatar({ slug, name, size = 34 }: { slug: string; name: string; size?: number }) {
  if (!slug)
    return (
      <span className="flex shrink-0 items-center justify-center rounded-full bg-surface text-forest" style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><circle cx="9" cy="8" r="3" /><circle cx="16" cy="9" r="2.5" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 19a4.5 4.5 0 0 1 7 0" strokeLinecap="round" /></svg>
      </span>
    );
  return <img src={`/avatars/${slug}.png`} alt={name} width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6 ${className}`}>{children}</div>;
}

function TimeRangeMenu({ value, onChange }: { value: UsageRange; onChange: (range: UsageRange) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="press flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-forest"
      >
        {value} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="menu-in absolute right-0 top-[calc(100%+6px)] z-30 min-w-36 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-overlay">
          {usageRanges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => {
                onChange(range);
                setOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${range === value ? "bg-surface text-forest" : "text-muted hover:bg-surface/60 hover:text-forest"}`}
            >
              {range}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function UsageOverviewCard({ range, onRangeChange }: { range: UsageRange; onRangeChange: (range: UsageRange) => void }) {
  const usage = usageByRange[range];

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-forest">Usage overview</p>
          <p className="mt-0.5 text-xs text-muted">Illustrative spend and trend.</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-vermilion-700">Sample dashboard data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-green-700 sm:flex"><TrendUp className="h-3 w-3" /> {usage.trend}</span>
          <TimeRangeMenu value={range} onChange={onRangeChange} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-4xl font-bold tracking-tight text-forest">{usage.total}</p>
          <p className="text-xs text-muted">Total spend</p>
        </div>
        <p className="pb-1 text-[11px] text-muted">{usage.comparison}</p>
      </div>
      <ChartContainer
        config={chartConfig}
        initialDimension={{ width: 260, height: 190 }}
        className="mt-4 h-[190px] w-full min-w-0 max-w-full overflow-hidden"
      >
        <AreaChart data={usage.chart} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
          <defs>
            <linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 10, fill: "var(--muted)" }} interval={3} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area dataKey="v" type="natural" fill="url(#fillSpend)" stroke="var(--chart-1)" strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
type Tab = "access" | "limits" | "usage";

export default function AdminControls() {
  const [tab, setTab] = useState<Tab>("access");
  const [memberSearch, setMemberSearch] = useState("");
  const [usageRange, setUsageRange] = useState<UsageRange>("This month");
  const [limitItems, setLimitItems] = useState(limits);
  const [editingLimit, setEditingLimit] = useState<number | null>(null);

  const filteredAccessRows = accessRows.filter((member) =>
    `${member.name} ${member.role}`.toLowerCase().includes(memberSearch.toLowerCase()),
  );
  const rangedMembers = baseTopMembers.map((member, index) => ({
    ...member,
    spend: usageByRange[usageRange].spends[index],
  }));

  const tabs: { id: Tab; icon: typeof AccessIcon; title: string; sub: string }[] = [
    { id: "access", icon: AccessIcon, title: "Access", sub: "Manage model access" },
    { id: "limits", icon: LimitsIcon, title: "Limits", sub: "Set usage limits" },
    { id: "usage", icon: UsageIcon, title: "Usage", sub: "Track real-time usage" },
  ];

  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Heading */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-green-700">
          Admin access, limits, and usage controls
        </p>
        <h2 className="mx-auto mt-4 text-center font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-forest sm:text-6xl">
          <span className="block">Control access. Set limits.</span>
          <span className="block text-vermilion">See everything.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-lg leading-8 text-body">
          Give each teammate the right models and limits. Track usage in real
          time and keep costs under control.
        </p>

        {/* Tab bar */}
        <div className="mt-12 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-white p-2 shadow-card">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`flex items-center justify-center gap-3 rounded-xl px-2 py-3 text-center transition-colors sm:justify-start sm:px-4 sm:text-left ${active ? "bg-surface" : "hover:bg-surface/60"}`}
              >
                <span className={`hidden h-9 w-9 items-center justify-center rounded-lg border text-forest transition-colors sm:flex ${active ? "border-transparent bg-forest text-white" : "border-border bg-white"}`}><t.icon className="h-4 w-4" /></span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-forest">{t.title}</span>
                  <span className="hidden text-xs text-muted sm:block">{t.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content — keyed so each switch replays the slide-in */}
        <div key={tab} className="tab-panel">

        {/* Manage model access */}
        {tab === "access" && (
        <Card className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-forest">Manage model access</p>
              <p className="mt-0.5 text-xs text-muted">Choose which models each teammate can use.</p>
            </div>
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted focus-within:border-green-700">
              <SearchIcon className="h-3.5 w-3.5" />
              <input
                type="search"
                value={memberSearch}
                onChange={(event) => setMemberSearch(event.target.value)}
                placeholder="Search members..."
                className="w-36 bg-transparent text-forest outline-none placeholder:text-muted"
              />
            </label>
          </div>

          {/* Desktop table */}
          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wide text-muted">
                  <th className="pb-3 text-left">Member</th>
                  {modelCols.map((c) => <th key={c} className="pb-3 text-center">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredAccessRows.map((r) => (
                  <tr key={r.name} className="border-t border-border">
                    <td className="py-3.5">
                      <span className="flex items-center gap-3">
                        <Avatar slug={r.slug} name={r.name} />
                        <span className="leading-tight">
                          <span className="block text-sm font-bold text-forest">{r.name}</span>
                          <span className="block text-xs text-muted">{r.role}</span>
                        </span>
                      </span>
                    </td>
                    {r.access.map((a, i) => (
                      <td key={i} className="py-3.5 text-center">
                        <span className="inline-flex"><CheckMark ok={a === "ok"} off={a === "off"} /></span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked — model logos show WHAT each member can access */}
          <div className="mt-4 space-y-2 md:hidden">
            {filteredAccessRows.map((r) => (
              <div key={r.name} className="rounded-xl border border-border px-3 py-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Avatar slug={r.slug} name={r.name} />
                    <span className="leading-tight">
                      <span className="block text-sm font-bold text-forest">{r.name}</span>
                      <span className="block text-xs text-muted">{r.role}</span>
                    </span>
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-4 min-[420px]:gap-1.5">
                  {r.access.slice(0, 4).map((a, i) => {
                    const Mark = modelMarks[i];
                    const allowed = a === "ok";
                    return (
                      <span
                        key={i}
                        className={`flex min-w-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[11px] font-semibold min-[420px]:gap-1 min-[420px]:pr-2 min-[420px]:text-[10px] ${allowed ? "bg-surface text-forest" : "bg-green-50 text-faint line-through decoration-1"}`}
                      >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${allowed ? "bg-white text-forest ring-1 ring-green-300" : "bg-green-200 text-white"}`}>
                          <Mark className="h-3 w-3" />
                        </span>
                        {modelShort[i]}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-4 text-center">
            <a href="#top" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest hover:underline">View all members <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </Card>
        )}

        {/* Limits */}
        {tab === "limits" && (
        <div className="mt-6 grid w-full min-w-0 max-w-full items-stretch gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-bold text-forest">Set usage limits</p>
            <p className="mt-0.5 text-xs text-muted">Apply limits per user or per team.</p>
            <div className="mt-4 space-y-3">
              {limitItems.map((l, index) => (
                <div key={l.label} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border px-4 py-4">
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-sm font-semibold text-forest">{l.label}</span>
                    {editingLimit === index ? (
                      <input
                        autoFocus
                        value={l.value}
                        onChange={(event) => setLimitItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))}
                        className="mt-1 w-full max-w-36 rounded-md border border-border px-2 py-1 text-xs text-forest outline-none focus:border-green-700"
                      />
                    ) : (
                      <span className="mt-0.5 block text-xs text-muted">{l.value}</span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingLimit(editingLimit === index ? null : index)}
                    className="press shrink-0 rounded-lg border border-border px-3.5 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-surface"
                  >
                    {editingLimit === index ? "Save" : "Edit"}
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setLimitItems((current) => [...current, { label: `Custom limit ${current.length - limits.length + 1}`, value: "$100 / month" }]);
                setEditingLimit(limitItems.length);
              }}
              className="press mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline"
            >
              <Plus className="h-4 w-4" /> Add custom limit
            </button>
          </Card>
          <UsageOverviewCard range={usageRange} onRangeChange={setUsageRange} />
        </div>
        )}

        {/* Detailed usage */}
        {tab === "usage" && (
          <Card className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-forest">Top members by usage</p>
              <p className="mt-0.5 text-xs text-muted">See who&apos;s using what and how much.</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-vermilion-700">Sample dashboard data</p>
            </div>
            <TimeRangeMenu value={usageRange} onChange={setUsageRange} />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wide text-muted">
                  <th className="pb-3 text-left">Member</th>
                  <th className="pb-3 text-right">Spend</th>
                  <th className="hidden pb-3 text-left sm:table-cell">Top model</th>
                  <th className="pb-3 text-left">% of total</th>
                </tr>
              </thead>
              <tbody>
                {rangedMembers.map((m) => (
                  <tr key={m.name} className="border-t border-border">
                    <td className="py-3.5">
                      <span className="flex items-center gap-3">
                        <Avatar slug={m.slug} name={m.name} size={30} />
                        <span className="leading-tight">
                          <span className="block text-sm font-bold text-forest">{m.name}</span>
                          {m.role && <span className="block text-xs text-muted">{m.role}</span>}
                        </span>
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-sm font-semibold text-forest">{m.spend}</td>
                    <td className="hidden py-3.5 text-sm text-muted sm:table-cell">{m.model}</td>
                    <td className="py-3.5">
                      <span className="flex items-center gap-2">
                        <span className="w-8 text-sm font-semibold text-forest">{m.pct}%</span>
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface">
                          <span className="block h-full rounded-full bg-green-700" style={{ width: `${m.pct * 2.5}%` }} />
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 border-t border-border pt-4 text-center">
            <a href="#top" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest hover:underline">View full usage analytics <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
          </Card>
        )}

        </div>
        {/* end tab content */}

        {/* Footer feature quad */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-12 lg:grid-cols-4">
          {footerFeatures.map((f) => (
            <div key={f.title} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface text-forest"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-sm font-bold text-forest">{f.title}</h3>
              <p className="mx-auto mt-1.5 max-w-[180px] text-xs leading-5 text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
