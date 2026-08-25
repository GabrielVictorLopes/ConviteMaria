"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  // =========================================================
  // DADOS
  // =========================================================
  const [convidados, setConvidados] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [usuario, setUsuario] = useState(undefined);
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [entrando, setEntrando] = useState(false);

  // =========================================================
  // AO ABRIR O ADMIN
  // =========================================================
  useEffect(() => {
  let ativo = true;

  const timeout = setTimeout(() => {
    if (ativo) {
      setUsuario((atual) =>
        atual === undefined ? null : atual
      );
    }
  }, 1500);

  supabase.auth
    .getSession()
    .then(({ data, error }) => {
      if (!ativo) return;

      if (error) {
        console.error(
          "Erro ao recuperar sessão:",
          error
        );

        setUsuario(null);
        return;
      }

      const user =
        data?.session?.user ?? null;

      setUsuario(user);

      if (user) {
        carregar();
      }
    })
    .catch((error) => {
      console.error(
        "Erro na autenticação:",
        error
      );

      if (ativo) {
        setUsuario(null);
      }
    });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (!ativo) return;

      setUsuario(
        session?.user ?? null
      );
    }
  );

  return () => {
    ativo = false;
    clearTimeout(timeout);
    subscription.unsubscribe();
  };
}, []);

  // =========================================================
  // LOGIN ADMIN
  // =========================================================
  async function entrar(e) {
    e.preventDefault();

    if (entrando) return;

    try {
      setEntrando(true);
      setErroLogin("");

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });

      if (error) {
        throw error;
      }

      setUsuario(data.user);

      // Mostra o dashboard primeiro.
      // Os convidados entram logo depois.
      carregar();
    } catch (error) {
      console.error("Erro no login:", error);

      setErroLogin(
        "E-mail ou senha incorretos."
      );
    } finally {
      setEntrando(false);
    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================
  async function sair() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setUsuario(null);
      setConvidados([]);
      setEmail("");
      setSenha("");
    }
  }

  // =========================================================
  // CARREGA OS CONVIDADOS
  // =========================================================
  async function carregar() {
    // Evita disparar a mesma consulta várias vezes.
    if (carregandoDados) return;

    try {
      setCarregandoDados(true);

      const { data, error } = await supabase
        .from("convidados")
        .select(`
          id,
          nome,
          status,
          familias (
            codigo,
            nome_familia
          )
        `)
        .order("nome");

      if (error) {
        throw error;
      }

      setConvidados(data || []);
    } catch (error) {
      console.error(
        "Erro ao carregar convidados:",
        error
      );
    } finally {
      setCarregandoDados(false);
    }
  }

  // =========================================================
  // EXPORTAR EXCEL
  // XLSX SÓ É BAIXADO QUANDO CLICAR
  // =========================================================
  async function exportarExcel() {
    try {
      const XLSX = await import("xlsx");

      const dados = convidados.map((c) => ({
        Nome: c.nome,
        Familia:
          c.familias?.nome_familia || "",
        Codigo:
          c.familias?.codigo || "",

        Status:
          c.status === "confirmado"
            ? "Confirmado"
            : c.status === "nao_vou"
            ? "Não vai"
            : "Pendente",
      }));

      const planilha =
        XLSX.utils.json_to_sheet(dados);

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        planilha,
        "Convidados"
      );

      XLSX.writeFile(
        workbook,
        "lista-convidados.xlsx"
      );
    } catch (error) {
      console.error(
        "Erro ao exportar Excel:",
        error
      );

      alert(
        "Não foi possível gerar o arquivo."
      );
    }
  }

  // =========================================================
  // MÉTRICAS
  // =========================================================
  const confirmados = convidados.filter(
    (c) => c.status === "confirmado"
  ).length;

  const recusados = convidados.filter(
    (c) => c.status === "nao_vou"
  ).length;

  const pendentes = convidados.filter(
    (c) =>
      !c.status ||
      c.status === "pendente"
  ).length;

  // =========================================================
  // FILTRO + BUSCA
  // =========================================================
  const termoBusca = busca
    .trim()
    .toLowerCase();

  const convidadosFiltrados =
    convidados.filter((c) => {
      const nome =
        c.nome?.toLowerCase() || "";

      const familia =
        c.familias?.nome_familia
          ?.toLowerCase() || "";

      const codigo =
        c.familias?.codigo
          ?.toLowerCase() || "";

      const passouBusca =
        !termoBusca ||
        nome.includes(termoBusca) ||
        familia.includes(termoBusca) ||
        codigo.includes(termoBusca);

      if (!passouBusca) {
        return false;
      }

      if (filtro === "confirmados") {
        return (
          c.status === "confirmado"
        );
      }

      if (filtro === "recusados") {
        return c.status === "nao_vou";
      }

      if (filtro === "pendentes") {
        return (
          !c.status ||
          c.status === "pendente"
        );
      }

      return true;
    });

  // =========================================================
  // LOADING INICIAL
  // =========================================================
  if (usuario === undefined) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fdf7f8",
        color: "#222",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            border:
              "3px solid rgba(122,31,61,.15)",
            borderTopColor: "#7a1f3d",
            borderRadius: "50%",
            margin: "0 auto 15px",
            animation:
              "adminSpin .8s linear infinite",
          }}
        />

        <p>Verificando acesso...</p>

        <style jsx>{`
          @keyframes adminSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
  // =========================================================
  // LOGIN
  // =========================================================
  if (!usuario) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fdf7f8",
          padding: "20px",
        }}
      >
        <form
          onSubmit={entrar}
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "#fff",
            padding: "40px",
            borderRadius: "24px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#7a1f3d",
              textAlign: "center",
              fontSize: "30px",
              marginBottom: "30px",
            }}
          >
            Área Administrativa
          </h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
            required
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid #ccc",
              marginBottom: "15px",
              color: "#222",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border:
                "1px solid #ccc",
              marginBottom: "15px",
              color: "#222",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {erroLogin && (
            <p
              style={{
                color: "#dc2626",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {erroLogin}
            </p>
          )}

          <button
            type="submit"
            disabled={entrando}
            style={{
              width: "100%",
              background: "#7a1f3d",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              cursor: entrando
                ? "not-allowed"
                : "pointer",
              fontWeight: "bold",
              opacity: entrando
                ? 0.65
                : 1,
            }}
          >
            {entrando
              ? "Entrando..."
              : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf7f8",
        padding: "40px",
        color: "#222",
      }}
    >
      {/* CABEÇALHO */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#7a1f3d",
              fontSize: "40px",
              margin: 0,
            }}
          >
            Dashboard RSVP
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "5px",
            }}
          >
            Controle de convidados
          </p>
        </div>

        <button
          onClick={sair}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </div>

      {/* CARREGANDO DADOS */}
      {carregandoDados && (
        <div
          style={{
            background: "#fff",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "20px",
            color: "#777",
            boxShadow:
              "0 5px 15px rgba(0,0,0,.04)",
          }}
        >
          Carregando convidados...
        </div>
      )}

      {/* AÇÕES */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={exportarExcel}
          disabled={
            convidados.length === 0
          }
          style={{
            background: "#7a1f3d",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor:
              convidados.length === 0
                ? "not-allowed"
                : "pointer",
            opacity:
              convidados.length === 0
                ? 0.5
                : 1,
          }}
        >
          Exportar Excel
        </button>

        <button
          onClick={carregar}
          disabled={carregandoDados}
          style={{
            background: "#fff",
            color: "#7a1f3d",
            border:
              "1px solid #7a1f3d",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: carregandoDados
              ? "not-allowed"
              : "pointer",
          }}
        >
          {carregandoDados
            ? "Atualizando..."
            : "Atualizar dados"}
        </button>
      </div>

      {/* MÉTRICAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          titulo="Total"
          valor={convidados.length}
        />

        <Card
          titulo="Confirmados"
          valor={confirmados}
        />

        <Card
          titulo="Pendentes"
          valor={pendentes}
        />

        <Card
          titulo="Não vão"
          valor={recusados}
        />
      </div>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <BotaoFiltro
          ativo={filtro === "todos"}
          onClick={() =>
            setFiltro("todos")
          }
        >
          Todos
        </BotaoFiltro>

        <BotaoFiltro
          ativo={
            filtro ===
            "confirmados"
          }
          onClick={() =>
            setFiltro(
              "confirmados"
            )
          }
        >
          Confirmados
        </BotaoFiltro>

        <BotaoFiltro
          ativo={
            filtro ===
            "pendentes"
          }
          onClick={() =>
            setFiltro("pendentes")
          }
        >
          Pendentes
        </BotaoFiltro>

        <BotaoFiltro
          ativo={
            filtro ===
            "recusados"
          }
          onClick={() =>
            setFiltro("recusados")
          }
        >
          Não vão
        </BotaoFiltro>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Pesquisar convidado, família ou código..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border:
            "1px solid #ddd",
          marginBottom: "25px",
          color: "#222",
          background: "#fff",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {/* SEM RESULTADOS */}
      {!carregandoDados &&
        convidadosFiltrados.length ===
          0 && (
          <div
            style={{
              background: "#fff",
              padding: "30px",
              textAlign: "center",
              borderRadius: "15px",
              color: "#777",
            }}
          >
            Nenhum convidado encontrado.
          </div>
        )}

      {/* LISTA */}
      {convidadosFiltrados.map(
        (c) => (
          <div
            key={c.id}
            style={{
              background: "#fff",
              padding: "18px",
              marginBottom: "10px",
              borderRadius: "12px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "20px",
              boxShadow:
                "0 3px 12px rgba(0,0,0,.04)",
            }}
          >
            <div>
              <strong>
                {c.nome}
              </strong>

              <div
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginTop: "4px",
                }}
              >
                {c.familias
                  ?.codigo ||
                  "Sem código"}{" "}
                -{" "}
                {c.familias
                  ?.nome_familia ||
                  "Sem família"}
              </div>
            </div>

            <span
              style={{
                fontWeight: "bold",
                whiteSpace:
                  "nowrap",
                color:
                  c.status ===
                  "confirmado"
                    ? "#16a34a"
                    : c.status ===
                      "nao_vou"
                    ? "#dc2626"
                    : "#d4af37",
              }}
            >
              {c.status ===
              "confirmado"
                ? "CONFIRMADO"
                : c.status ===
                  "nao_vou"
                ? "NÃO VAI"
                : "PENDENTE"}
            </span>
          </div>
        )
      )}
    </div>
  );
}

// =========================================================
// CARD MÉTRICA
// =========================================================
function Card({
  titulo,
  valor,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow:
          "0 5px 15px rgba(0,0,0,.06)",
      }}
    >
      <h3
        style={{
          color: "#666",
          margin: 0,
        }}
      >
        {titulo}
      </h3>

      <h2
        style={{
          marginTop: "7px",
          marginBottom: 0,
          fontSize: "30px",
          color: "#222",
        }}
      >
        {valor}
      </h2>
    </div>
  );
}

// =========================================================
// BOTÃO FILTRO
// =========================================================
function BotaoFiltro({
  children,
  ativo,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: ativo
          ? "#7a1f3d"
          : "#fff",
        color: ativo
          ? "#fff"
          : "#7a1f3d",
        border:
          "1px solid #7a1f3d",
        padding: "10px 16px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: ativo
          ? "bold"
          : "normal",
      }}
    >
      {children}
    </button>
  );
}