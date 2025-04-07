import Link from 'next/link'
import React from 'react'
import { motion} from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
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
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
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
            Chega de planilhas bagunçadas. Com o <strong>Yksynk</strong>, você gerencia tarefas, define prazos e
            monitora seu progresso em um só lugar — com agilidade e estilo.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Criar minha conta
            </Link>
            <Link
              href="/signin"
              className="px-8 py-4 border border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all"
            >
              Já tenho conta
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  </section>

  )
}

export default HeroSection