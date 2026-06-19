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
      background: "linear-gradient(180deg, #fffdf8 0%, #ffffff 100%)",
      boxShadow: "0 5px 15px rgba(0,0,0,.05)",
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
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
         background:
          convidado.status === "confirmado"
          ? "#16a34a"
          : "#f3f4f6",

          color:
        convidado.status === "confirmado"
        ? "#fff"
        : "#222",
        }}
      >
        ✓ Vou Comparecer
      </button>

      <button
       onClick={() =>
        alterarStatus(convidado.id, "nao_vou")}
        style={{
          flex: 1,
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background:
          convidado.status === "nao_vou"
          ? "#dc2626"
          : "#f3f4f6",
          color:
          convidado.status === "nao_vou"
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