"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import * as XLSX from "xlsx";

export default function Admin() {
  const [convidados, setConvidados] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [senha, setSenha] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .from("convidados")
      .select(`
        *,
        familias (
          codigo,
          nome_familia
        )
      `)
      .order("nome");

    setConvidados(data || []);
  }

  function exportarExcel() {
    const dados = convidados.map((c) => ({
      Nome: c.nome,
      Familia: c.familias?.nome_familia,
      Codigo: c.familias?.codigo,
      Status: c.confirmado ? "Confirmado" : "Pendente",
    }));

    const planilha = XLSX.utils.json_to_sheet(dados);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      planilha,
      "Convidados"
    );

    XLSX.writeFile(
      workbook,
      "lista-convidados.xlsx"
    );
  }

const confirmados = convidados.filter(c => c.confirmado === true).length;
const pendentes = convidados.filter(c => c.confirmado !== true).length;

  const convidadosFiltrados = convidados.filter((c) => {
  const passouBusca = c.nome?.toLowerCase().includes(busca.toLowerCase());
  if (!passouBusca) return false;

  if (filtro === "confirmados") return c.confirmado === true;
  if (filtro === "pendentes") return c.confirmado !== true;

  return true;
});

  if (!autorizado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          background: "#fdf7f8",
        }}
      >
        <h2 style={{ color: "#7a1f3d" }}>
          Área Administrativa
        </h2>

        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />

        <button
          onClick={() => {
            if (senha === "mariaclara15") {
              setAutorizado(true);
            } else {
              alert("Senha incorreta");
            }
          }}
          style={{
            background: "#7a1f3d",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf7f8",
        padding: "40px",
        color: "#222",
      }}
    >
      <h1
        style={{
          color: "#7a1f3d",
          fontSize: "40px",
          marginBottom: "20px",
        }}
      >
        Dashboard RSVP
      </h1>

      <button
        onClick={exportarExcel}
        style={{
          background: "#7a1f3d",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        📊 Exportar Excel
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            minWidth: "180px",
          }}
        >
          <h3>Total</h3>
          <h2>{convidados.length}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            minWidth: "180px",
          }}
        >
          <h3>Confirmados</h3>
          <h2>{confirmados}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "15px",
            minWidth: "180px",
          }}
        >
          <h3>Pendentes</h3>
          <h2>{pendentes}</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => setFiltro("todos")}>
          Todos
        </button>

        <button onClick={() => setFiltro("confirmados")}>
          Confirmados
        </button>

        <button onClick={() => setFiltro("pendentes")}>
          Pendentes
        </button>
      </div>

      <input
        type="text"
        placeholder="Pesquisar convidado..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          marginBottom: "25px",
        }}
      />

      {convidadosFiltrados.map((c) => (
        <div
          key={c.id}
          style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{c.nome}</strong>

            <div
              style={{
                fontSize: "14px",
                color: "#666",
                marginTop: "4px",
              }}
            >
              {c.familias?.codigo} - {c.familias?.nome_familia}
            </div>
          </div>

          <span
            style={{
              fontWeight: "bold",
              color: c.confirmado ? "green" : "red",
            }}
          >
            {c.confirmado
              ? "✅ CONFIRMADO"
              : "❌ PENDENTE"}
          </span>
        </div>
      ))}
    </div>
  );
}