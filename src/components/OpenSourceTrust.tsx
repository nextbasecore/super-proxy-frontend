/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </svg>
  );
}
function ServerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M8 7h.01M8 17h.01" />
    </svg>
  );
}
function EyeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
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
function CodeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}
function CheckCircle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" />
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
function ChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function FolderChevron({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function TeamIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3" /><circle cx="16.5" cy="9.5" r="2.3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14.5 19a4 4 0 0 1 6 0" />
    </svg>
  );
}
function GatewayShield({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <circle cx="12" cy="11.5" r="2.4" /><path d="m13.7 9.8 1.3-1.3" />
    </svg>
  );
}
function GlobeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const files = [
  { name: "src", folder: true },
  { name: "server", folder: true },
  { name: "routes", folder: true },
  { name: "middleware", folder: true },
  { name: "providers", folder: true },
  { name: "routing", folder: true, active: true },
  { name: "models", folder: true },
  { name: "auth", folder: true },
  { name: "limits", folder: true },
  { name: "storage", folder: true },
  { name: "utils", folder: true },
  { name: ".env.example", folder: false },
  { name: "docker-compose.yml", folder: false },
  { name: "LICENSE", folder: false },
  { name: "README.md", folder: false },
];

const features = [
  { icon: LockIcon, title: "Open-source core", desc: "The core gateway is open source and will always stay that way." },
  { icon: ServerIcon, title: "Self-host it", desc: "Run it in your own infrastructure. You stay in control." },
  { icon: EyeIcon, title: "Transparent routing", desc: "Understand how requests are routed and how models are selected." },
  { icon: ShieldIcon, title: "No credential exposure", desc: "Provider credentials are stored server-side and never shared with users." },
  { icon: CodeIcon, title: "Community first", desc: "Contribute, review, and help shape the future together." },
];

const security = [
  "Minimal data retention",
  "Local logs and full auditability",
  "Role-based access control",
  "Revoke access in one click",
  "Designed for compliance",
];

/* ------------------------------------------------------------------ */
/* Code editor mockup                                                  */
/* ------------------------------------------------------------------ */
const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#c586c0]">{children}</span>; // keyword
const F = ({ children }: { children: React.ReactNode }) => <span className="text-[#dcdcaa]">{children}</span>; // function
const V = ({ children }: { children: React.ReactNode }) => <span className="text-[#9cdcfe]">{children}</span>; // var
const P = ({ children }: { children: React.ReactNode }) => <span className="text-[#4ec9b0]">{children}</span>; // prop/type
const C = ({ children }: { children: React.ReactNode }) => <span className="text-[#6a9955]">{children}</span>; // comment

const codeLines: React.ReactNode[] = [
  <><K>export</K> <K>async</K> <K>function</K> <F>routeRequest</F>(<V>req</V>: <P>Request</P>) {"{"}</>,
  <>{"  "}<K>const</K> <V>context</V> = <K>await</K> <F>analyzeRequest</F>(<V>req</V>);</>,
  <>{"  "}<K>const</K> <V>candidates</V> = <K>await</K> <F>getAllowedModels</F>(<V>req</V>.<V>user</V>);</>,
  <>{"  "}<K>const</K> <V>scored</V> = <K>await</K> <F>scoreModels</F>(<V>candidates</V>, {"{"}</>,
  <>{"    "}<P>task</P>: <V>context</V>.<V>task</V>,</>,
  <>{"    "}<P>cost</P>: <V>context</V>.<V>costPriority</V>,</>,
  <>{"    "}<P>limits</P>: <K>await</K> <F>getRemainingLimits</F>(<V>req</V>.<V>user</V>),</>,
  <>{"    "}<P>latency</P>: <V>context</V>.<V>latencyPriority</V></>,
  <>{"  "}{"}"});</>,
  <>{"  "}<K>const</K> <V>choice</V> = <F>selectBest</F>(<V>scored</V>);</>,
  <>{"\u00A0"}</>,
  <>{"  "}<K>try</K> {"{"}</>,
  <>{"    "}<K>return</K> <K>await</K> <F>forward</F>(<V>req</V>, <V>choice</V>);</>,
  <>{"  "}{"}"} <K>catch</K> (<V>err</V>) {"{"}</>,
  <>{"    "}<K>const</K> <V>fallback</V> = <K>await</K> <F>getFallback</F>(<V>choice</V>);</>,
  <>{"    "}<K>return</K> <K>await</K> <F>forward</F>(<V>req</V>, <V>fallback</V>);</>,
  <>{"  "}{"}"}</>,
  <>{"}"}</>,
];

function CodeEditor() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#20262b] bg-[#0d1117] shadow-2xl">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-[#20262b] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-[168px] shrink-0 border-r border-[#20262b] py-3 sm:block">
          <p className="flex items-center gap-1.5 px-4 pb-2 text-xs font-semibold text-[#7d8590]">
            <span className="text-[#3fb950]">◈</span> yourai-gateway
          </p>
          <div className="mt-1">
            {files.map((f) => (
              <div key={f.name} className={`flex items-center gap-1 px-4 py-[3px] text-[12px] ${f.active ? "bg-[#161b22] text-[#e6edf3]" : "text-[#7d8590]"}`}>
                {f.folder ? <FolderChevron className="h-3 w-3 shrink-0" /> : <span className="w-3 shrink-0" />}
                <span className="truncate">{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* code area */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-[#20262b] px-4 py-2.5">
            <span className="font-mono text-xs text-[#7d8590]">src/routing/router.ts</span>
            <span className="flex items-center gap-1.5">
              <span className="rounded-md bg-[#238636] px-2.5 py-1 text-[11px] font-semibold text-white">Code</span>
              <span className="rounded-md px-2.5 py-1 text-[11px] font-medium text-[#7d8590]">Blame</span>
            </span>
          </div>
          <div className="overflow-x-auto px-2 py-3">
            <pre className="font-mono text-[12.5px] leading-[1.55]">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 shrink-0 select-none pr-3 text-right text-[#484f58]">{i + 1}</span>
                  <code className="text-[#e6edf3]">{line}</code>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function OpenSourceTrust() {
  return (
    <section id="open-source" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Top: copy + editor */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2e6b57]">Open source trust</p>
            <h2 className="mt-5 font-sans text-5xl font-semibold leading-[1.02] tracking-tight text-forest sm:text-6xl">
              Your AI gateway should not be <span className="text-vermilion">a black box.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#3d4a44]">
              Inspect the code, understand how requests are handled, and run the
              gateway in infrastructure you control.
            </p>

            <form action="mailto:contact@ampere.sh?subject=Super%20Proxy%20waitlist" method="post" encType="text/plain" className="mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row sm:gap-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:bg-white">
              <input name="email" type="email" required placeholder="Work email address" className="min-w-0 flex-1 rounded-lg border border-border bg-white px-4 py-3.5 text-sm text-forest outline-none placeholder:text-muted sm:rounded-none sm:border-0 sm:bg-transparent" />
              <button type="submit" className="press flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-forest px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#122d26] sm:rounded-none">
                Join the waitlist <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <p className="mt-3 text-sm text-muted">Opens a pre-filled email to request early access. No newsletters.</p>
          </div>

          <CodeEditor />
        </div>

        {/* Feature row */}
        <div className="mt-16 hidden grid-cols-5 gap-8 border-t border-border pt-12 md:grid">
          {features.map((f) => (
            <div key={f.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-forest"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-[15px] font-bold text-forest">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature list (mobile) */}
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white md:hidden">
          {features.map((f) => (
            <div key={f.title} className="flex items-center justify-between px-4 py-4">
              <span className="flex items-center gap-3">
                <span className="text-forest"><f.icon className="h-5 w-5" /></span>
                <span className="text-sm font-semibold text-forest">{f.title}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted" />
            </div>
          ))}
        </div>

        {/* Security by design */}
        <div className="mt-16 grid gap-10 rounded-3xl border border-border bg-surface/50 p-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2e6b57]">Security by design</p>
            <h3 className="mt-4 font-sans text-4xl font-semibold leading-tight tracking-tight text-forest">
              Built for control and <span className="text-vermilion">privacy.</span>
            </h3>
            <p className="mt-4 max-w-sm leading-7 text-[#3d4a44]">
              You decide what data is stored, where it goes, and who can access
              it. Every request passes through your gateway before it ever
              reaches a provider.
            </p>
          </div>

          {/* Checklist */}
          <div className="flex flex-col justify-center">
            <ul className="divide-y divide-border">
              {security.map((s) => (
                <li key={s} className="flex items-center gap-3 py-4">
                  <span className="text-[#2e6b57]"><CheckCircle className="h-5 w-5" /></span>
                  <span className="text-[15px] font-medium text-forest">{s}</span>
                </li>
              ))}
            </ul>
            <a href="#features" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-forest hover:underline md:hidden">
              See all security features <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
