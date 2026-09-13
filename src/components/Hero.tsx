"use client";

import { useEffect, useState } from "react";
import { useLocale } from "./LanguageProvider";
import { useParallax } from "./useParallax";
import StormCanvas from "./StormCanvas";
import { iconFor } from "@/lib/platformIcons";
import type { Settings } from "@/lib/content";

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  if (now === null) return null;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return { out: true };

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { out: false, d, h, m, s };
}

export default function Hero({ settings }: { settings: Settings }) {
  const { t } = useLocale();
  const countdown = useCountdown(settings.release.date);

  const bgRef = useParallax(0.15, 6);
  const bandRef = useParallax(0.45, 0);
  const logoRef = useParallax(0.6, 0);

  const platforms = [
    { name: "Spotify", url: settings.social.spotify },
    { name: "YouTube", url: settings.social.youtube },
    { name: "Apple Music", url: settings.social.appleMusic },
    { name: "Deezer", url: settings.social.deezer },
    { name: "Bandcamp", url: settings.social.bandcamp },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Layer 0 — volumetric storm shader + grain + rain */}
      <div className="parallax-layer" ref={bgRef}>
        <div className="storm-gradient absolute inset-[-15%]" />
        <StormCanvas className="absolute inset-0 h-full w-full" />
        <div className="grain absolute inset-0" />
        <div className="rain rain-fall" />
      </div>

      {/* Layer 1 — fog was removed: the shader already renders volumetric clouds */}

      {/* Layer 2 — band photo */}
      <div className="parallax-layer" ref={bandRef}>
        <picture className="absolute inset-x-0 bottom-0 mx-auto flex justify-center overflow-x-clip">
          <img
            src="/images/band.webp"
            alt="Disharmonical Tempest"
            className="h-auto w-[150vw] max-w-none object-contain object-bottom opacity-90 md:w-auto md:max-h-[70vh] md:max-w-[96rem]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg-deep)]" />
      </div>

      {/* Layer 3 — logo (top, clear of header) + countdown stack (photo footer) */}
      <div className="parallax-layer flex h-full w-full flex-col items-center px-4 pt-[4.5rem]" ref={logoRef}>
        <img
          src="/images/logo.svg"
          alt="Disharmonical Tempest"
          className="logo-flicker max-h-[26vh] w-auto max-w-xl drop-shadow-[0_0_35px_rgba(200,212,232,0.25)]"
        />

        <div className="mt-6 flex flex-col items-center md:mt-auto">
          {countdown && !countdown.out ? (
            <>
              <p className="section-heading mt-6 max-w-xs text-center text-xs tracking-widest text-white md:max-w-none md:text-sm">
                {t.hero.releaseHeading}
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#33125c]/50 px-5 py-3 font-mono text-3xl text-bolt md:mt-6 md:px-8 md:text-5xl">
              {countdown.d !== undefined ? (
                <>
                  <TimeCell value={countdown.d} label={t.hero.daysShort} />
                  <span className="opacity-50">:</span>
                  <TimeCell value={countdown.h} label={t.hero.hours} />
                  <span className="opacity-50">:</span>
                  <TimeCell value={countdown.m} label={t.hero.minutes} />
                  <span className="opacity-50">:</span>
                  <TimeCell value={countdown.s} label={t.hero.seconds} />
                </>
              ) : null}
              </div>
              <div className="mt-4 flex items-center gap-4 pb-5">
                {platforms.map((s) => {
                  const icon = iconFor(s.name);
                  const inner = icon ? (
                    <img src={icon} alt="" className="h-6 w-6" aria-hidden />
                  ) : (
                    <span className="text-[10px] text-steel">{s.name}</span>
                  );
                  return s.url ? (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="transition-opacity hover:opacity-100"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span key={s.name} aria-disabled="true" className="opacity-40">
                      {inner}
                    </span>
                  );
                })}
              </div>
            </>
          ) : countdown?.out ? (
            <p className="mt-6 section-heading text-sm text-ember md:text-base">
              {t.hero.outNow}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function TimeCell({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="min-w-[2ch] text-center tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-steel md:text-xs">
        {label}
      </span>
    </span>
  );
}
