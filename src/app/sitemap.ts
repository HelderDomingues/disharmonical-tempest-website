import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://disharmonicaltempest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/presskit`, lastModified: new Date() },
  ];
}
