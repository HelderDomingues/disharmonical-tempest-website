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
      <Reveal className="text-center">
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.about.heading}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-steel md:text-lg">
          {text
            .split(/\n\s*\n/)
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </Reveal>

      {members.length > 0 && (
        <Reveal delay={150} className="text-center">
          <h3 className="section-heading mt-14 text-lg text-ember">
            {t.about.members}
          </h3>
        </Reveal>
      )}
      {members.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {members.map((m, i) => (
            <Reveal key={`${m.name}-${i}`} delay={i * 60}>
              <article className="group text-center">
                <div className="relative mx-auto aspect-square w-full overflow-hidden border border-steel/20 bg-[#0a0a12]">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top grayscale-[35%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#33125c]/50 via-[#0a0a12] to-[#07070b]">
                      <span className="section-heading text-2xl text-steel/40 transition-colors group-hover:text-ember md:text-3xl">
                        {m.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="section-heading mt-3 text-sm text-bolt md:text-base">
                  {m.name}
                </h4>
                <p className="section-heading text-[11px] text-steel md:text-xs">
                  {m.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
