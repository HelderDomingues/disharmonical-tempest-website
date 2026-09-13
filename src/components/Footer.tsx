"use client";

import { useLocale } from "./LanguageProvider";
import type { Settings } from "@/lib/content";

export default function Footer({ settings }: { settings: Settings }) {
  const { t } = useLocale();
  const socials = [
    { name: "Spotify", url: settings.social.spotify },
    { name: "YouTube", url: settings.social.youtube },
    { name: "Apple Music", url: settings.social.appleMusic },
    { name: "Deezer", url: settings.social.deezer },
    { name: "Bandcamp", url: settings.social.bandcamp },
    { name: "Instagram", url: settings.social.instagram },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-steel/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 md:px-6">
        <img src="/images/logo.svg" alt="Disharmonical Tempest" className="h-9 w-auto opacity-80" />
        <nav className="flex flex-wrap justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="section-heading text-xs text-steel transition-colors hover:text-bolt"
            >
              {s.name}
            </a>
          ))}
        </nav>
        <p className="text-xs text-steel/60">
          © {new Date().getFullYear()} Disharmonical Tempest · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
