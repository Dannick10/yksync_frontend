import Link from "next/link";
import { RiCheckFill } from "react-icons/ri";

export const metadata = {
  title: "Recursos | YKSYNCK",
  description: "Conheça os recursos e funcionalidades da plataforma YKSYNCK",
};

export default function RecursosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Recursos
        </h1>
        <p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto">
          Conheça as ferramentas e funcionalidades que tornam a YKSYNCK a
          plataforma ideal para transformar suas ideias em projetos organizados.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Organização de Projetos</h2>
              <p className="text-gray-700 mb-4">
                Crie e gerencie todos os seus projetos em um só lugar. Adicione prazos, tecnologias, descrições e links úteis. Visualize cada detalhe de forma organizada e tenha controle total sobre seus processos.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Controle completo de prazos e marcos
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Adição de tecnologias e stacks utilizadas
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Descrições detalhadas e documentação
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Links úteis e materiais de referência
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Estatísticas Detalhadas</h2>
              <p className="text-gray-700 mb-4">
                Acompanhe o desempenho dos seus projetos com gráficos interativos e relatórios por data. Veja estatísticas de produtividade, tecnologias mais usadas e evolução ao longo do tempo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Gráficos e visualizações interativas
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Relatórios por período temporal
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Métricas de produtividade
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Análise de tecnologias mais utilizadas
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Calendário Integrado</h2>
              <p className="text-gray-700 mb-4">
                Gerencie prazos com facilidade usando um calendário visual sincronizado. Veja de forma intuitiva as datas de entrega, status de cada projeto e organize seu fluxo de trabalho de maneira eficiente.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Visualização clara de prazos e entregas
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Sincronização automática com projetos
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Status de cada projeto visível
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Organização eficaz do fluxo de trabalho
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Gestão de Tecnologias</h2>
              <p className="text-gray-700 mb-4">
                Gerencie todas as tecnologias que você domina ou utiliza nos seus projetos. Organize por categorias como Frontend, Backend e Testes, visualize quais stacks estão associadas a cada projeto e acompanhe quais ferramentas você mais usa no seu dia a dia.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Categorização por tipo (Frontend, Backend, Testes)
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Associação clara com cada projeto
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Acompanhamento de stacks mais usadas
                  </span>
                </li>
                <li className="flex items-start">
                  <RiCheckFill className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">
                    Links para documentação e materiais
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Recursos Técnicos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Segurança</h3>
              <p className="text-gray-700">
                Criptografia de dados e autenticação em dois fatores para
                proteger suas informações.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Nuvem</h3>
              <p className="text-gray-700">
                Armazenamento em nuvem com sincronização automática entre
                dispositivos.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Escalabilidade</h3>
              <p className="text-gray-700">
                Infraestrutura que cresce com sua empresa, sem perda de
                desempenho.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Experimente Agora</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Transforme suas ideias em projetos organizados com a YKSYNCK. Crie
            sua conta gratuitamente e descubra como podemos ajudar você a
            alcançar seus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/signup"}>
              <button className="flex items-center justify-center px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 w-full">
                Criar minha conta
              </button>
            </Link>
            <Link href={"/servicos"}>
              <button className="flex items-center justify-center px-8 py-3 bg-white border border-zinc-200 font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 w-full">
                Conhecer serviços
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}