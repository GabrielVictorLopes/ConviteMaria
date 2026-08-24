"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">

      {/* IMAGEM DE FUNDO */}
      <Image
        src="/fotos/maria8.jpeg"
        alt="Maria Clara"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ESCURECIMENTO */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* CONTEÚDO */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="tracking-[8px] uppercase text-white mb-4">
          Aniversário
        </p>

        <h1 className="text-7xl md:text-9xl font-light text-white drop-shadow-lg">
          Maria Clara
        </h1>

        <h2 className="text-7xl mt-4 text-white">
          15 Anos
        </h2>

        <p className="max-w-7xl mt-8 text-white leading-8">
          Os salões se preparam para uma noite inesquecível.
          Um baile de máscaras, repleto de elegância,
          segredos e momentos que serão lembrados para sempre.
        </p>

        <div className="mt-10">
          <a
            href="#confirmacao"
            className="bg-yellow-500 text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition shadow-lg"
          >
            Entrar no Baile
          </a>
        </div>
      </motion.div>

    </section>
  );
}