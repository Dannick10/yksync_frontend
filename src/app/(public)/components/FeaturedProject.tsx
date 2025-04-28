import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type featureProject = {
  title: string;
  subtitle: string;
  img: string;
};

const FeaturedProject = () => {
  const featureProjects: featureProject[] = [
    {
      title: "Organização de Projetos",
      subtitle:
        "Crie e gerencie todos os seus projetos em um só lugar. Adicione prazos, tecnologias, descrições e links úteis. Visualize cada detalhe de forma organizada e tenha controle total sobre seus processos.",
      img: "/home/projeto.png",
    },
    {
      title: "Estatísticas Detalhadas",
      subtitle:
        "Acompanhe o desempenho dos seus projetos com gráficos interativos e relatórios por data. Veja estatísticas de produtividade, tecnologias mais usadas e evolução ao longo do tempo.",
      img: "/home/estatistica.png",
    },
    {
      title: "Calendário Integrado",
      subtitle:
        "Gerencie prazos com facilidade usando um calendário visual sincronizado. Veja de forma intuitiva as datas de entrega, status de cada projeto e organize seu fluxo de trabalho de maneira eficiente.",
      img: "/home/calendario.png",
    },
    {
      title: "Gestão de Tecnologias",
      subtitle:
        "Gerencie todas as tecnologias que você domina ou utiliza nos seus projetos. Organize por categorias como Frontend, Backend e Testes, visualize quais stacks estão associadas a cada projeto e acompanhe quais ferramentas você mais usa no seu dia a dia.",
      img: "/home/tech.png",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <section className="relative">
      <div className="absolute top-40 left-0 bg-zinc-700 w-full "></div>
      <motion.div className="sticky container mx-auto top-20 rounded-md left-0 w-full h-2 bg-zinc-500 z-10 overflow-hidden"
      initial={{opacity: 0}}
      transition={{duration: .6, delay: .8}}
      whileInView={{opacity: 1}}
      exit={{opacity: 0}}
      animate={{opacity: 0}}
      >
          <motion.div
            className="w-full h-2 bg-zinc-900 z-20 origin-left"
            style={{ scaleX }}
          />
        </motion.div>

        <div ref={containerRef} className="container mx-auto px-4 py-10">
          <div className="space-y-20">
            {featureProjects.map((project, i) => (
              <motion.div
                key={i}
                className="flex flex-col-reverse md:flex-row gap-8 items-center justify-center sticky top-40 md:top-20 left-0 bg-zinc-50 h-screen"
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0}}
                transition={{ duration: .6, ease: "easeOut" }}
              >
                <div className="flex-1 flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-950">
                    {project.title}
                  </h2>
                  <p className="text-zinc-600 text-lg">{project.subtitle}</p>
                </div>

                <div className="">
                  <div className="relative">
                    <Image
                      src={project.img}
                      alt={project.title}
                      width={600}
                      height={675}
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProject;
