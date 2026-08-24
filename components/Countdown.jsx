"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const eventDate = new Date("2026-10-09T22:00:00");

  const calcularTempo = () => {
    const agora = new Date();
    const diferenca = eventDate - agora;

    if (diferenca <= 0) {
      return {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
      };
    }

    return {
      dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
      horas: Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
      ),
      minutos: Math.floor(
        (diferenca / (1000 * 60)) % 60
      ),
      segundos: Math.floor(
        (diferenca / 1000) % 60
      ),
    };
  };

  const [tempo, setTempo] = useState(calcularTempo());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo(calcularTempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const itens = [
    { valor: tempo.dias, label: "Dias" },
    { valor: tempo.horas, label: "Horas" },
    { valor: tempo.minutos, label: "Min" },
    { valor: tempo.segundos, label: "Seg" },
  ];

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[8px] text-yellow-600 text-xs mb-4"
        >
          Está chegando
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl text-yellow-500 font-light"
        >
          A Contagem Começou
        </motion.h2>

        <div className="flex items-center justify-center gap-4 mt-6 mb-12">
          <div className="w-16 h-[1px] bg-yellow-500/40" />
          <span className="text-yellow-500 text-xl">
            ✦
          </span>
          <div className="w-16 h-[1px] bg-yellow-500/40" />
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-6">
          {itens.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              className="
                border
                border-yellow-500/30
                rounded-2xl
                py-5
                md:py-8
                px-1
                md:px-4
                bg-white/40
                backdrop-blur-sm
                shadow-sm
              "
            >
              <div className="text-3xl md:text-6xl text-yellow-500 font-light">
                {String(item.valor).padStart(2, "0")}
              </div>

              <div className="
                uppercase
                tracking-[2px]
                md:tracking-[4px]
                text-[9px]
                md:text-xs
                text-black/50
                mt-2
              ">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-black/50 text-lg md:text-xl tracking-wide">
          09 de outubro de 2026 • 22h
        </p>

      </div>
    </section>
  );
} 