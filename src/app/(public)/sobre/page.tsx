"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function SobrePage() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Sobre o Yksynk
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Organize Ideias. Sincronize Resultados.
            </h2>
            <p className="text-gray-700 mb-4">
              O <strong>Yksynk</strong> nasceu para transformar a forma como
              pessoas e equipes organizam seus projetos e tarefas. Chega de
              planilhas espalhadas ou ferramentas complicadas — aqui você
              acompanha tudo em tempo real, de forma simples, visual e
              eficiente.
            </p>
            <p className="text-gray-700">
              Com dashboards personalizáveis, visão de progresso e gestão
              intuitiva, o Yksynk conecta produtividade com design e
              performance. Criado para quem precisa mais controle e menos
              burocracia no dia a dia.
            </p>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="/about.webp"
              alt="Interface do Yksynk"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Como Tudo Começou
          </h2>
          <p className="text-gray-700 mb-4">
            O Yksynk foi idealizado por{" "}
            <strong>Daniel Rocha</strong>, desenvolvedor front-end apaixonado
            por criar soluções digitais acessíveis, intuitivas e com impacto
            real na rotina de quem desenvolve, gerencia ou organiza projetos.
          </p>
          <p className="text-gray-700 mb-4">
            Lançado oficialmente em 2025, o projeto surgiu da necessidade de
            centralizar ideias, prazos e tarefas em uma única plataforma, com
            visual limpo, performance de app e recursos sob medida para equipes
            e freelancers.
          </p>
          <p className="text-gray-700">
            Com tecnologias como <strong>Next.js</strong>, <strong>TailwindCSS</strong>,{" "}
            <strong>Redux</strong> e <strong>TypeScript</strong>, o Yksynk foi
            pensado para evoluir continuamente e acompanhar as novas demandas
            do mercado criativo e tech.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            O que move esse projeto
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Organização</h3>
              <p className="text-gray-700">
                Planeje, crie e acompanhe projetos de forma estruturada, sem
                poluir a sua rotina ou perder deadlines.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Produtividade</h3>
              <p className="text-gray-700">
                Dashboards visuais, progressos claros e alertas inteligentes que
                fazem você ganhar tempo e foco.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Evolução Contínua</h3>
              <p className="text-gray-700">
                O Yksynk está em constante melhoria, ouvindo usuários e
                implementando novas features para se manter à frente.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">
            Bora sincronizar suas ideias?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Faça parte da comunidade que já usa o Yksynk para dar vida aos seus
            projetos. Cadastre-se grátis e leve seu workflow para o próximo
            nível.
          </p>
          {user ? (
            <Link href={"/dashboard"}>
              <button className="flex items-center justify-center px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 mx-auto w-full md:w-auto">
                Ir para o Dashboard
              </button>
            </Link>
          ) : (
            <Link href={"/register"}>
              <button className="flex items-center justify-center px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 mx-auto w-full md:w-auto">
                Criar minha conta
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
