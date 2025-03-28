"use client"

import Link from "next/link"
import { RiNextjsFill, RiTailwindCssFill, RiVercelFill, RiNodejsFill, RiGithubFill } from "react-icons/ri"
import { SiTypescript } from "react-icons/si"
import ProjectCard from "@/components/Projects"
import Cards from "@/components/cards"
import { motion } from "framer-motion"

export default function HomePage() {
  const itemsCard = [
    {
      title: "Crie e edite seus Projetos",
      list: [
        "Crie novos projetos de forma rápida e simples.",
        "Edite detalhes como nome, descrição e prazos facilmente.",
        "Mantenha tudo atualizado em um só lugar.",
      ],
    },
    {
      title: "Verificador de Prazos",
      list: [
        "Acompanhe os prazos dos seus projetos.",
        "Mantenha sua produtividade sempre em dia.",
        "Receba alertas para evitar atrasos.",
      ],
    },
    {
      title: "Monitoramento de Projetos",
      list: [
        "Visualize quantos projetos você criou no mês.",
        "Acompanhe sua evolução ao longo do tempo.",
        "Obtenha insights para melhorar sua produtividade.",
      ],
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-2 py-10 flex flex-col md:flex-row items-center justify-center gap-5">
        <motion.div
          className="max-w-xl space-y-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Gerencie seus projetos de forma simples e eficiente
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            O Yksynk é a ferramenta ideal para acompanhar seus projetos, organizar tarefas e manter sua equipe
            sincronizada. A produtividade nunca foi tão fácil.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Comece agora
            </Link>
            <Link
              href="/signin"
              className="px-8 py-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all hover:border-gray-400"
            >
              Entrar
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="bg-white rounded-xl p-6 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <ProjectCard
                  id="123"
                  title="Webcommerce"
                  answerable="unknow"
                  description="Um e-commerce desenvolvido em Next.js"
                  timeStart="2024-02-01"
                  timeEnd="2024-01-01"
                  color="#6366f1"
                />
                <ProjectCard
                  id="12"
                  title="Outro Projeto"
                  answerable="John Doe"
                  description="Outro projeto interessante"
                  timeStart="2024-03-01"
                  timeEnd="2024-05-01"
                  color="#8b5cf6"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 pt-2">
                <p className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Sem limitações
                </p>
                <p className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Para todos dispositivos
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-28">
        <div className="container mx-auto px-4 text-center space-y-20">
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Fique mais produtivo</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Construído com as melhores tecnologias para garantir performance e confiabilidade
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-10 md:gap-16 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { Icon: RiNextjsFill, delay: 0 },
              { Icon: RiGithubFill, delay: 0.1 },
              { Icon: RiTailwindCssFill, delay: 0.2 },
              { Icon: RiNodejsFill, delay: 0.3 },
              { Icon: SiTypescript, delay: 0.4 },
              { Icon: RiVercelFill, delay: 0.5 },
            ].map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay }}
                className="transform transition-all hover:scale-110"
              >
                <Icon className="h-12 w-12 text-gray-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container mx-auto px-4 py-28">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Recursos principais
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itemsCard.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Cards title={item.title} list={item.list} variant={index % 2 ? "dark" : "light"} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-28">
        <div className="container mx-auto px-4 text-center space-y-10">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Junte-se a milhares de profissionais que já estão gerenciando seus projetos de forma eficiente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Comece aqui
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-xl font-bold">Yksynk</span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <Link href="#" className="hover:text-black transition-colors">
                Sobre
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Recursos
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Preços
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Contato
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Yksynk. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

