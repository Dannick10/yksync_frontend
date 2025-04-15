"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaLaptopCode, FaCode, FaServer, FaCheck } from "react-icons/fa"
import ServiceCard from "../components/ServiceCard"
import PricingCard from "../components/PrincingCard"




export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 ">
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Serviços Oferecidos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluções completas para todas as suas necessidades digitais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FaLaptopCode className="w-6 h-6" />}
              title="Criação de Sites"
              description="Desenvolvimento de sites modernos, responsivos e de alta performance para elevar a presença da sua marca."
              delay={0}
            />

            <ServiceCard
              icon={<FaCode className="w-6 h-6" />}
              title="Aplicações Web"
              description="Criação de aplicações web interativas e dinâmicas com as mais recentes tecnologias do mercado."
              delay={0.1}
            />

            <ServiceCard
              icon={<FaServer className="w-6 h-6" />}
              title="Desenvolvimento Backend"
              description="Construção de APIs robustas e eficientes para suportar suas aplicações com segurança e escalabilidade."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Investimento</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluções personalizadas para atender às suas necessidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Frontend"
              subtitle="Interfaces e experiência do usuário"
              price="R$500 até R$3.000"
              features={[
                "Sites responsivos modernos",
                "Interfaces de usuário intuitivas",
                "Otimização de performance",
              ]}
              delay={0}
            />

            <PricingCard
              title="Fullstack"
              subtitle="Soluções completas"
              price="R$800 até R$5.000"
              features={[
                "Desenvolvimento frontend e backend",
                "Aplicações web completas",
                "Integrações com APIs",
                "Hospedagem e deploy",
              ]}
              popular={true}
              delay={0.1}
            />

            <PricingCard
              title="Backend"
              subtitle="APIs e serviços"
              price="R$600 até R$4.000"
              features={[
                "APIs RESTful otimizadas",
                "Integração com bancos de dados",
                "Autenticação e segurança",
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="w-full h-full bg-[url('/placeholder.svg')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua <span className="text-gray-400">ideia em realidade?</span>
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Entre em contato hoje mesmo para discutirmos seu projeto
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-zinc-900 font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Fale Comigo
                </motion.button>
              </Link>
              <Link href="https://www.linkedin.com/in/futurodevdaniel/" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-zinc-50 text-zinc-50 font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Me conheça
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
