"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import type { ShowEntry } from "@/lib/content";

export default function ShowsSection({ shows }: { shows: ShowEntry[] }) {
  const { t } = useLocale();

  return (
    <section id="shows" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <Reveal>
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.shows.heading}
        </h2>
      </Reveal>

      {shows.length === 0 ? (
        <Reveal delay={120}>
          <p className="mt-12 text-steel md:text-lg">{t.shows.empty}</p>
        </Reveal>
      ) : (
        <ul className="mt-12 divide-y divide-steel/10 border-y border-steel/10">
          {shows.map((s, i) => (
            <Reveal key={`${s.date}-${i}`} delay={i * 60}>
              <li className="group flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-baseline gap-5">
                  <span className="section-heading w-24 text-xl text-ember tabular-nums">
                    {formatDate(s.date)}
                  </span>
                  <div>
                    <p className="text-lg text-bolt">{s.venue}</p>
                    <p className="text-sm text-steel">
                      {s.city}
                      {s.country ? `, ${s.country}` : ""}
                    </p>
                  </div>
                </div>
                {s.ticketsUrl ? (
                  <a
                    href={s.ticketsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-heading mt-2 inline-block border border-blood px-5 py-1.5 text-xs text-bolt transition-colors group-hover:border-ember group-hover:text-ember md:mt-0"
                  >
                    {t.shows.tickets}
                  </a>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}`;
}
