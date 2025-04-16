"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailLine,
  RiMap2Fill,
  RiPhoneFill,
  RiSendBackward,
} from "react-icons/ri";
import Link from "next/link";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio de formulário
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset do status após 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Entre em Contato
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos prontos para ajudar você a transformar suas ideias em
              projetos organizados. Preencha o formulário abaixo ou utilize um
              dos nossos canais de atendimento.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between gap-3 hover:shadow-lg transition-all "
            >
              <div className="flex gap-2">
                <div className="bg-blue-50  rounded-full text-zinc-900">
                  <RiPhoneFill className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold ">Telefone</span>
              </div>
              <p className="text-gray-700">(79) 9835-5720</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between gap-3 hover:shadow-lg transition-all "
            >
              <div className="flex gap-2">
                <div className="bg-blue-50 rounded-full  text-zinc-900">
                  <RiMailLine className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold ">E-mail</span>
              </div>
              <p className="text-gray-700">ykdanieldev@gmail.com</p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <Link
              href={"https://www.linkedin.com/in/futurodevdaniel/"}
              target="_blank"
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                whileHover={{ scale: 1.03 }}
                rel="noopener noreferrer"
                className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-3 hover:shadow-lg transition-all justify-between"
              >
                <div className="flex items-center justify-center gap-2">
                  <RiLinkedinBoxFill className="h-6 w-6 text-[#0077B5]" />
                  <span className="text-xl font-semibold ">GitHub</span>
                </div>
                <span className="font-medium">LinkedIn: futurodevdaniel</span>
              </motion.div>
            </Link>

            <Link
              href={"https://github.com/Dannick10"}
              target="_blank"
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
                rel="noopener noreferrer"
                className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center justify-between gap-3 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <RiGithubFill className="h-6 w-6 text-gray-900" />
                  <span className="text-xl font-semibold ">GitHub</span>
                </div>
              </motion.div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-6 text-zinc-950">
              Envie uma mensagem
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                Ocorreu um erro ao enviar sua mensagem. Por favor, tente
                novamente.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Orçamento">Solicitar orçamento</option>
                    <option value="Suporte">Suporte técnico</option>
                    <option value="Parceria">Proposta de parceria</option>
                    <option value="Outro">Outro assunto</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center px-8 py-3 bg-zinc-900 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <RiSendBackward className="h-4 w-4 mr-2" />
                    Enviar mensagem
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
