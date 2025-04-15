"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  RiProjector2Fill,
  RiCalendar2Line,
  RiLink,
  RiAddLine,
  RiCloseLine,
  RiCodeSSlashFill,
  RiDatabase2Fill,
  RiTestTubeFill,
  RiGitRepositoryLine,
  RiGlobalLine,
  RiArrowLeftLine,
} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import type { AppDispatch, RootState } from "@/redux/store"
import { getProject_Id, projectEdit, resetMessage } from "@/redux/slices/ProjectSlices"
import { Getprofile } from "@/redux/slices/userSlices"
import { type formData, projectSchema, StatusOptions } from "../../schema/ProjectSchema"
import { motion } from "framer-motion"

export default function EditProjectForm ()  {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      frontend: [],
      backend: [],
      database: [],
      tests: [],
      color: "#6366f1",
    },
  })

  const [newFrontendTech, setNewFrontendTech] = useState("")
  const [newBackendTech, setNewBackendTech] = useState("")
  const [newDatabaseTech, setNewDatabaseTech] = useState("")
  const [newTestTech, setNewTestTech] = useState("")

  const selectedFrontendTechs = watch("frontend") || []
  const selectedBackendTechs = watch("backend") || []
  const selectedDatabaseTechs = watch("database") || []
  const selectedTestTechs = watch("tests") || []

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { id } = useParams()

  const { project, loading, error, message } = useSelector((state: RootState) => state.project)

  useEffect(() => {
    dispatch(getProject_Id(id as string))
    dispatch(Getprofile())
    dispatch(resetMessage())
  }, [dispatch, id])

  useEffect(() => {
    if (project) {
      setValue("name", project.name)
      setValue("answerable", project.answerable)
      setValue("description", project.description)
      setValue("color", project.color)
      setValue("status", project.status as any)
      setValue("startDate", project.startDate.split("T")[0])
      setValue("endDate", project.endDate.split("T")[0])
      setValue("frontend", project.frontend || [])
      setValue("backend", project.backend || [])
      setValue("database", project.database || [])
      setValue("tests", project.tests || [])
      setValue("linkDeploy", project.linkDeploy || "")
      setValue("linkRepository", project.linkRepository || "")
    }
  }, [project, setValue])

  const handleProject: SubmitHandler<formData> = (data: formData) => {
    const projectData = {
      _id: id,
      ...data,
    }

    dispatch(projectEdit(projectData as any))

    setTimeout(() => {
      dispatch(resetMessage())
      router.push(`/projects/${id}`)
    }, 800)
  }

  const addTechnology = (
    type: "frontend" | "backend" | "database" | "tests",
    tech: string,
    setTech: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!tech.trim()) return

    const currentTechs = watch(type) || []
    if (!currentTechs.includes(tech)) {
      setValue(type, [...currentTechs, tech.trim()])
    }
    setTech("")
  }

  const removeTechnology = (type: "frontend" | "backend" | "database" | "tests", tech: string) => {
    const currentTechs = watch(type) || []
    setValue(
      type,
      currentTechs.filter((t) => t !== tech),
    )
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="flex justify-center py-8 px-4 bg-gray-50 min-h-screen">
      <motion.section
        className="w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-black transition-colors"
          >
            <RiArrowLeftLine />
            <span>Voltar ao projeto</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-black text-white p-6">
            <h1 className="text-2xl font-bold">Editar Projeto</h1>
            <p className="text-gray-300 mt-1">Atualize as informações do seu projeto</p>
          </div>

          <form method="post" className="p-6 md:p-8" onSubmit={handleSubmit(handleProject)}>
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <RiProjector2Fill className="text-gray-700" />
                  Informações Básicas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                          errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                        }`}
                        placeholder="Nome do projeto"
                        autoComplete="off"
                        {...register("name")}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Responsável</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                          errors.answerable ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                        }`}
                        placeholder="Responsável pelo projeto"
                        autoComplete="off"
                        {...register("answerable")}
                      />
                      {errors.answerable && <p className="mt-1 text-sm text-red-500">{errors.answerable.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all min-h-[100px] ${
                      errors.description ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                    }`}
                    placeholder="Descreva seu projeto"
                    autoComplete="off"
                    {...register("description")}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Cor do Projeto</label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-md border border-gray-300"
                        style={{ backgroundColor: watch("color") }}
                      />
                      <input
                        type="color"
                        className={`h-10 w-full cursor-pointer rounded-lg border ${
                          errors.color ? "border-red-400" : "border-gray-300"
                        }`}
                        {...register("color")}
                      />
                    </div>
                    {errors.color && <p className="mt-1 text-sm text-red-500">{errors.color.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status do Projeto</label>
                    <select
                      {...register("status")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                    >
                      {StatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status === "current" ? "Em andamento" : "Finalizado"}
                        </option>
                      ))}
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <RiCalendar2Line className="text-gray-700" />
                  Datas do Projeto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Data de Início</label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                          errors.startDate ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                        }`}
                        {...register("startDate")}
                      />
                      {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Data de Término</label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                          errors.endDate ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                        }`}
                        {...register("endDate")}
                      />
                      {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Tecnologias Utilizadas</h2>

                {/* Frontend */}
                <div className="space-y-3">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <RiCodeSSlashFill className="text-gray-700" />
                    Frontend
                  </h3>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                      placeholder="Adicionar tecnologia (ex: React, Vue, Angular)"
                      value={newFrontendTech}
                      onChange={(e) => setNewFrontendTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTechnology("frontend", newFrontendTech, setNewFrontendTech)
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => addTechnology("frontend", newFrontendTech, setNewFrontendTech)}
                    >
                      <RiAddLine className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedFrontendTechs.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full group hover:bg-gray-200 transition-colors"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => removeTechnology("frontend", tech)}
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-3">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <RiCodeSSlashFill className="text-gray-700" />
                    Backend
                  </h3>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                      placeholder="Adicionar tecnologia (ex: Node.js, Python, Java)"
                      value={newBackendTech}
                      onChange={(e) => setNewBackendTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTechnology("backend", newBackendTech, setNewBackendTech)
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => addTechnology("backend", newBackendTech, setNewBackendTech)}
                    >
                      <RiAddLine className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedBackendTechs.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full group hover:bg-gray-200 transition-colors"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => removeTechnology("backend", tech)}
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div className="space-y-3">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <RiDatabase2Fill className="text-gray-700" />
                    Banco de Dados
                  </h3>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                      placeholder="Adicionar banco de dados (ex: MongoDB, MySQL, PostgreSQL)"
                      value={newDatabaseTech}
                      onChange={(e) => setNewDatabaseTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTechnology("database", newDatabaseTech, setNewDatabaseTech)
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => addTechnology("database", newDatabaseTech, setNewDatabaseTech)}
                    >
                      <RiAddLine className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedDatabaseTechs.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full group hover:bg-gray-200 transition-colors"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => removeTechnology("database", tech)}
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tests */}
                <div className="space-y-3">
                  <h3 className="text-md font-medium flex items-center gap-2">
                    <RiTestTubeFill className="text-gray-700" />
                    Testes
                  </h3>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                      placeholder="Adicionar tipo de teste (ex: Jest, Cypress, Selenium)"
                      value={newTestTech}
                      onChange={(e) => setNewTestTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTechnology("tests", newTestTech, setNewTestTech)
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => addTechnology("tests", newTestTech, setNewTestTech)}
                    >
                      <RiAddLine className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTestTechs.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full group hover:bg-gray-200 transition-colors"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => removeTechnology("tests", tech)}
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <RiLink className="text-gray-700" />
                  Links do Projeto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <RiGlobalLine className="text-gray-500" />
                      Link de Deploy
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                        errors.linkDeploy ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                      }`}
                      placeholder="https://meu-projeto.vercel.app"
                      {...register("linkDeploy")}
                    />
                    {errors.linkDeploy && <p className="mt-1 text-sm text-red-500">{errors.linkDeploy.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <RiGitRepositoryLine className="text-gray-500" />
                      Link do Repositório
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black transition-all ${
                        errors.linkRepository ? "border-red-400 focus:ring-red-200" : "border-gray-300"
                      }`}
                      placeholder="https://github.com/usuario/projeto"
                      {...register("linkRepository")}
                    />
                    {errors.linkRepository && (
                      <p className="mt-1 text-sm text-red-500">{errors.linkRepository.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Atualizar Projeto
                  </button>

                {error && <p className="mt-3 text-center text-red-500 bg-red-50 p-2 rounded-lg">{error}</p>}

                {message && <p className="mt-3 text-center text-green-500 bg-green-50 p-2 rounded-lg">{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  )
}

