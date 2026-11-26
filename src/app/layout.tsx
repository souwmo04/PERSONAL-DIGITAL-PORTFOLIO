import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: AI Researcher & Software Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Fahim Foysal",
    "AI researcher",
    "vision-language models",
    "multimodal AI",
    "LLM",
    "accessible AI",
    "North South University",
    "TriModal AI Lab",
    "Bangladesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name}: AI Researcher & Software Engineer`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: AI Researcher & Software Engineer`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Research Assistant",
  worksFor: {
    "@type": "Organization",
    name: "TriModal AI Lab, North South University",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "North South University" },
  address: { "@type": "PostalAddress", addressCountry: "BD" },
  knowsAbout: [
    "Large Language Models",
    "Vision-Language Models",
    "Multimodal AI",
    "Computer Vision",
    "Natural Language Processing",
    "Human-Computer Interaction",
  ],
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="grain min-h-dvh">
        <div id="top" aria-hidden />
        <a
          href="#main"
          className="meta fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <div className="no-print">
            <SiteNav />
          </div>
          <main id="main">{children}</main>
          <div className="no-print">
            <SiteFooter />
          </div>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
