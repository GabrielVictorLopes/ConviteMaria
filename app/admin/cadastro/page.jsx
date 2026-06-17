"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CadastroFamilia() {
  const [familia, setFamilia] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomes, setNomes] = useState("");

  async function salvar() {

    const codigo =
      "FAM" + Math.floor(Math.random() * 100000);

    const { data: novaFamilia } = await supabase
      .from("familias")
      .insert({
        codigo,
        nome_familia: familia,
        nome_responsavel: responsavel,
        telefone_responsavel: telefone,
      })
      .select()
      .single();

    const convidados = nomes
      .split("\n")
      .filter(Boolean)
      .map((nome) => ({
        familia_id: novaFamilia.id,
        nome,
      }));

    await supabase
      .from("convidados")
      .insert(convidados);

    alert(
      `Família criada!\n\nCódigo: ${codigo}`
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl mb-8">
        Nova Família
      </h1>

      <input
        placeholder="Nome da família"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setFamilia(e.target.value)
        }
      />

      <input
        placeholder="Responsável"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setResponsavel(e.target.value)
        }
      />

      <input
        placeholder="Telefone"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setTelefone(e.target.value)
        }
      />

      <textarea
        rows={10}
        placeholder="Um convidado por linha"
        className="border p-3 w-full"
        onChange={(e) =>
          setNomes(e.target.value)
        }
      />

      <button
        onClick={salvar}
        className="bg-pink-200 px-6 py-3 mt-6 rounded-full"
      >
        Salvar Família
      </button>

    </div>
  );
}