"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function Convite() {
  const params = useParams();

 const [familia, setFamilia] = useState(null);
const [convidados, setConvidados] = useState([]);
const [loading, setLoading] = useState(true);
const [sucesso, setSucesso] = useState(false);

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

  function alterarStatus(id, status) {
  setConvidados((anterior) =>
    anterior.map((c) =>
      c.id === id
        ? { ...c, status }
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
          status: convidado.status,
        })
          .eq("id", convidado.id);

        if (error) throw error;
      }

      setSucesso(true);
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
          borderRadius: "32px",
          padding: "50px",
          boxShadow: "0 20px 60px rgba(0,0,0,.08)",
          border: "1px solid rgba(212,175,55,.25)",
          fontecolor: "black",
        }}
      >
       <h1
  style={{
    textAlign: "center",
    fontSize: "30px",
    color: "#000000",
    marginBottom: "30px",
  }}
>
  Confirmação de Presença
</h1>
        <div style={{ marginTop: "20px" }}>
         {convidados.map((convidado) => (
  <div
    key={convidado.id}
    style={{
    border: "1px solid #f0f0f0",
    borderRadius: "22px",
    padding: "25px",
    marginBottom: "18px",
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
    transition: "all .3s ease",
}}
  >
    <div
  style={{
    fontSize: "26px",
    fontWeight: "600",
    letterSpacing: ".5px",
    color: "#222",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "1px solid rgba(212,175,55,.25)",
    paddingBottom: "15px",
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
       onClick={() =>
       alterarStatus(convidado.id, "confirmado")
        }
        style={{
           flex: 1,
          padding: "16px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
          transition: "all .3s ease",
          background: "#16a34a",
          color: "#fff",
          transform:
            convidado.status === "confirmado"
              ? "scale(1.08)"
              : "scale(1)",
          boxShadow:
            convidado.status === "confirmado"
              ? "0 0 20px rgba(22,163,74,.4)"
              : "none",
        }}
      >
        ✓ Vou Comparecer
      </button>

      <button
       onClick={() =>
        alterarStatus(convidado.id, "nao_vou")}
        style={{
          flex: 1,
          padding: "16px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
          transition: "all .3s ease",
          background: "#dc2626",
          color: "#fff",
          transform:
            convidado.status === "nao_vou"
              ? "scale(1.08)"
              : "scale(1)",
          boxShadow:
            convidado.status === "nao_vou"
              ? "0 0 20px rgba(220,38,38,.4)"
              : "none",
        }}
      >
        ✕ Não vou Comparecer
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
            background:
            "linear-gradient(135deg,#d4af37,#e7c45a)",
            boxShadow:
            "0 10px 25px rgba(212,175,55,.35)",
            letterSpacing: ".5px",
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
        {sucesso && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "90%",
        maxWidth: "500px",
        padding: "40px",
        borderRadius: "24px",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          fontSize: "70px",
          marginBottom: "20px",
        }}
      >
        ✨
      </div>

      <h2
        style={{
          color: "#d4af37",
          fontSize: "32px",
          marginBottom: "15px",
        }}
      >
        Resposta Registrada!
      </h2>

      <p
        style={{
          color: "#444",
          fontSize: "18px",
          lineHeight: "1.7",
          marginBottom: "25px",
        }}
      >
        Sua resposta foi salva com sucesso.
        <br />
        Obrigado por participar deste momento tão especial.
      </p>

      <button
        onClick={() => setSucesso(false)}
        style={{
          background: "#d4af37",
          color: "#000",
          border: "none",
          padding: "14px 30px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Fechar
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}