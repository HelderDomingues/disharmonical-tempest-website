import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MusicSection from "@/components/MusicSection";
import ShowsSection from "@/components/ShowsSection";
import BioSection from "@/components/BioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getMusic, getShows, getBio, getPressKit, getSettings } from "@/lib/content";

export default function Home() {
  const settings = getSettings();
  const music = getMusic();
  const shows = getShows();
  const bio = getBio();
  const pressKit = getPressKit();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero settings={settings} />
        <MusicSection platforms={music.platforms} videos={music.videos} />
        <ShowsSection shows={shows} />
        <BioSection bio={bio} members={pressKit.members} />
        <ContactSection contact={settings.contact} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
