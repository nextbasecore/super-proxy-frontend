import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Proxy — Redirecting to GitHub",
  description:
    "Redirecting to the Super Proxy GitHub repository after campaign tracking.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", plusJakarta.variable)}
    >
      <body>
        {children}
        {/*
          Tracking is handled inline in TrackAndRedirect for lower latency.
          Keeping the external track.js load would add an extra network hop
          before redirect.

          Previous script:
          <Script
            id="chroma-link-tap"
            src="https://api.chromastudio.ai/track.js"
            data-track-id="673c42hDp"
            strategy="afterInteractive"
          />
        */}
      </body>
    </html>
  );
}
