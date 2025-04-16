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
              Transformando Ideias em Ação
            </h2>
            <p className="text-gray-700 mb-4">
              O <strong>Yksynk</strong> nasceu com a missão de revolucionar a
              forma como pessoas e equipes gerenciam seus projetos. Nada de
              planilhas confusas ou prazos esquecidos — aqui, tudo está
              conectado, intuitivo e no seu controle.
            </p>
            <p className="text-gray-700">
              Projetado com foco na produtividade, estilo e usabilidade, o
              Yksynk permite criar, acompanhar e analisar projetos com fluidez.
              Mais que uma plataforma, é um aliado para quem deseja crescer com
              organização e visão estratégica.
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
            O Yksynk é um projeto idealizado e desenvolvido por{" "}
            <strong>Daniel Rocha</strong>, desenvolvedor front-end apaixonado
            por criar soluções funcionais e impactantes. Lançado em 2025, o
            projeto surgiu da necessidade real de organizar ideias, prazos e
            progresso de forma prática.
          </p>
          <p className="text-gray-700 mb-4">
            Ao unir experiência em UI/UX, tecnologias modernas como Next.js,
            Tailwind e TypeScript, e um olhar voltado à experiência do usuário,
            nasceu uma plataforma moderna e eficiente.
          </p>
          <p className="text-gray-700">
            então, o Yksynk pretende ajudar profissionais a manter seus projetos
            no ritmo certo, com controle e confiança.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            O que me move
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Organização</h3>
              <p className="text-gray-700">
                Cada detalhe da plataforma foi pensado para tornar a gestão de
                projetos mais fluida e clara.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Eficiência</h3>
              <p className="text-gray-700">
                Com dashboards visuais, verificação de prazos e acompanhamento
                de progresso, você ganha tempo e visão.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Inovação</h3>
              <p className="text-gray-700">
                Sempre buscando melhorias e novas funcionalidades para manter o
                Yksynk à frente das necessidades do mercado.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">
            Pronto para organizar seu mundo?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já estão utilizando o Yksynk
            para dar vida a suas ideias. Cadastre-se agora e leve seus projetos
            para o próximo nível.
          </p>
          {user ? (
            <Link href={"/dashboard"}>
              <button className="flex items-center justify-center px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 mx-auto w-full md:w-auto">
                ir para Dashboard
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
