import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getSettings } from "@/lib/content";

const SITE_URL = "https://disharmonicaltempest.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const settings = getSettings();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Disharmonical Tempest",
    template: "%s · Disharmonical Tempest",
  },
  description:
    "Pioneira do Death Metal Melódico no Brasil, formada em Campo Grande (MS). EP autointitulado em 18.09.2026, produzido por Tarsos Morais e lançado pela AKASHA Records.",
  keywords: [
    "Disharmonical Tempest",
    "melodic death metal",
    "metal",
    "banda",
    "brasil",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Disharmonical Tempest",
    title: "Disharmonical Tempest",
    description: "Pioneira do Death Metal Melódico no Brasil · EP autointitulado em 18.09.2026 · AKASHA Records.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disharmonical Tempest",
    description: "Pioneira do Death Metal Melódico no Brasil · EP autointitulado em 18.09.2026 · AKASHA Records.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#07070b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Disharmonical Tempest",
  genre: "Melodic Death Metal",
  url: SITE_URL,
  foundingLocation: {
    "@type": "Place",
    name: "Campo Grande, MS, Brasil",
  },
  sameAs: Object.values(settings.social).filter(Boolean),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
