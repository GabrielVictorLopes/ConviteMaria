"use client";

import { useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playPromiseRef = useRef(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao reproduzir:", error);
        }
      }
    } else {
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/music/musica.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      <button
        onClick={toggleMusic}
        aria-label={playing ? "Pausar música" : "Tocar música"}
        className="fixed bottom-6 right-6 z-50 bg-yellow-500 text-black w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition"
      >
        {playing ? <FaPause /> : <FaMusic />}
      </button>
    </>
  );
}