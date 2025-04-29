import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

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

  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
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

  const scrollToProject = (index: number) => {
    projectsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleNext = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % featureProjects.length;
    scrollToProject(nextIndex);
  };



  return (
    <>
      <section className="relative ">
        <div className="absolute top-0 left-0 h-2 w-full bg-zinc-50 z-20 "></div>

        <motion.div className="sticky container mx-auto top-20 rounded-md left-0 w-full h-2 bg-zinc-500 z-10 overflow-hidden">
          <motion.div
            className="w-full h-2 bg-zinc-900 z-20 origin-left"
            style={{ scaleX }}
          />
        </motion.div>

        <div ref={containerRef} className="container mx-auto px-4 py-10 ">
          <div className="space-y-20">
            {featureProjects.map((project, i) => {
              const delay = i * 0.15;
              const OneByOne = i % 2 == 0;

              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) projectsRef.current[i] = el;
                  }}
                  className={`flex flex-col-reverse ${OneByOne ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center justify-center sticky top-40 md:top-20 left-0 bg-zinc-50 h-screen`}
                >
                  <motion.div
                    className="flex-1 flex flex-col gap-4 relative"
                    initial={{ x: OneByOne ? -10 : 10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "linear",
                      delay: delay + 0.1,
                    }}
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-950">
                      {project.title}
                    </h2>
                    <p className="text-zinc-600 text-lg">{project.subtitle}</p>

                    <div className="absolute -top-16 left-0 bg-black w-10 h-10 flex justify-center items-center font-bold rounded-full text-white z-10">
                      {i + 1}
                    </div>
                    <div
                      className={`flex items-center ${OneByOne ? "md:items-end" : "md:items-start"} flex-col ${i === featureProjects.length -1 && 'hidden'}`}
                    >
                      <button
                        onClick={() => handleNext(i)}
                        className="p-2 hover:bg-gray-200 rounded-full text-xl bg-black text-white"
                        aria-label="Próximo projeto"
                      >
                        <FaChevronDown />
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    className=""
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "linear",
                      delay: delay + 0.1,
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={project.img}
                        alt={project.title}
                        width={600}
                        height={675}
                        priority={i === 0}
                        className="w-full h-auto object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProject;
