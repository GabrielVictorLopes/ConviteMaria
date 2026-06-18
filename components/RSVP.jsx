"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // ajuste o caminho se necessário

export default function RSVP() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  async function acessarConvite(e) {
    e.preventDefault();

    if (!codigo.trim()) {
      setErro("Digite seu código.");
      return;
    }

    const { data, error } = await supabase
      .from("familias")
      .select("id")
      .eq("codigo", codigo.toUpperCase());

    if (error || !data || data.length === 0) {
      setErro("Código inválido.");
      return;
    }

    setErro("");

    router.push(`/convite/${codigo.toUpperCase()}`);
  }

  return (
    <section
      id="confirmacao"
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-6xl text-yellow-500 mb-4">
            Confirmação de Presença
          </h2>

          <p className="text-black text-xl">
            Digite o código enviado junto ao seu convite.
          </p>
        </div>

        <form
          onSubmit={acessarConvite}
          className="bg-white p-10 rounded-3xl shadow-xl"
        >
          <input
            type="text"
            placeholder="Digite seu código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              border-2
              border-[#D4AF37]
              bg-white
              text-black
              text-center
              text-xl
              outline-none
            "
          />

          {erro && (
            <p className="text-red-600 text-center mt-3 font-semibold">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-yellow-500 text-black font-bold py-4 rounded-xl hover:scale-105 transition"
          >
            Acessar Convite
          </button>
        </form>

      </div>
    </section>
  );
}