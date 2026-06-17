"use client";

import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function RSVP() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // futuramente enviaremos para o Supabase

    setEnviado(true);
  };

  return (
    <section
      id="confirmacao"
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">

          <h2 className="text-6xl text-yellow-400 mb-4">
            Confirme sua Presença
          </h2>

          <p className="text-black text-xl">
            Sua presença tornará esta noite ainda mais especial.
          </p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit}  className=" space-y-6 bg-white/[0.03]  backdrop-blur-md border     border-[#D4AF37]/20 p-10 rounded-3xl shadow-xl">
            
            <input
              type="text"
              placeholder="Nome Completo"
              required
              className="w-full p-4 rounded-xl bg-black/40 border border-[#D4AF37]/20text-whitefocus:outline-none focus:border-[#D4AF37]"/>

            <input
              type="tel"
              placeholder="Telefone"
              required
              className="w-full p-4 rounded-xl bg-black/40 border border-[#D4AF37]/20text-whitefocus:outline-none focus:border-[#D4AF37]"/>

            <input
              type="number"
              placeholder="Quantidade de acompanhantes"
              min="0"
              defaultValue="0"
             className="w-full p-4 rounded-xl bg-black/40 border border-[#D4AF37]/20text-whitefocus:outline-none focus:border-[#D4AF37]"/>


            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:scale-105 transition"
            >
              Confirmar Presença
            </button>
          </form>
        ) : (
          <div className="text-center bg-black border border-yellow-500/30 rounded-3xl p-12">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />

            <h3 className="text-3xl text-yellow-400 mb-4">
              Presença Confirmada!
            </h3>

            <p className="text-gray-300">
              Obrigado por confirmar.
              Estamos ansiosos para celebrar esta noite inesquecível com você.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}