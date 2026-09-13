"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import { iconFor } from "@/lib/platformIcons";

export type SocialEntry = { name: string; url: string };

export default function SocialsSection({ socials }: { socials: SocialEntry[] }) {
  const { t } = useLocale();
  const cta = socials.find((s) => s.url);

  return (
    <section id="social" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <Reveal className="text-center">
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.socials.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-steel md:text-lg">{t.socials.subtitle}</p>
      </Reveal>

      <nav className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {socials.map((s, i) => {
          const icon = iconFor(s.name);
          const linked = !!s.url;
          const inner = (
            <>
              {icon ? (
                <img src={icon} alt="" className="h-7 w-7" aria-hidden />
              ) : (
                <span className="text-sm text-steel">{s.name}</span>
              )}
              <span className="section-heading text-sm tracking-widest text-bolt">{s.name}</span>
            </>
          );
          const cls =
            "flex flex-col items-center gap-3 border border-steel/20 px-4 py-8 transition-colors" +
            (linked
              ? " hover:border-bolt hover:bg-bolt/5"
              : " opacity-40 aria-disabled");
          return (
            <Reveal key={s.name} delay={i * 60}>
              {linked ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div className={cls} aria-disabled="true">
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </nav>

      {cta && (
        <Reveal delay={200} className="mt-12 text-center">
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="section-heading inline-block border border-blood bg-[#33125c]/50 px-8 py-3 text-sm tracking-widest text-bolt transition-colors hover:border-ember hover:text-ember"
          >
            {t.socials.cta}
          </a>
        </Reveal>
      )}
    </section>
  );
}
