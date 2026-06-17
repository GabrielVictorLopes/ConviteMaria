"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-10-09T22:00:00");

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        const minutos = Math.floor(
          (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );
        const segundos = Math.floor(
          (difference % (1000 * 60)) / 1000
        );

        setTimeLeft({
          dias,
          horas,
          minutos,
          segundos,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 text-center bg-gradient-to-b">
      <h2 className="text-6xl md:text-6xl text-yellow-400 mb-4">
        A Contagem Começou
      </h2>

      <p className="text-black mb-12 text-xl">
        09 de Outubro de 2026 às 22:00
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <Card valor={timeLeft.dias} titulo="Dias" />
        <Card valor={timeLeft.horas} titulo="Horas" />
        <Card valor={timeLeft.minutos} titulo="Minutos" />
        <Card valor={timeLeft.segundos} titulo="Segundos" />
      </div>
    </section>
  );
}

function Card({ valor, titulo }) {
  return (
    <div className="w-32 h-32 border border-yellow-500 rounded-2xl flex flex-col items-center justify-center shadow-lg">
      <span className="text-4xl font-bold text-yellow-400">
        {valor}
      </span>

      <span className="text-black mt-2 text-lg">
        {titulo}
      </span>
    </div>
  );
}