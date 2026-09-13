"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMessages, type Locale, type Messages } from "@/lib/i18n";

type LocaleContextType = {
  locale: Locale;
  t: Messages;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "pt",
  t: getMessages("pt"),
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("dt-locale") as Locale | null;
      if (saved === "pt" || saved === "en") setLocaleState(saved);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("dt-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, t: getMessages(locale), setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
