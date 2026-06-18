"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function Convite() {
  const params = useParams();

  const [familia, setFamilia] = useState(null);
  const [convidados, setConvidados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.codigo) {
      carregar();
    }
  }, [params]);

  async function carregar() {
    const { data, error } = await supabase
      .from("familias")
      .select("*")
      .eq("codigo", params.codigo);

    if (error || !data || data.length === 0) {
      setLoading(false);
      return;
    }

    const familiaData = data[0];

    setFamilia(familiaData);

    const { data: convidadosData } = await supabase
      .from("convidados")
      .select("*")
      .eq("familia_id", familiaData.id);

    setConvidados(convidadosData || []);
    setLoading(false);
  }

  function toggleConfirmado(id) {
    setConvidados((anterior) =>
      anterior.map((c) =>
        c.id === id
          ? { ...c, confirmado: !c.confirmado }
          : c
      )
    );
  }

  async function salvarConfirmacao() {
    try {
      for (const convidado of convidados) {
        const { error } = await supabase
          .from("convidados")
          .update({
            confirmado: convidado.confirmado,
          })
          .eq("id", convidado.id);

        if (error) throw error;
      }

      alert("Presença confirmada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar confirmação.");
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontecolor: "black",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!familia) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontecolor: "black",
        }}
      >
        Código inválido
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
          fontecolor: "black",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            color: "#000000",
            marginBottom: "10px",

          }}
        >
          {familia.nome_familia}
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#000000",
            marginBottom: "30px",
          }}
        >
          Confirmação de Presença
        </p>

        <div style={{ marginTop: "20px" }}>
         {convidados.map((convidado) => (
  <div
    key={convidado.id}
    style={{
      border: "1px solid #d4af37",
      borderRadius: "18px",
      padding: "20px",
      marginBottom: "15px",
      background: "#fffdf8",
    }}
  >
    <div
      style={{
        fontSize: "22px",
        fontWeight: "600",
        color: "#222",
        marginBottom: "15px",
      }}
    >
      {convidado.nome}
    </div>

    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      <button
        type="button"
        onClick={() => toggleConfirmado(convidado.id, true)}
        style={{
          flex: 1,
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: convidado.confirmado
            ? "#16a34a"
            : "#f3f4f6",
          color: convidado.confirmado
            ? "#fff"
            : "#222",
        }}
      >
        ✓ Vou Comparecer
      </button>

      <button
        type="button"
        onClick={() => toggleConfirmado(convidado.id, false)}
        style={{
          flex: 1,
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: !convidado.confirmado
            ? "#dc2626"
            : "#f3f4f6",
          color: !convidado.confirmado
            ? "#fff"
            : "#222",
        }}
      >
        ✕ Não Comparecerei
      </button>
    </div>
  </div>
))}
  </div>
        <button
          onClick={salvarConfirmacao}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "16px",
            background: "#d4af37",
            color: "#000",
            border: "none",
            borderRadius: "14px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            fontecolor: "black",
          }}
        >
          Confirmar Presença
        </button>
      </div>
    </div>
  );
}