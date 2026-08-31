"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RSVP() {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  function acessarConvite(e) {
    e.preventDefault();

    const codigoFormatado = codigo.trim().toUpperCase();

    if (!codigoFormatado) {
      setErro("Digite seu código.");
      return;
    }

    setErro("");

    router.push(`/convite/${codigoFormatado}`);
  }

  return (
    <section
      id="confirmacao"
      className="relative py-28 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Detalhe superior */}
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
    max-w-xl
    mx-auto
  "
>
  <div
    className="
      flex
      flex-col
      md:flex-row
      items-stretch
      gap-3
    "
  >
    <input
      type="text"
      placeholder="Digite seu código"
      value={codigo}
      onChange={(e) => {
        setCodigo(e.target.value.toUpperCase());
        setErro("");
      }}
      className="
        flex-1
        px-6
        py-4
        bg-white
        border
        border-yellow-500/30
        rounded-full
        text-black
        text-center
        md:text-left
        text-lg
        tracking-[2px]
        uppercase
        font-sans
        outline-none
        transition-all
        duration-300
        focus:border-yellow-500
        focus:shadow-[0_0_0_3px_rgba(234,179,8,0.08)]
        placeholder:text-black/30
        placeholder:normal-case
        placeholder:tracking-normal
      "
    />

    <button
      type="submit"
      className="
        px-8
        py-4
        bg-yellow-500
        text-black
        rounded-full
        font-semibold
        transition-all
        duration-300
        hover:bg-yellow-400
        hover:scale-[1.02]
        md:min-w-[180px]
      "
    >
      Entrar no Baile
    </button>
  </div>

  {erro && (
    <p className="text-red-600 text-center mt-4 font-medium">
      {erro}
    </p>
  )}

  <p className="text-black/40 text-sm mt-4 tracking-wide">
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