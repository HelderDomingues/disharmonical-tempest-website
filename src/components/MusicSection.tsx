"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import { iconFor } from "@/lib/platformIcons";
import type { MusicPlatform, MusicVideo, Settings } from "@/lib/content";

export default function MusicSection({
  platforms,
  videos,
  release,
  ctaUrl,
}: {
  platforms: MusicPlatform[];
  videos: MusicVideo[];
  release: Settings["release"];
  ctaUrl?: string;
}) {
  const { t, locale } = useLocale();

  return (
    <section id="music" className="relative mx-auto max-w-6xl px-4 py-24 text-center md:px-6 md:py-32">
      <Reveal>
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.music.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-steel md:text-lg">{t.music.subtitle}</p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mx-auto mt-12 max-w-2xl border border-ember/40 bg-ember/5 px-6 py-10">
          <p className="section-heading text-3xl text-ember tabular-nums md:text-5xl">
            {formatDate(release.date)}
          </p>
          <p className="mt-3 text-bolt md:text-lg">
            {locale === "en" ? release.titleEn : release.titlePt}
          </p>
          {ctaUrl && (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="section-heading mt-8 inline-block bg-ember px-8 py-3 text-sm tracking-widest text-[#07070b] transition-colors hover:bg-bolt"
            >
              {t.music.cta}
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {platforms.map((p) => {
            const icon = iconFor(p.name);
            const linked = Boolean(p.url);
            const content = (
              <>
                {icon && <img src={icon} alt="" className="h-5 w-5" aria-hidden />}
                <span>{p.name}</span>
              </>
            );
            const cls = linked
              ? "flex items-center gap-2.5 border border-steel/30 px-5 py-2.5 text-sm text-bolt transition-colors hover:border-bolt hover:bg-bolt/5"
              : "flex items-center gap-2.5 border border-steel/15 px-5 py-2.5 text-sm text-steel/40 opacity-60";
            return linked ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {content}
              </a>
            ) : (
              <span key={p.name} className={cls} aria-disabled="true">
                {content}
              </span>
            );
          })}
        </div>
      </Reveal>

      {videos.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {videos
            .filter((v) => v.youtubeId)
            .map((v, i) => (
              <Reveal key={v.youtubeId} delay={i * 100}>
                <div className="aspect-video w-full border border-steel/15">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </Reveal>
            ))}
        </div>
      )}
    </section>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
