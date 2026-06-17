"use client";

import { FaMaskFace, FaUserTie, FaPersonDress } from "react-icons/fa6";

export default function DressCode() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
        <div className="text-5xl mb-4">
            🎭
        </div>
          <h2 className="text-6xl md:text-6xl text-yellow-400 mb-4">
            Baile de Máscaras
          </h2>

          <p className="text-black max-w-2xl mx-auto text-xl">
            Para tornar esta noite ainda mais especial,
            contamos com a elegância e o encanto de todos os convidados.
          </p>
        </div>
        <div className="flex justify-center mb-10">
        <div className="w-40 h-px bg-[#c9a86a]" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">

          {/* Masculino */}
          <div className="
            relative
            overflow-hidden
            bg-white/[0.03]
            from-[#180507]  
            to-[#0b0b0b]
            border
            border-[#c9a86a]/40
            rounded-[32px]
            p-8
            shadow-[0_0_40px_rgba(201,168,106,0.08)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]">
                
            <div className="flex items-center gap-4 mb-6">
              <FaUserTie className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Masculino
              </h3>
            </div>

            <ul className="space-y-4 text-black text-lg">
             <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Blazer</span>
             </li>
              <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Terno</span>
              </li>
              <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Camisa Social</span>
              </li>
              <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Calça Social</span>
              </li>
              <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Sapato Social</span>
              </li>
            </ul>
          </div>

          {/* Feminino */}
           <div className="
            relative
            overflow-hidden
            bg-white/[0.03]
            from-[#180507]  
            to-[#0b0b0b]
            border
            border-[#c9a86a]/40
            rounded-[32px]
            p-8
            shadow-[0_0_40px_rgba(201,168,106,0.08)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]">
                    
            <div className="flex items-center gap-4 mb-6">
              <FaPersonDress className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Feminino
              </h3>
            </div>

            <ul className="space-y-4 text-black text-lg">
              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Vestidos Longos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Traje Esporte Fino</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Elegância e Sofisticação</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regras */}
        <div className="mt-12 border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(201,168,106,0.12)]">

          <div className="flex items-center justify-center gap-3 mb-6">

            <h3 className="text-6xl text-yellow-400">
              Regras do Baile   
            </h3>
          </div>

          <div className=" grid md:grid-cols-3 gap-6 text-center">

            <div>
              <h4 className="text-4xl text-yellow-400 mb-2">
                Máscara
              </h4>

              <p className="text-black text-lg">
                Obrigatório levar sua máscara de baile.
              </p>
            </div>

            <div>
              <h4 className="text-4xl text-yellow-400 mb-2">
                Cor Rosa
              </h4>

              <p className="text-black text-lg">
                Não utilizar vestidos rosa.
              </p>
            </div>

            <div>
              <h4 className="text-4xl text-yellow-400 mb-2">
                Tons Rosa
              </h4>

              <p className="text-black text-lg">
                Evitar peças e acessórios em tons rosa.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}