"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import type { MusicPlatform, MusicVideo } from "@/lib/content";

export default function MusicSection({
  platforms,
  videos,
}: {
  platforms: MusicPlatform[];
  videos: MusicVideo[];
}) {
  const { t } = useLocale();

  return (
    <section id="music" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <Reveal>
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.music.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-steel md:text-lg">{t.music.subtitle}</p>
      </Reveal>

      {platforms.filter((p) => p.url).length > 0 && (
        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {platforms
              .filter((p) => p.url)
              .map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-heading border border-steel/30 px-6 py-2.5 text-sm text-bolt transition-colors hover:border-bolt hover:bg-bolt/5"
              >
                {p.name}
              </a>
            ))}
          </div>
        </Reveal>
      )}

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
