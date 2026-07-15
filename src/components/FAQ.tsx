"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    icon: "key",
    question: "Does every employee get a separate API key?",
    answer:
      "Yes. Every teammate gets an individual key, so access, limits, usage, revocation, and audits stay tied to the right person.",
  },
  {
    icon: "shield",
    question: "Can admins choose which models each key can use?",
    answer:
      "Yes. Admins can allow or block models per key, role, or team and update access without sharing provider credentials.",
  },
  {
    icon: "code",
    question: "Does it work with OpenAI-compatible apps?",
    answer:
      "Yes. Point any OpenAI-compatible client at the Super Proxy base URL and continue using the same SDK and request format.",
  },
  {
    icon: "link",
    question: "Can we connect both subscriptions and regular API accounts?",
    answer:
      "Yes. Super Proxy is designed to route across eligible subscriptions and standard provider API accounts from one managed gateway.",
  },
  {
    icon: "server",
    question: "Can we self-host Super Proxy?",
    answer:
      "The gateway is being built with self-hosting in mind. Join the waitlist to receive the repository and deployment instructions when they are published.",
  },
  {
    icon: "database",
    question: "Where are provider credentials stored?",
    answer:
      "Credentials stay encrypted on the server and are never exposed to employees, client applications, or individual API keys.",
  },
  {
    icon: "user",
    question: "Can one employee’s access be revoked without affecting others?",
    answer:
      "Yes. Revoke or rotate one employee key instantly without changing provider passwords or interrupting the rest of the team.",
  },
  {
    icon: "globe",
    question: "Which AI providers will be supported first?",
    answer:
      "The first integrations focus on OpenAI, Anthropic, GLM / z.ai, and Kimi, followed by additional OpenAI-compatible providers.",
  },
  {
    icon: "rocket",
    question: "When will the repository be published?",
    answer:
      "We are preparing the first public release now. Join the waitlist and we will send one email when the repository is ready.",
  },
  {
    icon: "lock",
    question: "Is my data used to train any models?",
    answer:
      "Super Proxy does not use your company traffic to train models. Requests are routed according to your configuration and each provider’s data policy.",
  },
] as const;

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "key":
      return <svg {...common}><circle cx="7.5" cy="15.5" r="4.5" /><path d="m11 12 8.5-8.5M16 7l3 3" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><path d="m9.5 12 2 2 3.5-3.5" /></svg>;
    case "code":
      return <svg {...common}><path d="m9 8-4 4 4 4M15 8l4 4-4 4" /></svg>;
    case "link":
      return <svg {...common}><path d="m10 13.5 4-4M7.5 16.5l-1 1a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M16.5 7.5l1-1a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" /></svg>;
    case "server":
    case "database":
      return <svg {...common}><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" /></svg>;
    case "rocket":
      return <svg {...common}><path d="M14 5c3-2 5-2 7-2 0 2 0 4-2 7l-5 5-5-5 5-5Z" /><path d="m9 10-4 1-2 2 5 1M14 15l-1 4-2 2-1-5" /><circle cx="16" cy="8" r="1" /></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    case "question":
      return <svg {...common}><path d="M9.5 9a2.7 2.7 0 1 1 4.6 1.9c-1.4 1.2-2.1 1.5-2.1 3.1M12 18h.01" /></svg>;
    default:
      return null;
  }
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-5 shrink-0" aria-hidden>
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
      <span className={`absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`} />
    </span>
  );
}

function FAQItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-answer-${index}`;
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="press flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-forest">
          <Icon name={item.icon} />
        </span>
        <span className="flex-1 text-[14px] font-bold leading-5 text-forest sm:text-[15px]">
          {item.question}
        </span>
        <span className="text-forest"><PlusIcon open={open} /></span>
      </button>
      <div id={panelId} className={`faq-answer ${open ? "is-open" : ""}`}>
        <div className="overflow-hidden">
          <p className="pb-5 pl-[72px] pr-5 text-sm leading-6 text-muted sm:pl-[76px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const [showAllMobile, setShowAllMobile] = useState(false);

  const left = faqs.slice(0, 5);
  const right = faqs.slice(5);

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const renderColumn = (items: readonly (typeof faqs)[number][], offset: number) => (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_4px_rgba(24,58,50,0.04)]">
      {items.map((item, localIndex) => {
        const index = offset + localIndex;
        return (
          <FAQItem
            key={item.question}
            item={item}
            index={index}
            open={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        );
      })}
    </div>
  );

  return (
    <section id="faq" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_390px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2e6b57]">FAQ</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-forest sm:text-6xl">
              Frequently asked <span className="text-vermilion">questions.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#3d4a44]">
              Everything you need to know about Super Proxy and how it helps
              your team use AI with the right access and controls.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_1px_4px_rgba(24,58,50,0.04)] sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface text-forest">
                <Icon name="question" className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-forest">Still have questions?</p>
                <p className="mt-1 text-sm text-muted">We&apos;re here to help.</p>
                <a
                  href="mailto:contact@ampere.sh"
                  className="press mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-forest transition-colors hover:bg-surface"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: two full columns */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2">
          {renderColumn(left, 0)}
          {renderColumn(right, 5)}
        </div>

        {/* Mobile: first five, then reveal the rest */}
        <div className="mt-10 md:hidden">
          {renderColumn(showAllMobile ? faqs : left, 0)}
          {!showAllMobile && (
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="press mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-bold text-forest"
            >
              View all questions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
            </button>
          )}
        </div>

        {/* Waitlist banner */}
        <div className="mt-14 grid items-center gap-7 rounded-3xl border border-border bg-surface/50 p-7 sm:p-9 lg:grid-cols-[240px_1fr_auto] lg:gap-10">
          <div className="flex items-center justify-center">
            <Image
              src="/faq-open-source-v2.png"
              alt="Open-source Super Proxy repository illustration"
              width={412}
              height={234}
              className="h-auto w-full max-w-[280px] object-contain"
            />
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-forest">Open by design. Built for teams.</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Super Proxy is being built in the open. Join the waitlist to get
              the repository, docs, and launch update when they are ready.
            </p>
          </div>
          <a
            href="#waitlist"
            className="press inline-flex items-center justify-center rounded-xl bg-forest px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#122d26]"
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
