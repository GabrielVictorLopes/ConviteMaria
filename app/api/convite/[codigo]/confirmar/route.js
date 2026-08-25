import "server-only";
import { createClient } from "@supabase/supabase-js";

export async function POST(request, { params }) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Variáveis do Supabase não configuradas."
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

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { codigo } = await params;
    const body = await request.json();

    const respostas = body.respostas;

    if (!Array.isArray(respostas)) {
      return Response.json(
        { error: "Dados inválidos." },
        { status: 400 }
      );
    }

    const codigoFormatado = codigo
      .trim()
      .toUpperCase();

    const {
      data: familia,
      error: familiaError,
    } = await supabase
      .from("familias")
      .select("id")
      .eq("codigo", codigoFormatado)
      .single();

    if (familiaError || !familia) {
      return Response.json(
        {
          error: "Convite inválido.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      data: convidadosFamilia,
      error: convidadosError,
    } = await supabase
      .from("convidados")
      .select("id")
      .eq("familia_id", familia.id);

    if (convidadosError) {
      throw convidadosError;
    }

    const idsPermitidos = new Set(
      convidadosFamilia.map((c) => c.id)
    );

    for (const resposta of respostas) {
      if (!idsPermitidos.has(resposta.id)) {
        return Response.json(
          {
            error: "Convidado inválido.",
          },
          {
            status: 403,
          }
        );
      }

      const statusValido =
        resposta.status === "confirmado" ||
        resposta.status === "nao_vou" ||
        resposta.status === "pendente" ||
        resposta.status === null;

      if (!statusValido) {
        return Response.json(
          {
            error: "Status inválido.",
          },
          {
            status: 400,
          }
        );
      }
    }

    for (const resposta of respostas) {
      const statusFinal =
        resposta.status === "pendente"
          ? null
          : resposta.status;

      const { error } = await supabase
        .from("convidados")
        .update({
          status: statusFinal,
        })
        .eq("id", resposta.id)
        .eq("familia_id", familia.id);

      if (error) {
        throw error;
      }
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Erro ao salvar confirmação:",
      error
    );

    return Response.json(
      {
        error: "Erro interno.",
      },
      {
        status: 500,
      }
    );
  }
}