import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import DressCode from "../components/DressCode";
import Gallery from "../components/Gallery";
import Location from "../components/Location";
import RSVP from "../components/RSVP";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  return (
    <main className="text-white overflow-hidden">
      <MusicPlayer />

      <Hero />

      <Countdown />

      <Gallery />

      <DressCode />

      <Location />

      <RSVP />
    </main>
  );
}