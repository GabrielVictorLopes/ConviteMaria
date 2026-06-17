"use client";

import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Location() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="uppercase tracking-[6px] text-6xl text-yellow-400 mb-3">
            Local do Evento
          </p>

          <h2 className="text-5xl text-yellow-400 mb-4">
            Zen House
          </h2>

          <p className="text-black text-lg">
            Av. Alto do Chuá, 121
          </p>

          <p className="text-black text-lg">
            Fábio Notini • Divinópolis - MG
          </p>
        </div>

        {/* Mapa */}
        <div className="overflow-hidden rounded-3xl border border-yellow-500/30 shadow-2xl">

          <iframe
            src="https://www.google.com/maps?q=Av.+Alto+do+Chuá,+121,+Divinópolis,+MG&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Botões */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <a
            href="https://maps.google.com/?q=Av.+Alto+do+Chuá,+121,+Divinópolis,+MG"
            target="_blank"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition"
          >
            <FaMapMarkerAlt className="inline mr-2" />
            Abrir no Google Maps
          </a>

          <a
            href="https://wa.me/5537988065152"
            target="_blank"
            className="border border-yellow-500 text-yellow-400 px-8 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition"
          >
            <FaWhatsapp className="inline mr-2" />
            Falar com a Organização
          </a>

        </div>

      </div>
    </section>
  );
}