"use client";

import { useEffect, useState } from "react";
import { useLocale } from "./LanguageProvider";
import { useParallax } from "./useParallax";
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
  const cloudsRef = useParallax(0.3, 16);
  const bandRef = useParallax(0.45, 24);
  const logoRef = useParallax(0.6, 0);

  const socials = [
    { name: "Spotify", url: settings.social.spotify },
    { name: "YouTube", url: settings.social.youtube },
    { name: "Apple Music", url: settings.social.appleMusic },
    { name: "Deezer", url: settings.social.deezer },
    { name: "Bandcamp", url: settings.social.bandcamp },
    { name: "Instagram", url: settings.social.instagram },
  ].filter((s) => s.url);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Layer 0 — deep storm gradient + grain + rain + lightning */}
      <div className="parallax-layer" ref={bgRef}>
        <div className="storm-gradient absolute inset-[-15%]" />
        <div className="grain absolute inset-0" />
        <div className="rain rain-fall" />
        <div className="lightning lightning-hit" style={{ ["--flash-delay" as string]: "3.2s" }} />
      </div>

      {/* Layer 1 — drifting fog clouds */}
      <div className="parallax-layer" ref={cloudsRef}>
        <div className="cloud cloud-drift-a absolute h-[45vh] w-[70vw] top-[10%] left-[-10%]" />
        <div className="cloud cloud-b cloud-drift-b absolute h-[38vh] w-[55vw] top-[45%] right-[-15%]" />
        <div className="cloud cloud-drift-c absolute h-[30vh] w-[60vw] top-[70%] left-[20%]" />
        <div className="lightning lightning-hit" style={{ ["--flash-delay" as string]: "6.5s" }} />
      </div>

      {/* Layer 2 — band photo */}
      <div className="parallax-layer" ref={bandRef}>
        <picture className="absolute inset-x-0 bottom-[12vh] mx-auto block w-full max-w-5xl px-4">
          <img
            src="/images/band.webp"
            alt="Disharmonical Tempest"
            className="mx-auto w-full max-w-5xl object-contain opacity-90"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg-deep)]" />
      </div>

      {/* Layer 3 — logo + countdown + links */}
      <div className="parallax-layer flex h-full w-full flex-col items-center justify-center px-4 pb-[42vh]" ref={logoRef}>
        <img
          src="/images/logo.svg"
          alt="Disharmonical Tempest"
          className="logo-flicker w-full max-w-xl drop-shadow-[0_0_35px_rgba(200,212,232,0.25)]"
        />
        <p className="section-heading mt-4 text-sm text-steel md:text-base">
          {t.hero.tagline}
        </p>

        {countdown && !countdown.out ? (
          <div className="mt-8 flex items-center gap-3 font-mono text-lg text-bolt md:text-2xl">
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
        ) : countdown?.out ? (
          <p className="mt-8 section-heading text-sm text-ember md:text-base">
            {t.hero.outNow}
          </p>
        ) : null}

        {socials.length > 0 && (
          <nav className="mt-8 flex flex-wrap justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="section-heading border border-steel/30 px-4 py-1.5 text-xs text-steel transition-colors hover:border-bolt hover:text-bolt"
              >
                {s.name}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-steel/60">
        <svg width="22" height="32" viewBox="0 0 22 32" fill="none" aria-hidden>
          <path d="M11 2v26M11 28l-6-6M11 28l6-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
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
