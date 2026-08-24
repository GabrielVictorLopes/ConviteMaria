"use client";

import { motion } from "framer-motion";

import maria1 from "./fotos/maria1.jpeg";
import maria2 from "./fotos/maria2.jpeg";
import maria3 from "./fotos/maria3.jpeg";
import maria4 from "./fotos/maria4.jpeg";
import maria5 from "./fotos/maria5.jpeg";
import maria6 from "./fotos/maria6.jpeg";

const fotos = [
  maria1,
  maria2,
  maria3,
  maria4,
  maria5,
  maria6,
];

export default function Gallery() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-6xl text-yellow-400 mb-4">
            Galeria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fotos.map((foto, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
              }}
              className="overflow-hidden rounded-3xl border border-yellow-500/30"
            >
              <img
                src={foto.src}
                alt={`Maria Clara - Foto ${index + 1}`}
                className="w-full h-[400px] object-cover transition duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}