"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaChevronRight, FaExclamationTriangle, FaFileContract, FaGavel } from "react-icons/fa"
import PrivacySection from "../components/termsCard"


export default function Termspage() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = new Date().toLocaleDateString("pt-BR")

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-blue-50 text-zinc-900 rounded-full mb-4">
              <FaFileContract className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Termos de Uso</h1>
            <p className="text-gray-600">Última atualização: {lastUpdated}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                Bem-vindo à YKSYNCK. Estes Termos de Uso regem seu acesso e uso do site YKSYNCK, serviços, aplicativos e
                ferramentas (coletivamente, os "Serviços"). Ao acessar ou usar nossos Serviços, você concorda com estes
                Termos de Uso. Se você não concordar com estes termos, não use nossos Serviços.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* 1. Aceitação dos Termos */}
            <PrivacySection
              icon={<FaGavel className="w-6 h-6" />}
              title="1. Aceitação dos Termos"
              content={
                <div className="space-y-4">
                  <p>
                    Ao acessar e utilizar os serviços da YKSYNCK, você concorda com estes Termos de Uso e nossa Política
                    de Privacidade. Se você não concordar com qualquer parte destes termos, por favor, não utilize
                    nossos serviços.
                  </p>
                  <p>
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em
                    vigor imediatamente após a publicação dos termos atualizados. O uso contínuo de nossos serviços após
                    tais alterações constitui sua aceitação dos novos termos.
                  </p>
                </div>
              }
            />

            {/* 2. Descrição dos Serviços */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="2. Descrição dos Serviços"
              content={
                <div className="space-y-4">
                  <p>
                    A YKSYNCK oferece uma plataforma para gerenciamento de projetos, tarefas e prazos. Nossos serviços
                    incluem, mas não se limitam a, criação de sites, desenvolvimento de aplicações web e construção de
                    APIs.
                  </p>
                  <p>
                    Embora nos esforcemos para manter o serviço disponível 24 horas por dia, não podemos garantir que o
                    serviço estará disponível ininterruptamente ou sem erros. Reservamo-nos o direito de modificar,
                    suspender ou descontinuar qualquer aspecto do serviço a qualquer momento.
                  </p>
                </div>
              }
            />

            {/* 3. Contas de Usuário */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="3. Contas de Usuário"
              content={
                <div className="space-y-4">
                  <p>
                    Para utilizar nossos serviços, você precisa criar uma conta. Você é responsável por manter a
                    confidencialidade de suas credenciais e por todas as atividades que ocorrem em sua conta.
                  </p>
                  <p>
                    Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta ou
                    qualquer outra violação de segurança. Não seremos responsáveis por quaisquer perdas resultantes do
                    uso não autorizado de sua conta.
                  </p>
                </div>
              }
            />

            {/* 4. Propriedade Intelectual */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="4. Propriedade Intelectual"
              content={
                <div className="space-y-4">
                  <p>
                    Todo o conteúdo disponibilizado em nossa plataforma, incluindo textos, gráficos, logotipos, ícones,
                    imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da YKSYNCK ou de
                    seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
                  </p>
                  <p>
                    Você não pode reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente,
                    executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material de nosso
                    serviço, exceto conforme permitido por estes Termos de Uso.
                  </p>
                </div>
              }
            />

            {/* 5. Limitação de Responsabilidade */}
            <PrivacySection
              icon={<FaExclamationTriangle className="w-6 h-6" />}
              title="5. Limitação de Responsabilidade"
              content={
                <div className="space-y-4">
                  <p>
                    A YKSYNCK não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais,
                    consequenciais ou punitivos, incluindo, mas não se limitando a, perda de lucros, dados, uso, boa
                    vontade ou outras perdas intangíveis, resultantes do uso ou da incapacidade de usar os serviços.
                  </p>
                  <p>
                    Esta limitação de responsabilidade se aplica independentemente da teoria legal de responsabilidade e
                    mesmo se a YKSYNCK tiver sido avisada da possibilidade de tais danos.
                  </p>
                </div>
              }
            />

            {/* 6. Alterações nos Termos */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="6. Alterações nos Termos"
              content={
                <div className="space-y-4">
                  <p>
                    Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                    imediatamente após a publicação dos termos atualizados. O uso contínuo de nossos serviços após tais
                    alterações constitui sua aceitação dos novos termos.
                  </p>
                  <p>
                    O que constitui uma alteração material será determinado a nosso critério exclusivo. Ao continuar a
                    acessar ou usar nosso serviço após essas revisões se tornarem efetivas, você concorda em ficar
                    vinculado aos termos revisados.
                  </p>
                </div>
              }
            />

            {/* 7. Lei Aplicável */}
            <PrivacySection
              icon={<FaGavel className="w-6 h-6" />}
              title="7. Lei Aplicável"
              content={
                <div className="space-y-4">
                  <p>
                    Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de
                    conflitos de disposições legais.
                  </p>
                  <p>
                    Qualquer disputa legal decorrente ou relacionada a estes Termos de Uso será submetida à jurisdição
                    exclusiva dos tribunais localizados no Brasil.
                  </p>
                </div>
              }
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Ao usar a YKSYNCK, você concorda com estes Termos de Uso.</p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Voltar para a página inicial
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>© {currentYear} YKSYNCK. Todos os direitos reservados.</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
