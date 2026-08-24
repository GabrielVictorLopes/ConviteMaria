"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <Image
        src="/fotos/maria8.jpeg"
        alt="Maria Clara"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] md:object-center"
      />

      {/* Degradê mais elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="tracking-[10px] uppercase text-sm md:text-base text-white/80 mb-5"
        >
          Uma noite inesquecível
        </motion.p>

        <h1 className="text-6xl md:text-9xl text-white font-light drop-shadow-2xl">
          Maria Clara
        </h1>

        <div className="flex items-center justify-center gap-4 my-5">
          <span className="w-12 md:w-20 h-[1px] bg-yellow-400/70" />
          <span className="text-yellow-400 text-3xl">✦</span>
          <span className="w-12 md:w-20 h-[1px] bg-yellow-400/70" />
        </div>

        <h2 className="text-4xl md:text-6xl text-white font-light">
          XV Anos
        </h2>

        <p className="mt-6 text-white/90 tracking-[4px] text-sm md:text-base">
          09 • 10 • 2026
        </p>

        <p className="max-w-2xl mx-auto mt-7 text-white/80 leading-7 text-sm md:text-base">
          Entre máscaras, sonhos e encantos, uma noite especial
          espera por você.
        </p>

        <a
          href="#confirmacao"
          className="
            inline-flex
            items-center
            justify-center
            mt-10
            px-10
            py-4
            border
            border-yellow-400/70
            text-yellow-300
            rounded-full
            backdrop-blur-sm
            bg-black/20
            hover:bg-yellow-500
            hover:text-black
            hover:scale-105
            transition-all
            duration-300
          "
        >
          Abrir Convite
        </a>
      </motion.div>

      {/* indicação para rolar */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}