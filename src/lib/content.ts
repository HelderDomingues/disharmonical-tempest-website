import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const contentDir = path.join(process.cwd(), "content");

function readYaml<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
    return (load(raw) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

export type ShowEntry = {
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketsUrl: string;
  status: string;
};

export type MusicPlatform = { name: string; url: string };
export type MusicVideo = { title: string; youtubeId: string };

export type Settings = {
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
    spotify: string;
    deezer: string;
    appleMusic: string;
    bandcamp: string;
  };
  release: { date: string; titlePt: string; titleEn: string };
  contact: {
    booking: string;
    press: string;
    general: string;
    whatsapp?: string;
    whatsappMessage?: string;
  };
};

export type Bio = { pt: string; en: string };
export type Member = { name: string; role: string; image?: string };
export type ContactContent = Settings["contact"];

export type PressKitData = {
  photos: string[];
  logos: string[];
  bioShort: Bio;
  members: { name: string; role: string }[];
};

type MediaEntry = string | { url?: string; src?: string };

function mediaList(list: MediaEntry[] | undefined): string[] {
  return (list ?? [])
    .map((entry) =>
      typeof entry === "string" ? entry : (entry.url ?? entry.src ?? ""),
    )
    .filter(Boolean);
}

export function getSettings(): Settings {
  return readYaml<Settings>("settings.yaml", {
    social: {
      instagram: "https://instagram.com/disharmonicaltempest",
      tiktok: "",
      youtube: "",
      facebook: "",
      spotify: "",
      deezer: "",
      appleMusic: "",
      bandcamp: "",
    },
    release: { date: "2026-09-18", titlePt: "", titleEn: "" },
    contact: { booking: "", press: "", general: "", whatsapp: "", whatsappMessage: "" },
  });
}

export function getShows(): ShowEntry[] {
  return readYaml<{ shows: ShowEntry[] }>("shows.yaml", { shows: [] }).shows;
}

export function getMusic(): {
  platforms: MusicPlatform[];
  latestRelease: { title: string; date: string };
  videos: MusicVideo[];
} {
  return readYaml("music.yaml", {
    platforms: [],
    latestRelease: { title: "", date: "2026-09-18" },
    videos: [],
  });
}

export function getBio(): Bio {
  return readYaml<Bio>("bio.yaml", { pt: "", en: "" });
}

export function getPressKit(): PressKitData {
  const data = readYaml<PressKitData>("presskit.yaml", {
    photos: [],
    logos: [],
    bioShort: { pt: "", en: "" },
    members: [],
  });
  return {
    ...data,
    photos: mediaList(data.photos as unknown as MediaEntry[]),
    logos: mediaList(data.logos as unknown as MediaEntry[]),
  };
}
