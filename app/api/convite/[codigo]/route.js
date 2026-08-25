import "server-only";
import { createClient } from "@supabase/supabase-js";

export async function GET(request, { params }) {
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

    const codigoFormatado = codigo
      .trim()
      .toUpperCase();

    const { data, error } = await supabase
      .from("familias")
      .select(`
        id,
        codigo,
        nome_familia,
        convidados (
          id,
          nome,
          status
        )
      `)
      .eq("codigo", codigoFormatado)
      .single();

    if (error || !data) {
      console.error(
        "Erro ao buscar convite:",
        error
      );

      return Response.json(
        {
          error: "Convite não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      familia: {
        id: data.id,
        codigo: data.codigo,
        nome_familia: data.nome_familia,
      },

      convidados: (
        data.convidados || []
      ).sort((a, b) =>
        a.nome.localeCompare(b.nome)
      ),
    });
  } catch (error) {
    console.error(
      "Erro na API do convite:",
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