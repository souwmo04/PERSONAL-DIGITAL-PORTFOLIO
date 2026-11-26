import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali, Sora } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IntroProvider } from "@/components/motion/Intro";
import { Cursor } from "@/components/ui/Cursor";
import { SiteNav } from "@/components/layout/SiteNav";
import { SocialRail } from "@/components/layout/SocialRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
// Bangla glyphs only appear in a few places, so this font is not preloaded.
const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
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
  themeColor: "#060609",
  width: "device-width",
  initialScale: 1,
};

const INTRO_GATE = `try{if(sessionStorage.getItem("ff-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-seen")}}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/fahim-foysal-headshot.jpg`,
  email: `mailto:${site.email}`,
  jobTitle: "Research Assistant",
  worksFor: { "@type": "Organization", name: "TriModal AI Lab, North South University" },
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
      className={`${geist.variable} ${geistMono.variable} ${sora.variable} ${bengali.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: skip the loader for returning visitors and reduced motion. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      </head>
      {/* suppressHydrationWarning: extensions such as Grammarly add attributes to <body> before React loads. */}
      <body className="grain min-h-dvh" suppressHydrationWarning>
        <div id="top" aria-hidden />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-violet px-4 py-2 text-sm font-medium text-void transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <IntroProvider>
            <SmoothScroll />
            <Cursor />
            <div className="no-print">
              <SiteNav />
              <SocialRail />
            </div>
            <main id="main">{children}</main>
            <div className="no-print">
              <SiteFooter />
            </div>
          </IntroProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
