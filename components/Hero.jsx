"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="
        relative
        h-[78vh]
        min-h-[560px]
        md:min-h-screen
        md:h-auto
        flex
        items-center
        justify-center
        px-6
        bg-transparent
        overflow-hidden
      "
    >
      <Image
        src="/fotos/maria8.jpeg"
        alt="Maria Clara"
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-[58%_center]
          md:object-center
        "
      />

      {/* Degradê */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

      <motion.div
        className="
          relative
          z-10
          text-center
          px-4
          md:px-6
          max-w-5xl
          w-full
          md:translate-y-16
        "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            tracking-[5px]
            md:tracking-[10px]
            uppercase
            text-xl
            md:text-3xl
            text-white/80
            mb-4
            md:mb-5
          "
        >
          Uma noite inesquecível
        </motion.p>

        <h1
          className="
            text-7xl
            md:text-9xl
            text-white
            font-light
            drop-shadow-2xl
          "
        >
          Maria Clara
        </h1>

        <div className="flex items-center justify-center gap-4 my-4 md:my-5">
          <span className="w-10 md:w-20 h-[1px] bg-yellow-400/70" />

          <span className="text-yellow-400 text-2xl md:text-3xl">
            ✦
          </span>

          <span className="w-10 md:w-20 h-[1px] bg-yellow-400/70" />
        </div>

        <h2
          className="
            text-5xl
            md:text-7xl
            text-white
            font-light
          "
        >
          XV Anos
        </h2>

        <p
          className="
            mt-5
            md:mt-6
            text-white/90
            tracking-[3px]
            md:tracking-[4px]
            text-2xl
            md:text-2xl
          "
        >
          09 • 10 • 2026
        </p>
      </motion.div>

      {/* indicação para rolar */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}