"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import type { Bio, Member } from "@/lib/content";

export default function BioSection({
  bio,
  members,
}: {
  bio: Bio;
  members: Member[];
}) {
  const { t } = useLocale();
  const text = useLocale().locale === "pt" ? bio.pt : bio.en;

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <Reveal>
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.about.heading}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 max-w-3xl space-y-4 text-steel md:text-lg">
          {text
            .split(/\n\s*\n/)
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </Reveal>

      {members.length > 0 && (
        <Reveal delay={150}>
          <h3 className="section-heading mt-14 text-lg text-ember">
            {t.about.members}
          </h3>
        </Reveal>
      )}
      {members.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((m, i) => (
            <Reveal key={`${m.name}-${i}`} delay={i * 60}>
              <article className="border-l-2 border-blood/40 pl-4">
                <h4 className="text-sm text-bolt md:text-base">{m.name}</h4>
                <p className="section-heading text-[11px] text-steel md:text-xs">{m.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
