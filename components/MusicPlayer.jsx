"use client";

import { useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
      >
        <source
          src="/music/bridgerton-theme.mp3"
          type="audio/mpeg"
        />
      </audio>

      <button
        onClick={toggleMusic}
        className="
          fixed
          bottom-6
          right-6
          z-50
          bg-yellow-500
          text-black
          w-16
          h-16
          rounded-full
          shadow-xl
          flex
          items-center
          justify-center
          hover:scale-110
          transition
        "
      >
        {playing ? <FaPause /> : <FaMusic />}
      </button>
    </>
  );
}