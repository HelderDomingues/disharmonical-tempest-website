"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useLocale } from "./LanguageProvider";
import type { ContactContent } from "@/lib/content";

export default function ContactSection({ contact }: { contact: ContactContent }) {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const email = contact.general || contact.booking;

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-4 py-24 md:px-6 md:py-32">
      <Reveal className="text-center">
        <h2 className="section-heading heading-strike text-3xl text-bolt md:text-5xl">
          {t.contact.heading}
        </h2>
        <p className="mt-6 text-steel md:text-lg">{t.contact.intro}</p>
      </Reveal>

      <Reveal delay={120}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={() => setSent(true)}
          className="mt-10 space-y-4"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>

          <input
            type="text"
            name="name"
            required
            placeholder={t.contact.namePlaceholder}
            className="w-full border border-steel/30 bg-transparent px-4 py-3 text-bolt placeholder-steel/50 outline-none transition-colors focus:border-bolt"
          />
          <input
            type="email"
            name="email"
            required
            placeholder={t.contact.emailPlaceholder}
            className="w-full border border-steel/30 bg-transparent px-4 py-3 text-bolt placeholder-steel/50 outline-none transition-colors focus:border-bolt"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className="w-full border border-steel/30 bg-transparent px-4 py-3 text-bolt placeholder-steel/50 outline-none transition-colors focus:border-bolt"
          />
          <button
            type="submit"
            className="section-heading w-full bg-blood px-6 py-3 text-sm text-white transition-colors hover:bg-ember hover:text-[var(--bg-deep)]"
          >
            {t.contact.send}
          </button>
          {sent && (
            <p className="text-sm text-ember" role="status">
              {t.contact.thanks}
            </p>
          )}
        </form>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10 flex flex-col items-center gap-4 text-sm text-steel">
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                contact.whatsappMessage || "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-steel/30 bg-steel/5 px-6 py-3 text-bolt transition-colors hover:border-ember hover:text-ember"
            >
              <img
                src="/images/icons/whatsapp.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              {t.contact.whatsapp}
            </a>
          )}
          <p>
            {t.contact.bookings}{" "}
            <a href={`mailto:${email}`} className="text-bolt underline-offset-4 hover:underline">
              {email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
