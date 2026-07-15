import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Super Proxy"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-contain"
            />
            <div>
              <p className="font-serif text-xl leading-none text-forest">Super Proxy</p>
              <p className="mt-1.5 text-xs text-muted">AI access management for small teams.</p>
            </div>
          </div>

          <a
            href="#waitlist"
            className="press inline-flex items-center justify-center rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#122d26]"
          >
            Join the waitlist
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Open source and built in public for teams.</p>
          <p>© 2026 Super Proxy</p>
        </div>
      </div>
    </footer>
  );
}
