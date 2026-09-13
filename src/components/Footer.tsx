"use client";

import { useLocale } from "./LanguageProvider";
import { iconFor } from "@/lib/platformIcons";
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
          {socials.map((s) => {
            const icon = iconFor(s.name);
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center border border-steel/15 transition-colors hover:border-bolt hover:bg-bolt/5"
              >
                {icon ? (
                  <img src={icon} alt="" className="h-[18px] w-[18px] opacity-80" aria-hidden />
                ) : (
                  <span className="text-[10px] text-steel">{s.name}</span>
                )}
              </a>
            );
          })}
        </nav>
        <p className="text-xs text-steel/60">
          © {new Date().getFullYear()} Disharmonical Tempest · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
