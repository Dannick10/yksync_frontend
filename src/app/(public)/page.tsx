import React, { useEffect } from "react";
import Projects from "../../components/Projects";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiVercelFill,
  RiNodejsFill,
  RiGithubFill,
} from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import Cards from "../../components/cards";
import Link from "next/link";
import { useDispatch } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const itemsCard = [
    {
      title: " Crie e edite seus Projetos",
      list: [
        "Crie novos projetos de forma rápida e simples.",
        "Edite detalhes como nome, descrição e prazos facilmente.",
        "Mantenha tudo atualizado em um só lugar.",
      ],
    },
    {
      title: " Verificador de Prazos",
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
  ];

  return (
    <>
      <section className="flex flex-wrap items-center justify-center gap-6 px-6 py-10 ">
        <h2 className="text-3xl max-w-lg font-semibold leading-snug">
          Gerencie seus projetos de forma simples e eficiente
        </h2>
        <aside className="bg-white p-6 rounded-lg z-10 shadow-md">
          <article className="bg-black text-white rounded-lg p-6 space-y-4">
            <div className="flex gap-4">
              <Projects
                id="123"
                title="Webcommerce"
                description="Um e-commerce desenvolvido em Next.js"
                time="Falta 1 mês"
              />
              <Projects
                id="233"
                title="Legal"
                description="Um projeto interessante"
                time="Falta 1 mês"
              />
            </div>
            <p className="text-gray-300">Sem limitações</p>
            <p className="text-gray-300">Para todos dispositivos</p>
          </article>
        </aside>
      </section>

      <section className="w-full h-[800px] bg-white -skew-y-[10deg] flex justify-center items-center">
        <article className="w-full skew-y-[10deg] max-w-4xl text-center px-10 space-y-20">
          <p className="text-xl text-zinc-800">
            O Yksynk é a ferramenta ideal para acompanhar seus projetos,
            organizar tarefas e manter sua equipe sincronizada. A produtividade
            nunca foi tão fácil.
          </p>

          <Link href={"/register"} className="block">
            <button className="btn bg-black text-white">Comece aqui</button>
          </Link>

          <article className="text-zinc-900 space-y-8">
            <p className="text-2xl font-semibold">Fique mais produtivo</p>
            <aside className="text-5xl flex justify-center gap-8">
              <RiNextjsFill />
              <RiNodejsFill />
              <RiVercelFill />
              <SiTypescript />
              <RiTailwindCssFill />
              <RiGithubFill />
            </aside>
          </article>
        </article>
      </section>

      <section className="my-32">
        <article className="flex justify-center gap-8 flex-wrap">
          {itemsCard.map((items, index) => (
            <div
              className={`${index % 2 ? "bg-black border" : "bg-white text-black"}
               p-4 rounded-lg h-64 w-[335px] flex flex-col gap-10 items-center`}
            >
              <Cards title={items.title} list={items.list} />
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default Page;
