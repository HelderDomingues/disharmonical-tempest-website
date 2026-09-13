const platformIcons: Record<string, string> = {
  Spotify: "/images/icons/spotify.svg",
  YouTube: "/images/icons/youtube.svg",
  "Apple Music": "/images/icons/applemusic.svg",
  Deezer: "/images/icons/deezer.svg",
  Bandcamp: "/images/icons/bandcamp.svg",
  Instagram: "/images/icons/instagram.svg",
  TikTok: "/images/icons/tiktok.svg",
  Facebook: "/images/icons/facebook.svg",
};

export function iconFor(name: string): string | null {
  return platformIcons[name] ?? null;
}
