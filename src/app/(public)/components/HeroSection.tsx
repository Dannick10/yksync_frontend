import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div
        className="absolute top-0 left-0 w-full h-full"
      >
        <Image
          src={"/crow.webp"}
          alt="corvo"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute bg-gradient-to-t to-transparent from-white bottom-0 h-10 w-full" />
      </div>
      {/* Content */}
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="space-y-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-zinc-950">
              Transforme suas ideias em{" "}
              <span className="relative inline-block">
                <span className="relative z-10">projetos organizados</span>
                <motion.span
                  className="absolute bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Chega de planilhas bagunçadas. Com o <strong>Yksynk</strong>, você
              gerencia tarefas, define prazos e monitora seu progresso em um só
              lugar — com agilidade e estilo.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="flex items-center justify-center px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                Criar minha conta
              </Link>
              <Link
                href="/signin"
                className="flex items-center justify-center px-8 py-3 text-zinc-950 bg-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                Já tenho conta
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
