import "server-only";
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  let familiaCriadaId = null;

  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const adminUserId =
      process.env.ADMIN_USER_ID;

    if (
      !supabaseUrl ||
      !anonKey ||
      !serviceRoleKey ||
      !adminUserId
    ) {
      console.error(
        "Variáveis de ambiente incompletas."
      );

      return Response.json(
        {
          error:
            "Configuração do servidor incompleta.",
        },
        {
          status: 500,
        }
      );
    }

    // =====================================================
    // 1. PEGA TOKEN DO ADMIN
    // =====================================================
    const authorization =
      request.headers.get("authorization");

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return Response.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      authorization.replace("Bearer ", "");

    // =====================================================
    // 2. VALIDA TOKEN COM SUPABASE AUTH
    // =====================================================
    const supabaseAuth = createClient(
      supabaseUrl,
      anonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return Response.json(
        {
          error:
            "Sessão inválida ou expirada.",
        },
        {
          status: 401,
        }
      );
    }

    // =====================================================
    // 3. CONFIRMA SE É O ADMIN AUTORIZADO
    // =====================================================
    if (user.id !== adminUserId) {
      return Response.json(
        {
          error:
            "Você não possui permissão administrativa.",
        },
        {
          status: 403,
        }
      );
    }

    // =====================================================
    // 4. CLIENT ADMIN SERVER-SIDE
    // =====================================================
    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    // =====================================================
    // 5. LÊ E VALIDA OS DADOS
    // =====================================================
    const body = await request.json();

    const nomeFamilia =
      body.nome_familia?.trim();

    const nomeResponsavel =
      body.nome_responsavel?.trim() ||
      null;

    const telefoneResponsavel =
      body.telefone_responsavel?.trim() ||
      null;

    const convidados = Array.isArray(
      body.convidados
    )
      ? body.convidados
          .map((nome) =>
            String(nome).trim()
          )
          .filter(Boolean)
      : [];

    if (!nomeFamilia) {
      return Response.json(
        {
          error:
            "Informe o nome da família.",
        },
        {
          status: 400,
        }
      );
    }

    if (convidados.length === 0) {
      return Response.json(
        {
          error:
            "Adicione pelo menos um convidado.",
        },
        {
          status: 400,
        }
      );
    }

    if (convidados.length > 50) {
      return Response.json(
        {
          error:
            "Quantidade de convidados inválida.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // 6. GERA CÓDIGO ALEATÓRIO
    // =====================================================
    let codigo = null;

    for (
      let tentativa = 0;
      tentativa < 5;
      tentativa++
    ) {
      const aleatorio = crypto
        .randomUUID()
        .replaceAll("-", "")
        .slice(0, 6)
        .toUpperCase();

      const codigoTentativa =
        `FAM-${aleatorio}`;

      const { data } =
        await supabaseAdmin
          .from("familias")
          .select("id")
          .eq("codigo", codigoTentativa)
          .maybeSingle();

      if (!data) {
        codigo = codigoTentativa;
        break;
      }
    }

    if (!codigo) {
      throw new Error(
        "Não foi possível gerar código único."
      );
    }

    // =====================================================
    // 7. CRIA FAMÍLIA
    // =====================================================
    const {
      data: novaFamilia,
      error: familiaError,
    } = await supabaseAdmin
      .from("familias")
      .insert({
        codigo,
        nome_familia: nomeFamilia,
        nome_responsavel:
          nomeResponsavel,
        telefone_responsavel:
          telefoneResponsavel,
      })
      .select("id")
      .single();

    if (familiaError) {
      throw familiaError;
    }

    familiaCriadaId =
      novaFamilia.id;

    // =====================================================
    // 8. CRIA CONVIDADOS
    // =====================================================
    const convidadosParaInserir =
      convidados.map((nome) => ({
        familia_id:
          novaFamilia.id,
        nome,
        status: null,
      }));

    const { error: convidadosError } =
      await supabaseAdmin
        .from("convidados")
        .insert(
          convidadosParaInserir
        );

    if (convidadosError) {
      // Evita deixar família sem convidados
      await supabaseAdmin
        .from("familias")
        .delete()
        .eq("id", novaFamilia.id);

      familiaCriadaId = null;

      throw convidadosError;
    }

    // =====================================================
    // 9. SUCESSO
    // =====================================================
    return Response.json(
      {
        success: true,
        codigo,
        quantidade:
          convidados.length,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Erro ao cadastrar família:",
      error
    );

    return Response.json(
      {
        error:
          "Não foi possível cadastrar a família.",
      },
      {
        status: 500,
      }
    );
  }
}