"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

import {
  FaCheck,
  FaXmark,
  FaCrown,
} from "react-icons/fa6";

export default function Convite() {
  const params = useParams();

  const [familia, setFamilia] = useState(null);
  const [convidados, setConvidados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (params?.codigo) {
      carregar();
    }
  }, [params]);

  async function carregar() {
    setLoading(true);

    const { data, error } = await supabase
      .from("familias")
      .select("*")
      .eq("codigo", params.codigo)
      .limit(1);

    if (error || !data || data.length === 0) {
      setFamilia(null);
      setLoading(false);
      return;
    }

    const familiaData = data[0];

    setFamilia(familiaData);

    const { data: convidadosData, error: convidadosError } =
      await supabase
        .from("convidados")
        .select("*")
        .eq("familia_id", familiaData.id)
        .order("nome");

    if (convidadosError) {
      console.error(convidadosError);
    }

    setConvidados(convidadosData || []);
    setLoading(false);
  }

  function alterarStatus(id, status) {
    setConvidados((anterior) =>
      anterior.map((convidado) =>
        convidado.id === id
          ? { ...convidado, status }
          : convidado
      )
    );
  }

  async function salvarConfirmacao() {
    try {
      setSalvando(true);

      for (const convidado of convidados) {
        const { error } = await supabase
          .from("convidados")
          .update({
            status: convidado.status,
          })
          .eq("id", convidado.id);

        if (error) throw error;
      }

      setSucesso(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar confirmação.");
    } finally {
      setSalvando(false);
    }
  }

  const confirmados = convidados.filter(
    (convidado) => convidado.status === "confirmado"
  ).length;

  const respondidos = convidados.filter(
    (convidado) =>
      convidado.status === "confirmado" ||
      convidado.status === "nao_vou"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-5" />

          <p className="text-black/60 text-lg">
            Carregando convite...
          </p>
        </div>
      </main>
    );
  }

  if (!familia) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <FaXmark className="text-yellow-500 text-5xl mx-auto mb-6" />

          <h1 className="text-4xl text-yellow-500 mb-4">
            Convite não encontrado
          </h1>

          <p className="text-black/60 text-lg">
            Verifique se o código informado está correto.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4 md:px-6">

      <div className="max-w-3xl mx-auto">

        {/* CABEÇALHO */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[7px] text-yellow-600 text-sm mb-4">
            Confirmação de presença
          </p>

          <FaCrown className="text-yellow-500 text-4xl mx-auto mb-5" />

          <h1 className="text-5xl md:text-7xl text-yellow-500 font-light">
            {familia.nome_familia}
          </h1>

          <div className="w-20 h-px bg-yellow-500/40 mx-auto my-6" />

          <p className="text-black/60 text-lg md:text-xl leading-8 max-w-xl mx-auto">
            Ficaremos muito felizes em compartilhar essa noite
            tão especial com vocês.
          </p>
        </div>

        {/* RESUMO */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-10">

          <div className="bg-white border border-yellow-500/20 rounded-2xl py-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl text-yellow-500 font-light">
              {convidados.length}
            </p>

            <p className="text-black/50 text-xs md:text-sm uppercase tracking-wide mt-1">
              Convidados
            </p>
          </div>

          <div className="bg-white border border-yellow-500/20 rounded-2xl py-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl text-green-600 font-light">
              {confirmados}
            </p>

            <p className="text-black/50 text-xs md:text-sm uppercase tracking-wide mt-1">
              Confirmados
            </p>
          </div>

          <div className="bg-white border border-yellow-500/20 rounded-2xl py-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl text-yellow-500 font-light">
              {respondidos}
            </p>

            <p className="text-black/50 text-xs md:text-sm uppercase tracking-wide mt-1">
              Respondidos
            </p>
          </div>

        </div>

        {/* CONVIDADOS */}
        <div className="space-y-5">

          {convidados.map((convidado) => (
            <div
              key={convidado.id}
              className="
                bg-white
                border
                border-yellow-500/20
                rounded-[28px]
                p-5
                md:p-7
                shadow-[0_10px_35px_rgba(0,0,0,0.05)]
              "
            >
              <h2 className="text-2xl md:text-3xl text-black text-center font-medium">
                {convidado.nome}
              </h2>

              <div className="w-12 h-px bg-yellow-500/30 mx-auto my-5" />

              <p className="text-black/50 text-center mb-5">
                Você poderá comparecer?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* VOU */}
                <button
                  onClick={() =>
                    alterarStatus(
                      convidado.id,
                      "confirmado"
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-3
                    py-4
                    px-4
                    rounded-2xl
                    border
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      convidado.status === "confirmado"
                        ? "bg-green-600 border-green-600 text-white shadow-lg scale-[1.02]"
                        : "bg-white border-green-600/30 text-green-700 hover:bg-green-50"
                    }
                  `}
                >
                  <FaCheck />

                  Vou comparecer
                </button>

                {/* NÃO VOU */}
                <button
                  onClick={() =>
                    alterarStatus(
                      convidado.id,
                      "nao_vou"
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-3
                    py-4
                    px-4
                    rounded-2xl
                    border
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      convidado.status === "nao_vou"
                        ? "bg-red-600 border-red-600 text-white shadow-lg scale-[1.02]"
                        : "bg-white border-red-600/30 text-red-700 hover:bg-red-50"
                    }
                  `}
                >
                  <FaXmark />

                  Não vou comparecer
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* SALVAR */}
        <button
          onClick={salvarConfirmacao}
          disabled={salvando}
          className="
            w-full
            mt-10
            py-5
            rounded-2xl
            bg-yellow-500
            text-black
            text-lg
            md:text-xl
            font-semibold
            shadow-[0_12px_30px_rgba(212,175,55,0.25)]
            hover:bg-yellow-400
            hover:scale-[1.01]
            transition-all
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {salvando
            ? "Salvando..."
            : "Salvar confirmação"}
        </button>

        <p className="text-center text-black/40 mt-5 text-sm">
          Você poderá acessar este convite novamente para
          alterar sua resposta.
        </p>

      </div>

      {/* MODAL DE SUCESSO */}
      {sucesso && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-5">

          <div
            className="
              bg-white
              w-full
              max-w-lg
              rounded-[32px]
              p-8
              md:p-12
              text-center
              shadow-2xl
              border
              border-yellow-500/20
            "
          >
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-yellow-500 text-4xl" />
            </div>

            <p className="uppercase tracking-[5px] text-yellow-600 text-xs mb-4">
              Confirmação
            </p>

            <h2 className="text-4xl md:text-5xl text-yellow-500 mb-5">
              Resposta registrada
            </h2>

            <p className="text-black/60 text-lg leading-8">
              Sua resposta foi salva com sucesso.
              Maria Clara ficará muito feliz em compartilhar
              essa noite tão especial com vocês.
            </p>

            <div className="w-16 h-px bg-yellow-500/30 mx-auto my-7" />

            <button
              onClick={() => setSucesso(false)}
              className="
                bg-yellow-500
                text-black
                px-10
                py-4
                rounded-full
                font-semibold
                hover:bg-yellow-400
                hover:scale-105
                transition-all
              "
            >
              Fechar
            </button>
          </div>

        </div>
      )}

    </main>
  );
}