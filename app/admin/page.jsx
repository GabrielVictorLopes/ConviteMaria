"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [convidados, setConvidados] = useState([]);

  function entrar() {
    if (senha === "MariaClara2026") {
      setLiberado(true);
      buscar();
    }
  }

  async function buscar() {
    const { data } = await supabase
      .from("convidados")
      .select("*")
      .order("nome");

    setConvidados(data || []);
  }

  if (!liberado) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white p-8 rounded-3xl w-96">

          <h1 className="text-2xl mb-6">
            Área Administrativa
          </h1>

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            className="border p-3 w-full rounded-xl"
          />

          <button
            onClick={entrar}
            className="bg-pink-200 mt-4 w-full py-3 rounded-xl"
          >
            Entrar
          </button>

        </div>

      </div>
    );
  }

  const confirmados = convidados.filter(
    (c) => c.confirmado
  ).length;

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-8">
        Painel Administrativo
      </h1>

      <div className="mb-10 space-y-2">

        <p>
          Total convidados: {convidados.length}
        </p>

        <p>
          Confirmados: {confirmados}
        </p>

        <p>
          Pendentes: {convidados.length - confirmados}
        </p>

      </div>

      <div className="overflow-auto">

        <table className="w-full border">

          <thead>
            <tr className="bg-pink-100">
              <th className="p-3">Nome</th>
              <th className="p-3">Status</th>
              <th className="p-3">Data</th>
            </tr>
          </thead>

          <tbody>

            {convidados.map((c) => (
              <tr key={c.id} className="border-t">

                <td className="p-3">
                  {c.nome}
                </td>

                <td className="p-3">
                  {c.confirmado ? "✅" : "❌"}
                </td>

                <td className="p-3">
                  {c.confirmado_em
                    ? new Date(
                        c.confirmado_em
                      ).toLocaleString("pt-BR")
                    : "-"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}