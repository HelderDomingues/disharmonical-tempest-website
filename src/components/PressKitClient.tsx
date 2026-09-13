"use client";

import Link from "next/link";
import { useLocale } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import type { PressKitData, Settings } from "@/lib/content";

export default function PressKitClient({
  pressKit,
  settings,
}: {
  pressKit: PressKitData;
  settings: Settings;
}) {
  const { locale, t } = useLocale();
  const bio = locale === "pt" ? pressKit.bioShort.pt : pressKit.bioShort.en;
  const email = settings.contact.press || settings.contact.general;

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-28 md:px-6 md:py-32">
      <Reveal className="text-center">
        <h1 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.presskit.title}
        </h1>
        <p className="mt-6 text-steel md:text-lg">{t.presskit.subtitle}</p>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-14">
          <h2 className="section-heading text-lg text-ember">{t.presskit.bio}</h2>
          <p className="mt-4 whitespace-pre-line text-steel md:text-lg">{bio}</p>
        </section>
      </Reveal>

      {pressKit.photos.length > 0 && (
        <Reveal delay={150}>
          <section className="mt-14">
            <h2 className="section-heading text-lg text-ember">{t.presskit.photos}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {pressKit.photos.map((src, i) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                  download
                >
                  <img
                    src={src}
                    alt={`Disharmonical Tempest — foto ${i + 1}`}
                    className="aspect-video w-full border border-steel/15 object-cover grayscale transition group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span className="section-heading absolute bottom-2 right-2 bg-[var(--bg-deep)]/80 px-2 py-0.5 text-[10px] text-steel opacity-0 transition group-hover:opacity-100">
                    {t.presskit.download}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {pressKit.logos.length > 0 && (
        <Reveal delay={200}>
          <section className="mt-14">
            <h2 className="section-heading text-lg text-ember">{t.presskit.logos}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pressKit.logos.map((src) => {
                const format = (src.split(".").pop() || "").toUpperCase();
                const fileName = src.split("/").pop() || src;
                const isImage = ["SVG", "PNG", "JPG", "JPEG", "WEBP"].includes(format);
                return (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 border border-steel/15 bg-[var(--bg-storm)] p-6 transition-colors hover:border-ember/50"
                    download={fileName}
                  >
                    {isImage ? (
                      <img
                        src={src}
                        alt={`Logo (${format})`}
                        className="max-h-16 w-auto object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="section-heading flex h-16 items-center border border-ember/40 px-5 text-2xl text-ember">
                        {format}
                      </span>
                    )}
                    <span className="text-center text-xs tracking-widest text-steel">
                      {t.presskit.download} · {format}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      {pressKit.members.length > 0 && (
        <Reveal delay={250}>
          <section className="mt-14">
            <h2 className="section-heading text-lg text-ember">{t.presskit.members}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pressKit.members.map((m, i) => (
                <li key={`${m.name}-${i}`} className="border-l-2 border-blood/40 pl-4">
                  <span className="text-bolt">{m.name}</span>{" "}
                  <span className="text-steel">· {m.role}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}

      <Reveal delay={300}>
        <section className="mt-14 border-t border-steel/10 pt-8">
          <h2 className="section-heading text-lg text-ember">{t.presskit.contactTitle}</h2>
          <p className="mt-3 text-steel">
            <a href={`mailto:${email}`} className="text-bolt underline-offset-4 hover:underline">
              {email}
            </a>
          </p>
        </section>
      </Reveal>

      <p className="mt-16">
        <Link href="/" className="section-heading text-xs text-steel hover:text-bolt">
          ← Disharmonical Tempest
        </Link>
      </p>
    </main>
  );
}
