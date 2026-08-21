import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 py-12">

      <div className="max-w-6xl mx-auto text-center px-6">

        <h3 className="text-3xl text-yellow-400 mb-4">
          Maria Clara Lopes
        </h3>

        <p className="text-gray-400 mb-8">
          15 Anos • Baile de Máscaras
        </p>

        <div className="flex justify-center gap-6 text-2xl">

          <a
            href="https://wa.me/5537988065152"
            target="_blank"
            className="text-yellow-400 hover:scale-110 transition"
          >
            <FaWhatsapp />
          </a>

          <a
            href="#"
            className="text-yellow-400 hover:scale-110 transition"
          >
            <FaInstagram />
          </a>

        </div>

        <p className="mt-8 text-sm text-gray-600">
          © 2026 Maria Clara Lopes
        </p>

      </div>

    </footer>
  );
}