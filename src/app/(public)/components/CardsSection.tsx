"use client"
import { motion } from "framer-motion"
import Cards from "@/components/cards"

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

const CardsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Recursos principais</h2>
          <div className="mt-4 w-20 h-1 bg-gray-200 mx-auto rounded-full">
            <div className="w-10 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-16">
          {itemsCard.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full group"
            >
              <Cards title={item.title} list={item.list} variant={index % 2 ? "dark" : "light"} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardsSection

