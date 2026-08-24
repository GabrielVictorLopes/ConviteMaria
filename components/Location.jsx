"use client";

import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Location() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
  <p className="uppercase tracking-[8px] text-[#c9a86a] text-xs mb-4">
    Localização
  </p>

  <h2 className="text-5xl md:text-7xl text-yellow-400 font-light">
    Zen House
  </h2>

  <div className="w-16 h-px bg-[#c9a86a]/50 mx-auto my-6" />

  <p className="text-black/70 text-lg">
    Av. Alto do Chuá, 121
  </p>

  <p className="text-black/50 mt-1">
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