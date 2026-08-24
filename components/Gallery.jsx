"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import maria1 from "./fotos/maria1.jpeg";
import maria2 from "./fotos/maria2.jpeg";
import maria3 from "./fotos/maria3.jpeg";
import maria4 from "./fotos/maria4.jpeg";
import maria5 from "./fotos/maria5.jpeg";
import maria6 from "./fotos/maria6.jpeg";
import maria9 from "./fotos/maria9.jpeg";

const fotos = [maria1, maria2, maria3, maria4, maria5, maria6, maria9];

export default function Gallery() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="tracking-[8px] uppercase text-yellow-500 text-xs mb-3">
            Momentos
          </p>

          <h2 className="text-5xl md:text-7xl text-white font-light">
            Galeria
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[230px] md:auto-rows-[300px] gap-3 md:gap-5">
          {fotos.map((foto, index) => {
            const classes = [
              "col-span-2 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-1 row-span-2",
            ];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${classes[index]} relative overflow-hidden rounded-2xl border border-yellow-500/20 group`}
              >
                <Image
                  src={foto}
                  alt={`Maria Clara ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}