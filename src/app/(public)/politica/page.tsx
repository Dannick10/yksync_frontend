"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaChevronRight, FaShieldAlt, FaLock } from "react-icons/fa"
import PrivacySection from "../components/termsCard"

export default function PrivacidadePage() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = new Date().toLocaleDateString("pt-BR")

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-blue-50 text-zinc-900 rounded-full mb-4">
              <FaLock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Política de Privacidade</h1>
            <p className="text-gray-600">Última atualização: {lastUpdated}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                A YKSYNCK está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
                coletamos, usamos, divulgamos, transferimos e armazenamos suas informações. Dedique alguns minutos para
                se familiarizar com nossas práticas de privacidade.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* 1. Introdução */}
            <PrivacySection
              icon={<FaShieldAlt className="w-6 h-6" />}
              title="1. Introdução"
              content={
                <div className="space-y-4">
                  <p>
                    A YKSYNCK está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
                    coletamos, usamos, divulgamos, transferimos e armazenamos suas informações. Dedique alguns minutos
                    para se familiarizar com nossas práticas de privacidade.
                  </p>
                </div>
              }
            />

            {/* 2. Coleta e Uso de Informações Pessoais */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="2. Coleta e Uso de Informações Pessoais"
              content={
                <div className="space-y-4">
                  <p>
                    Informações pessoais são dados que podem ser usados para identificar ou contatar uma pessoa
                    específica. Podemos coletar informações pessoais quando você cria uma conta, usa nossos serviços,
                    entra em contato com nosso suporte ou participa de pesquisas.
                  </p>
                  <p>
                    As informações pessoais que coletamos podem incluir seu nome, endereço de e-mail, número de
                    telefone, endereço, preferências de uso e informações relacionadas ao seu dispositivo.
                  </p>
                </div>
              }
            />

            {/* 3. Cookies e Tecnologias Semelhantes */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="3. Cookies e Tecnologias Semelhantes"
              content={
                <div className="space-y-4">
                  <p>
                    Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, entender como nossos
                    serviços são utilizados e personalizar nosso conteúdo. Você pode controlar o uso de cookies através
                    das configurações do seu navegador, mas isso pode afetar a funcionalidade de nossos serviços.
                  </p>
                </div>
              }
            />

            {/* 4. Compartilhamento de Informações Pessoais */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="4. Compartilhamento de Informações Pessoais"
              content={
                <div className="space-y-4">
                  <p>
                    Podemos compartilhar suas informações pessoais com prestadores de serviços que trabalham em nosso
                    nome, como processamento de pagamentos, análise de dados, entrega de e-mails, hospedagem de serviços
                    e atendimento ao cliente. Esses prestadores de serviços são obrigados a proteger suas informações e
                    só podem usá-las para os fins específicos que determinamos.
                  </p>
                </div>
              }
            />

            {/* 5. Proteção de Informações Pessoais */}
            <PrivacySection
              icon={<FaShieldAlt className="w-6 h-6" />}
              title="5. Proteção de Informações Pessoais"
              content={
                <div className="space-y-4">
                  <p>
                    Tomamos precauções, incluindo medidas administrativas, técnicas e físicas, para proteger suas
                    informações pessoais contra perda, roubo e uso indevido, bem como contra acesso, divulgação,
                    alteração e destruição não autorizados.
                  </p>
                </div>
              }
            />

            {/* 6. Seus Direitos */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="6. Seus Direitos"
              content={
                <div className="space-y-4">
                  <p>
                    Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações
                    pessoais. Você também pode se opor ao processamento de suas informações pessoais, pedir para
                    restringirmos o processamento de suas informações pessoais ou solicitar a portabilidade de suas
                    informações pessoais.
                  </p>
                </div>
              }
            />

            {/* 7. Alterações nesta Política de Privacidade */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="7. Alterações nesta Política de Privacidade"
              content={
                <div className="space-y-4">
                  <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
                    disponível em nosso site, e se fizermos alterações significativas, notificaremos você por e-mail ou
                    através de um aviso em nosso site.
                  </p>
                </div>
              }
            />

            {/* 8. Contato */}
            <PrivacySection
              icon={<FaChevronRight className="w-6 h-6" />}
              title="8. Contato"
              content={
                <div className="space-y-4">
                  <p>
                    Se você tiver dúvidas ou preocupações sobre nossa Política de Privacidade ou práticas de dados,
                    entre em contato conosco através do e-mail: privacidade@yksynck.com.
                  </p>
                </div>
              }
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Ao usar a YKSYNCK, você concorda com nossa Política de Privacidade.</p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
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
