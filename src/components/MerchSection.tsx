"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";

export default function MerchSection() {
  const { t } = useLocale();

  return (
    <section id="merch" className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
      <Reveal className="text-center">
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.merch.heading}
        </h2>
      </Reveal>
      <Reveal delay={120} className="mt-12 text-center">
        <div className="mx-auto max-w-xl border border-steel/20 bg-steel/5 px-8 py-12">
          <p className="section-heading text-xl tracking-widest text-ember md:text-2xl">
            {t.merch.soon}
          </p>
          <p className="mt-4 text-steel md:text-base">{t.merch.soonDetail}</p>
        </div>
      </Reveal>
    </section>
  );
}
