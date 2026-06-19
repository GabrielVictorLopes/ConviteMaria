"use client";

import { FaMaskFace, FaUserTie, FaPersonDress } from "react-icons/fa6";

export default function DressCode() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
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
            bg-[#FAF9F6]
            border
            border-[#c9a86a]/40
            rounded-[32px]
            p-8
            shadow-[0_0_40px_rgba(201,168,106,0.08)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]
          ">
                
            <div className="flex items-center gap-4 mb-6">
              <FaUserTie className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Masculino
              </h3>
            </div>

            <ul className="space-y-4 text-black text-lg">
          <li className="flex items-center gap-3">
            <span className="text-[#c9a86a] text-xl">✦</span>
            <span>Traje Social ou Esporte Fino</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-[#c9a86a] text-xl">✦</span>
            <span>Blazer, terno ou combinação elegante</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-[#c9a86a] text-xl">✦</span>
            <span>Sapato social ou calçado sofisticado</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="text-[#c9a86a] text-xl">✦</span>
            <span>Máscara obrigatória para o baile</span>
          </li>
        </ul>
          </div>

          {/* Feminino */}
           <div className="
            relative
            overflow-hidden
            bg-[#FAF9F6]
            border
            border-[#c9a86a]/40
            rounded-[32px]
            p-8
            shadow-[0_0_40px_rgba(201,168,106,0.08)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]
          ">
                    
            <div className="flex items-center gap-4 mb-6">
              <FaPersonDress className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Feminino
              </h3>
            </div>

            <ul className="space-y-4 text-black text-lg">
            <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Vestido longo, midi ou traje social elegante</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Looks sofisticados para uma noite especial</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Sapatos e acessórios compatíveis com o evento</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-[#c9a86a] text-xl">✦</span>
              <span>Máscara obrigatória para o baile</span>
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
          <div className="mt-10 text-center max-w-3xl mx-auto">
            <p className="text-black text-lg leading-relaxed">
              Nossa celebração será inspirada nos tradicionais bailes de máscaras.
              Escolha um traje elegante e prepare-se para viver uma noite mágica,
              repleta de encanto, diversão e momentos inesquecíveis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-20 text-center mt-10">

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