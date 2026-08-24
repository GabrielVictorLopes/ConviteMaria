"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function RSVP() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  async function acessarConvite(e) {
    e.preventDefault();

    if (!codigo.trim()) {
      setErro("Digite seu código.");
      return;
    }

    setCarregando(true);
    setErro("");

    const codigoFormatado = codigo.trim().toUpperCase();

    const { data, error } = await supabase
      .from("familias")
      .select("id")
      .eq("codigo", codigoFormatado);

    if (error || !data || data.length === 0) {
      setErro("Código inválido. Verifique e tente novamente.");
      setCarregando(false);
      return;
    }

    router.push(`/convite/${codigoFormatado}`);
  }

  return (
    <section
      id="confirmacao"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* decoração de fundo */}
  
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* detalhe superior */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-[1px] bg-yellow-500/40" />
          <span className="text-yellow-500 text-2xl">
            ✦
          </span>
          <div className="w-16 h-[1px] bg-yellow-500/40" />
        </div>

        <p className="uppercase tracking-[6px] text-yellow-600 text-2xl mb-4">
          Lista de convidados
        </p>

        <h2 className="text-5xl md:text-7xl text-yellow-500 font-light">
          Sua Presença
        </h2>

        <p className="mt-6 text-black/70 text-xl leading-8 max-w-xl mx-auto">
          Insira o código recebido junto ao seu convite para acessar
          sua confirmação de presença no baile.
        </p>

        <form
          onSubmit={acessarConvite}
          className="
            mt-10
            bg-white/80
            backdrop-blur-md
            border
            border-yellow-500/20
            p-5
            md:p-8
            rounded-[30px]
            shadow-xl
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-3
              p-2
              rounded-2xl
              border
              border-yellow-500/40
              bg-white
            "
          >
            <input
              type="text"
              placeholder="Código do convite"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value.toUpperCase());
                setErro("");
              }}
              className="
                flex-1
                px-6
                py-4
                bg-transparent
                text-black
                text-center
                md:text-left
                text-lg
                tracking-[2px]
                uppercase
                font-sans
                outline-none
                placeholder:text-black/30
                placeholder:normal-case
                placeholder:tracking-normal
              "
            />

            <button
              type="submit"
              disabled={carregando}
              className="
                bg-yellow-500
                text-black
                px-8
                py-4
                rounded-xl
                font-semibold
                transition-all
                duration-300
                hover:scale-105
                hover:bg-yellow-400
                disabled:opacity-60
                disabled:cursor-not-allowed
                md:min-w-[170px]
              "
            >
              {carregando ? "Verificando..." : "Entrar no Baile →"}
            </button>
          </div>

          {erro && (
            <p className="text-red-600 text-center mt-4 font-medium">
              {erro}
            </p>
          )}

          <p className="text-black/40 text-base mt-5 tracking-wide">
            Seu código é pessoal e exclusivo.
          </p>
        </form>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-yellow-500/40" />
          <span className="text-yellow-500 text-sm">
            ✦
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-yellow-500/40" />
        </div>

      </div>
    </section>
  );
}