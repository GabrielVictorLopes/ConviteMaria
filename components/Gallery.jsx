"use client";

import { motion } from "framer-motion";

const fotos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  "https://images.unsplash.com/photo-1511578314322-379afb476865",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
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

        <div className="grid md:grid-cols-3 gap-6">
          {fotos.map((foto, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
              }}
              className="overflow-hidden rounded-3xl border border-yellow-500/30"
            >
              <img
                src={foto}
                alt="Galeria"
                className="w-full h-[400px] object-cover transition duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}