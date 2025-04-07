import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/Projects";
import { RiArrowRightLine } from "react-icons/ri";

const sampleProjects = [
  {
    id: "123",
    title: "E-commerce Platform",
    answerable: "John Developer",
    description:
      "Um e-commerce completo desenvolvido com Next.js, Tailwind e API RESTful",
    timeStart: "2024-02-01",
    timeEnd: "2024-06-01",
    color: "#6366f1",
    status: "current",
  },
  {
    id: "124",
    title: "Dashboard Analytics",
    answerable: "Maria Designer",
    description:
      "Dashboard interativo com gráficos e análise de dados em tempo real",
    timeStart: "2024-01-15",
    timeEnd: "2024-03-30",
    color: "#8b5cf6",
    status: "finish",
  },
  {
    id: "125",
    title: "Mobile App",
    answerable: "Carlos Mobile",
    description: "Aplicativo móvel para iOS e Android usando React Native",
    timeStart: "2024-03-01",
    timeEnd: "2024-02-28",
    color: "#ec4899",
    status: "current",
  },
  {
    id: "126",
    title: "API Integration",
    answerable: "Ana Backend",
    description:
      "Integração com múltiplas APIs de pagamento e serviços externos",
    timeStart: "2024-02-15",
    timeEnd: "2024-04-15",
    color: "#14b8a6",
    status: "current",
  },
];

const FeaturedProject = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Projetos em Destaque
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Veja exemplos de como o Yksynk pode ajudar a organizar seus projetos
          de forma eficiente
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard
              id={project.id}
              title={project.title}
              answerable={project.answerable}
              description={project.description}
              timeStart={project.timeStart}
              timeEnd={project.timeEnd}
              color={project.color}
              status={project.status}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all"
        >
          Ver todos os projetos
          <RiArrowRightLine className="h-5 w-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedProject;
