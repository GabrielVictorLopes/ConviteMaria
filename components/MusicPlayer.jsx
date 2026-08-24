"use client";

import { useEffect, useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.5;

    // Tenta autoplay
    const tentarTocar = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Navegador bloqueou o autoplay.
      }
    };

    tentarTocar();

    // Se o autoplay for bloqueado,
    // toca na primeira interação do usuário.
    const iniciarNaInteracao = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
        setPlaying(true);

        document.removeEventListener("click", iniciarNaInteracao);
        document.removeEventListener("touchstart", iniciarNaInteracao);
      } catch {}
    };

    document.addEventListener("click", iniciarNaInteracao);
    document.addEventListener("touchstart", iniciarNaInteracao);

    return () => {
      document.removeEventListener("click", iniciarNaInteracao);
      document.removeEventListener("touchstart", iniciarNaInteracao);
    };
  }, []);

  const toggleMusic = async (event) => {
    // Impede que o clique do botão também seja interpretado
    // pelo listener global.
    event.stopPropagation();

    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Erro ao reproduzir:", error);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/music/musica.mp3" type="audio/mpeg" />
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