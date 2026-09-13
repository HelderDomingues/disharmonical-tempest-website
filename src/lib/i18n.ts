import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

export type Locale = "pt" | "en";
export type Messages = typeof pt;

const dictionaries: Record<Locale, Messages> = { pt, en };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
