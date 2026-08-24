"use client";

import {
  FaMaskFace,
  FaUserTie,
  FaPersonDress,
  FaCrown,
} from "react-icons/fa6";

export default function DressCode() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="uppercase tracking-[7px] text-yellow-600 text-2xl mb-4">
            Dress Code
          </p>

          <h2 className="text-5xl md:text-7xl text-yellow-400 mb-5">
            Baile de Máscaras
          </h2>

          <p className="text-black/70 max-w-2xl mx-auto text-xl md:text-2xl leading-8">
            Para tornar esta noite ainda mais especial,
            contamos com a elegância e o encanto de todos os convidados.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-[#c9a86a]/50" />
          <span className="text-[#c9a86a]">✦</span>
          <div className="w-16 h-px bg-[#c9a86a]/50" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Masculino */}
          <div
            className="
              relative
              overflow-hidden
              bg-white/70
              backdrop-blur-sm
              border
              border-[#c9a86a]/30
              rounded-[32px]
              p-8
              shadow-[0_0_40px_rgba(201,168,106,0.08)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]
            "
          >
            <div className="flex items-center gap-4 mb-6">
              <FaUserTie className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Masculino
              </h3>
            </div>

            <ul className="space-y-4 text-black/80 text-lg">
              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Traje social ou esporte fino</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Blazer, terno ou combinação elegante</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-[#c9a86a] text-xl">✦</span>
                <span>Sapato social ou casual sofisticado</span>
              </li>
            </ul>
          </div>

          {/* Feminino */}
          <div
            className="
              relative
              overflow-hidden
              bg-white/70
              backdrop-blur-sm
              border
              border-[#c9a86a]/30
              rounded-[32px]
              p-8
              shadow-[0_0_40px_rgba(201,168,106,0.08)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_0_60px_rgba(201,168,106,0.18)]
            "
          >
            <div className="flex items-center gap-4 mb-6">
              <FaPersonDress className="text-yellow-400 text-4xl" />

              <h3 className="text-3xl text-yellow-400">
                Feminino
              </h3>
            </div>

            <ul className="space-y-4 text-black/80 text-lg">
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
                <span>Sapatos e acessórios elegantes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Destaques do baile */}
        <div
          className="
            mt-12
            border
            border-[#c9a86a]/25
            rounded-[32px]
            px-6
            py-10
            md:p-12
            shadow-[0_0_60px_rgba(201,168,106,0.10)]
            bg-white/50
            backdrop-blur-sm
          "
        >
          <div className="text-center mb-10">
            <h3 className="text-4xl md:text-5xl text-yellow-400 mb-4">
              Detalhes do Baile
            </h3>

            <p className="text-black/70 text-xl leading-8 max-w-3xl mx-auto">
              Nossa celebração será inspirada nos tradicionais bailes de máscaras.
              Prepare-se para uma noite de encanto, elegância e momentos inesquecíveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

  {/* Máscara */}
  <div className="text-center p-6 rounded-3xl border border-[#c9a86a]/20">
    <FaMaskFace className="text-yellow-400 text-5xl mx-auto mb-4" />

    <h4 className="text-3xl text-yellow-400 mb-3">
      Máscara de Baile
    </h4>

    <p className="text-black/70 text-lg">
      Não esqueça sua máscara.
      Ela fará parte dessa noite especial.
    </p>
  </div>

  {/* Cor da debutante */}
  <div className="text-center p-6 rounded-3xl border border-[#c9a86a]/20">
    <FaCrown className="text-yellow-400 text-5xl mx-auto mb-4" />

    <h4 className="text-3xl text-yellow-400 mb-3">
      Cor da Debutante
    </h4>

    <p className="text-black/70 text-lg">
      O rosa será reservado à Maria Clara.
    </p>
  </div>

</div>
        </div>

      </div>
    </section>
  );
}