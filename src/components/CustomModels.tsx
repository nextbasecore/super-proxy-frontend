"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { OpenAILogo, AnthropicLogo, GLMLogo, KimiLogo } from "@/components/ProviderLogos";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const I = {
  bolt: (c = "h-5 w-5") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>,
  star: (c = "h-5 w-5") => <svg viewBox="0 0 24 24" fill="currentColor" className={c}><path d="m12 3 2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7Z" /></svg>,
  auto: (c = "h-5 w-5") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M20 11a8 8 0 0 0-14-4.5L4 8M4 5v3h3" /><path d="M4 13a8 8 0 0 0 14 4.5L20 16M20 19v-3h-3" /></svg>,
  shield: (c = "h-6 w-6") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><circle cx="12" cy="11.5" r="2.2" /><path d="m13.6 9.9 1.2-1.2" /></svg>,
  chevR: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="m9 6 6 6-6 6" /></svg>,
  chevD: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="m6 9 6 6 6-6" /></svg>,
  arrowR: (c = "h-5 w-5") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  check: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>,
  task: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="m8 12 2.5 2.5L16 9" /></svg>,
  quality: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9Z" /></svg>,
  latency: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></svg>,
  gauge: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M4 18a8 8 0 1 1 15 0" /><path d="M12 18 15.5 11" /></svg>,
  cost: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.5A2.5 2.5 0 0 0 12 8.5c-1.4 0-2.5.8-2.5 2s1.1 2 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2a2.5 2.5 0 0 1-2.5-1" /></svg>,
  perf: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" /></svg>,
  avail: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" /></svg>,
  best: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>,
  fallback: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M4 13a8 8 0 0 0 14 4.5L20 16M20 19v-3h-3M20 11a8 8 0 0 0-14-4.5L4 8M4 5v3h3" /></svg>,
  keep: (c = "h-4 w-4") => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={c}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><path d="M9.5 12l2 2 3.5-3.5" /></svg>,
};

const providers = [
  { name: "OpenAI", Logo: OpenAILogo, remaining: 72 },
  { name: "Anthropic", Logo: AnthropicLogo, remaining: 41 },
  { name: "GLM", Logo: GLMLogo, remaining: 87 },
  { name: "Kimi", Logo: KimiLogo, remaining: 22 },
];

type ModelDef = {
  icon: (c?: string) => React.ReactElement;
  name: string;
  tag: string;
  prompt: string;
  summary: string;
  primary: string;
  fallback: string;
  reason: string;
};

const customModels: ModelDef[] = [
  { icon: I.bolt, name: "company-fast", tag: "Everyday tasks", prompt: "Summarize today's support tickets.", summary: "Cheapest capable model. Avoids premium.", primary: "GLM", fallback: "Kimi", reason: "GLM is cheapest with 87% of its limit left — ideal for routine work." },
  { icon: I.star, name: "company-best", tag: "Complex work", prompt: "Plan our Q3 product strategy.", summary: "Highest quality, cost is secondary.", primary: "Anthropic", fallback: "OpenAI", reason: "Claude scores highest for complex reasoning and still has budget." },
  { icon: I.auto, name: "company-auto", tag: "Auto optimize", prompt: "Draft a customer launch email.", summary: "Balances quality, cost and remaining limits.", primary: "OpenAI", fallback: "GLM", reason: "GPT balances quality and cost best right now — Kimi is low (22%), so it's skipped." },
];

const routing = [
  { n: "1", icon: I.task, title: "Understand the request", desc: "Task type, quality bar, and latency preference." },
  { n: "2", icon: I.gauge, title: "Evaluate in real time", desc: "Remaining limits, cost, performance, availability." },
  { n: "3", icon: I.best, title: "Route & fallback", desc: "Pick the best model — fall back if a provider is down." },
];

export default function CustomModels() {
  const [active, setActive] = useState(0);
  const model = customModels[active];

  return (
    <section id="custom-models" className="scroll-mt-16 bg-green-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Header — centered */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">Custom models &amp; intelligent routing</p>
          <h2 className="mt-5 font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-forest sm:text-6xl">
            Build the models your team <span className="text-vermilion">actually needs.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-body">
            One simple model name. Your gateway picks the best provider by task,
            cost, and remaining limits — with automatic fallback.
          </p>
        </div>

        {/* Interactive router simulator */}
        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-border bg-white shadow-card">
          {/* model selector tabs */}
          <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row">
            {customModels.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`press flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${on ? "bg-forest text-white" : "hover:bg-surface"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${on ? "bg-white/15 text-white" : "bg-surface text-forest"}`}>{m.icon("h-5 w-5")}</span>
                  <span className="min-w-0">
                    <span className={`block truncate font-mono text-[13px] font-bold ${on ? "text-white" : "text-forest"}`}>{m.name}</span>
                    <span className={`block truncate text-[11px] ${on ? "text-green-200" : "text-muted"}`}>{m.tag}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* live routing decision */}
          <div key={active} className="tab-panel grid gap-0 md:grid-cols-[1fr_1.1fr]">
            {/* left: request + summary */}
            <div className="border-b border-border p-6 md:border-b-0 md:border-r">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Employee request</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-[#0d1117] p-4 font-mono text-[12px] leading-[1.7] text-[#e6edf3]">
<code>{`POST `}<span className="text-[#7ee787]">/v1/chat/completions</span>{`

{
  model: `}<span className="text-[#a5d6ff]">{`"${model.name}"`}</span>{`,
  prompt: `}<span className="text-[#ce9178]">{`"${model.prompt}"`}</span>{`
}`}</code>
              </pre>
              <p className="mt-4 text-sm leading-6 text-body">{model.summary}</p>
            </div>

            {/* right: routing result */}
            <div className="p-6">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Gateway routes to</p>

              {/* provider ranking */}
              <div className="mt-3 space-y-2">
                {providers.map((p) => {
                  const isPrimary = p.name === model.primary;
                  const isFallback = p.name === model.fallback;
                  const low = p.remaining < 30;
                  return (
                    <div
                      key={p.name}
                      className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors ${
                        isPrimary ? "border-green-700 bg-surface" : "border-border bg-white"
                      }`}
                    >
                      <span className={isPrimary ? "text-forest" : "text-faint"}><p.Logo className="h-4 w-4" /></span>
                      <span className={`w-[68px] shrink-0 text-sm font-semibold ${isPrimary ? "text-forest" : "text-body"}`}>{p.name}</span>
                      {/* limit bar */}
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-green-100">
                        <span className={`block h-full rounded-full ${low ? "bg-vermilion" : "bg-green-700"}`} style={{ width: `${p.remaining}%` }} />
                      </span>
                      <span className={`w-9 shrink-0 text-right text-[11px] font-medium ${low ? "text-vermilion-700" : "text-muted"}`}>{p.remaining}%</span>
                      {isPrimary && <span className="shrink-0 rounded-full bg-green-700 px-2 py-0.5 text-[10px] font-bold text-white">Chosen</span>}
                      {isFallback && <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-green-700">Fallback</span>}
                    </div>
                  );
                })}
              </div>

              {/* reasoning */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface px-4 py-3">
                <span className="mt-0.5 shrink-0 text-green-700">{I.check("h-4 w-4")}</span>
                <p className="text-[13px] leading-5 text-forest">{model.reason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Routing steps — clean horizontal timeline */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {routing.map((r, i) => (
              <Reveal key={r.n} delay={i * 80} className="relative flex gap-4 md:block">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-forest md:mb-4">{r.icon("h-5 w-5")}</span>
                <div>
                  <p className="flex items-center gap-2 text-[15px] font-bold text-forest">
                    <span className="text-vermilion">{r.n}</span>{r.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-body">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
