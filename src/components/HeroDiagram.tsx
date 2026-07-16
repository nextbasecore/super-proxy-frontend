"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { PROVIDER_LOGOS } from "@/components/ProviderLogos";

type ProviderKey = "openai" | "anthropic" | "glm" | "kimi";
type Provider = { name: string; logo: ProviderKey; top: number };
type Member = { name: string; role: string; key: string; allowed: string; slug: string; top: number };

const LOGOS = PROVIDER_LOGOS;

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  );
}
function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
function KeyIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 8.5-8.5M16 7l3 3" />
    </svg>
  );
}
/* eslint-disable @next/next/no-img-element */
function Avatar({ slug, name, size = 28 }: { slug: string; name: string; size?: number }) {
  return <img src={`/avatars/${slug}.png`} alt={name} width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
}

export default function HeroDiagram({
  providers,
  members,
  gatewayTitle = "Super Proxy Gateway",
  gatewaySubtitle = "OpenAI-compatible",
}: {
  providers: Provider[];
  members: Member[];
  gatewayTitle?: string;
  gatewaySubtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const providerRefs = useRef(providers.map(() => ({ current: null as HTMLDivElement | null })));
  const memberRefs = useRef(members.map(() => ({ current: null as HTMLDivElement | null })));

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
    {/* ============ MOBILE: vertical stack ============ */}
    <div className="space-y-5 lg:hidden" aria-hidden>
      {/* providers row */}
      <div className="grid grid-cols-2 gap-2.5">
        {providers.map((p) => {
          const Logo = LOGOS[p.logo];
          return (
            <div key={p.name} className="flex h-12 items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 shadow-[0_1px_3px_rgba(24,58,50,0.05)]">
              <span className="text-forest"><Logo className="h-5 w-5" /></span>
              <span className="text-sm font-semibold text-forest">{p.name}</span>
            </div>
          );
        })}
      </div>

      {/* down connector + gateway */}
      <div className="flex flex-col items-center">
        <span className="h-5 w-px bg-border" />
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-4 text-center text-white shadow-lg">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><ShieldIcon className="h-5 w-5" /></span>
          <span className="text-sm font-semibold">{gatewayTitle}</span>
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-emerald-200"><CheckIcon className="h-2.5 w-2.5 shrink-0" /> {gatewaySubtitle}</span>
        </div>
        <span className="h-5 w-px bg-border" />
      </div>

      {/* member cards stacked */}
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.name} className="rounded-2xl border border-border bg-white p-3.5 shadow-[0_1px_3px_rgba(24,58,50,0.05)]">
            <div className="flex items-center gap-2.5">
              <Avatar slug={m.slug} name={m.name} size={32} />
              <div className="leading-tight">
                <p className="text-sm font-bold text-forest">{m.name}</p>
                <p className="text-[11px] text-muted">{m.role}</p>
              </div>
              <p className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-forest"><KeyIcon className="h-3 w-3 text-muted" /> {m.key}</p>
            </div>
            <span className="mt-2.5 block truncate rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-[#2e6b57]">allowed: {m.allowed}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ============ DESKTOP: absolute + animated beams ============ */}
    <div ref={containerRef} className="relative hidden h-[500px] w-full lg:block" aria-hidden>
      {/* Beams (render behind the nodes, once mounted) */}
      {ready && providers.map((p, i) => (
        <AnimatedBeam
          key={`pb-${p.name}`}
          containerRef={containerRef}
          fromRef={providerRefs.current[i]}
          toRef={gatewayRef}
          curvature={(1.5 - i) * 16}
          duration={4}
          delay={i * 0.3}
          pathColor="#cddbd3"
          pathWidth={2}
          gradientStartColor="#4f8a72"
          gradientStopColor="#2e6b57"
        />
      ))}
      {ready && members.map((m, i) => (
        <AnimatedBeam
          key={`mb-${m.name}`}
          containerRef={containerRef}
          fromRef={gatewayRef}
          toRef={memberRefs.current[i]}
          curvature={(1.5 - i) * 16}
          duration={4}
          delay={i * 0.3 + 0.5}
          pathColor="#cddbd3"
          pathWidth={2}
          gradientStartColor="#4f8a72"
          gradientStopColor="#2e6b57"
        />
      ))}

      {/* provider chips */}
      {providers.map((p, i) => {
        const Logo = LOGOS[p.logo];
        return (
          <div
            key={p.name}
            ref={(el) => { providerRefs.current[i].current = el; }}
            className="absolute left-0 z-10 flex h-12 w-[140px] items-center gap-2.5 rounded-xl border border-border bg-white px-4 shadow-[0_1px_3px_rgba(24,58,50,0.05)]"
            style={{ top: p.top }}
          >
            <span className="text-forest"><Logo className="h-5 w-5" /></span>
            <span className="text-sm font-semibold text-forest">{p.name}</span>
          </div>
        );
      })}

      {/* gateway */}
      <div
        ref={gatewayRef}
        className="absolute left-1/2 z-10 flex h-[150px] w-[190px] -translate-x-1/2 flex-col items-center justify-center gap-3 rounded-2xl bg-forest text-center text-white shadow-lg"
        style={{ top: 173 }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><ShieldIcon className="h-5 w-5" /></span>
        <span className="text-sm font-semibold">{gatewayTitle}</span>
        <span className="flex max-w-[168px] items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium leading-tight text-emerald-200"><CheckIcon className="h-2.5 w-2.5 shrink-0" /> {gatewaySubtitle}</span>
      </div>

      {/* member cards */}
      {members.map((m, i) => (
        <div
          key={m.name}
          ref={(el) => { memberRefs.current[i].current = el; }}
          className="absolute right-0 z-10 w-[210px] rounded-2xl border border-border bg-white p-3.5 shadow-[0_1px_3px_rgba(24,58,50,0.05)]"
          style={{ top: m.top }}
        >
          <div className="flex items-center gap-2">
            <Avatar slug={m.slug} name={m.name} size={28} />
            <div className="leading-tight">
              <p className="text-xs font-bold text-forest">{m.name}</p>
              <p className="text-[10px] text-muted">{m.role}</p>
            </div>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] text-forest"><KeyIcon className="h-3 w-3 text-muted" /> {m.key}</p>
          <span className="mt-2 block max-w-full truncate rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-[#2e6b57]">allowed: {m.allowed}</span>
        </div>
      ))}
    </div>
    </>
  );
}
