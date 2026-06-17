"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Convite({ params }) {
  const [familia, setFamilia] = useState(null);
  const [convidados, setConvidados] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data: familiaData } = await supabase
      .from("familias")
      .select("*")
      .eq("codigo", params.codigo)
      .single();

    if (!familiaData) return;

    setFamilia(familiaData);

    const { data: convidadosData } = await supabase
      .from("convidados")
      .select("*")
      .eq("familia_id", familiaData.id)
      .order("nome");

    setConvidados(convidadosData || []);
  }

  async function confirmar() {
    setSalvando(true);

    for (const convidado of convidados) {
      await supabase
        .from("convidados")
        .update({
          confirmado: convidado.confirmado,
          confirmado_em: convidado.confirmado
            ? new Date().toISOString()
            : null,
        })
        .eq("id", convidado.id);
    }

    setSalvando(false);
    setSucesso(true);
  }

  if (!familia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando convite...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-semibold text-center mb-2">
          Família {familia.nome_familia}
        </h1>

        <p className="text-center mb-8 text-gray-600">
          Confirme quem irá participar da festa.
        </p>

        <div className="space-y-4">

          {convidados.map((convidado) => (
            <label
              key={convidado.id}
              className="flex items-center gap-4 text-lg"
            >
              <input
                type="checkbox"
                checked={convidado.confirmado}
                onChange={(e) => {
                  setConvidados((old) =>
                    old.map((item) =>
                      item.id === convidado.id
                        ? {
                            ...item,
                            confirmado: e.target.checked,
                          }
                        : item
                    )
                  );
                }}
              />

              {convidado.nome}
            </label>
          ))}

        </div>

        <button
          onClick={confirmar}
          disabled={salvando}
          className="
            mt-8
            w-full
            bg-pink-200
            hover:bg-pink-300
            transition
            py-4
            rounded-full
            font-semibold
          "
        >
          {salvando
            ? "Salvando..."
            : "Confirmar Presença"}
        </button>

        {sucesso && (
          <p className="text-green-600 text-center mt-4">
            Presença registrada com sucesso ❤️
          </p>
        )}

      </div>

    </div>
  );
}