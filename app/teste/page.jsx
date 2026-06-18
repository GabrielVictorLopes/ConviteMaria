"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Teste() {
  const [familias, setFamilias] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("familias")
        .select("*");

      console.log(data);
      console.log(error);

      if (data) {
        setFamilias(data);
      }
    }

    carregar();
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        background: "white",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <h1>Famílias cadastradas</h1>

      {familias.map((familia) => (
        <div key={familia.id}>
          {familia.codigo} - {familia.nome_familia}
        </div>
      ))}
    </div>
  );
}