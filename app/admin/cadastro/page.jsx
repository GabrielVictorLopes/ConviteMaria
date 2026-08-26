"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CadastroFamilia() {
  const router = useRouter();

  const [familia, setFamilia] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomes, setNomes] = useState("");

  const [usuario, setUsuario] = useState(undefined);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(null);

  useEffect(() => {
    verificarUsuario();
  }, []);

  async function verificarUsuario() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setUsuario(null);
      router.push("/admin");
      return;
    }

    setUsuario(session.user);
  }

  async function salvar(e) {
    e.preventDefault();

    setErro("");
    setSucesso(null);

    const familiaFormatada = familia.trim();

    const convidadosFormatados = nomes
      .split("\n")
      .map((nome) => nome.trim())
      .filter(Boolean);

    if (!familiaFormatada) {
      setErro("Informe o nome da família.");
      return;
    }

    if (convidadosFormatados.length === 0) {
      setErro("Adicione pelo menos um convidado.");
      return;
    }

    try {
      setSalvando(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error(
          "Sua sessão expirou. Entre novamente no painel."
        );
      }

      const resposta = await fetch(
        "/api/admin/familias",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            nome_familia: familiaFormatada,
            nome_responsavel:
              responsavel.trim() || null,
            telefone_responsavel:
              telefone.trim() || null,
            convidados: convidadosFormatados,
          }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.error ||
            "Não foi possível cadastrar a família."
        );
      }

      setSucesso({
        codigo: dados.codigo,
        quantidade: dados.quantidade,
      });

      setFamilia("");
      setResponsavel("");
      setTelefone("");
      setNomes("");
    } catch (error) {
      console.error(error);

      setErro(
        error.message ||
          "Erro ao cadastrar família."
      );
    } finally {
      setSalvando(false);
    }
  }

  if (usuario === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-black">
          Verificando acesso...
        </p>
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fdf7f8] py-16 px-5">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10">
          <p className="text-[#7a1f3d]/60 uppercase tracking-[4px] text-sm mb-3">
            Administração
          </p>

          <h1 className="text-4xl md:text-5xl text-[#7a1f3d]">
            Nova Família
          </h1>

          <p className="text-black/60 mt-4">
            Cadastre uma nova família e seus
            convidados.
          </p>
        </div>

        <form
          onSubmit={salvar}
          className="
            bg-white
            p-6
            md:p-10
            rounded-[28px]
            shadow-[0_15px_50px_rgba(0,0,0,0.06)]
          "
        >
          <label className="block text-black mb-2">
            Nome da família
          </label>

          <input
            type="text"
            value={familia}
            placeholder="Ex.: Família Silva"
            onChange={(e) =>
              setFamilia(e.target.value)
            }
            className="
              border
              border-black/10
              p-4
              w-full
              mb-5
              rounded-xl
              text-black
              outline-none
              focus:border-[#7a1f3d]
            "
          />

          <label className="block text-black mb-2">
            Responsável
          </label>

          <input
            type="text"
            value={responsavel}
            placeholder="Nome do responsável"
            onChange={(e) =>
              setResponsavel(e.target.value)
            }
            className="
              border
              border-black/10
              p-4
              w-full
              mb-5
              rounded-xl
              text-black
              outline-none
              focus:border-[#7a1f3d]
            "
          />

          <label className="block text-black mb-2">
            Telefone
          </label>

          <input
            type="text"
            value={telefone}
            placeholder="Telefone do responsável"
            onChange={(e) =>
              setTelefone(e.target.value)
            }
            className="
              border
              border-black/10
              p-4
              w-full
              mb-5
              rounded-xl
              text-black
              outline-none
              focus:border-[#7a1f3d]
            "
          />

          <label className="block text-black mb-2">
            Convidados
          </label>

          <textarea
            rows={10}
            value={nomes}
            placeholder={`Um convidado por linha\n\nMaria\nJoão\nPedro`}
            onChange={(e) =>
              setNomes(e.target.value)
            }
            className="
              border
              border-black/10
              p-4
              w-full
              rounded-xl
              text-black
              outline-none
              resize-y
              focus:border-[#7a1f3d]
            "
          />

          <p className="text-black/40 text-sm mt-2">
            Digite um convidado por linha.
          </p>

          {erro && (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="mt-5 p-5 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-semibold">
                Família cadastrada com sucesso.
              </p>

              <p className="text-black mt-2">
                Código:
                <strong className="ml-2">
                  {sucesso.codigo}
                </strong>
              </p>

              <p className="text-black/60 mt-1">
                {sucesso.quantidade} convidado(s)
                cadastrado(s).
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={salvando}
            className="
              w-full
              bg-[#7a1f3d]
              text-white
              px-6
              py-4
              mt-7
              rounded-xl
              font-semibold
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {salvando
              ? "Salvando..."
              : "Salvar Família"}
          </button>
        </form>
      </div>
    </main>
  );
}