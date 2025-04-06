"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { getProject_Id, projectDelete, resetMessage, resetProject } from "@/redux/slices/ProjectSlices"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { configureTIme } from "@/utils/configureTime"
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiClockwiseLine,
  RiCodeLine,
  RiDatabase2Line,
  RiEditLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiTestTubeLine,
  RiDeleteBinLine,
  RiUser2Fill,
  RiAlertLine,
} from "react-icons/ri"

import { useState } from "react"
import MyFullCalendar from "@/components/MyFullCalendar"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { project, loading, error, message } = useSelector((state: RootState) => state.project)
  const id = params.id
  const [activeTab, setActiveTab] = useState("info")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getProject_Id(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    dispatch(resetMessage())
    return () => {
      dispatch(resetProject())
    }
  }, [dispatch])

  const handleEdit = () => {
    router.push(`/projects/edit/${project?._id}`)
  }

  const handleDelete = () => {
    dispatch(projectDelete(id))
    setTimeout(() => {
      dispatch(resetMessage())
      dispatch(resetProject())
      router.push("/dashboard")
    }, 800)
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-md bg-white border rounded-lg shadow-sm p-10 flex flex-col items-center space-y-4">
          <p>Carregando projeto...</p>
        </div>
      </div>
    )
  }

  const pastDateProject = new Date(project.startDate)
  const afterDateProject = new Date(project.endDate)

  const startDate = format(pastDateProject, "dd/MM/yyyy", { locale: ptBR })
  const endDate = format(afterDateProject, "dd/MM/yyyy", { locale: ptBR })

  const timeResult = configureTIme(pastDateProject, afterDateProject)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href={'/dashboard'}>
        <button className="flex items-center mr-4 text-gray-600 hover:text-black">
          <RiArrowLeftLine className="h-5 w-5 mr-2" />
          Voltar
        </button>
        </Link>
        <h1 className="text-2xl font-bold flex items-center">
          {project.name}
          <div className="w-3 h-3 rounded-full ml-3" style={{ backgroundColor: project.color }} />
        </h1>
        <span className="ml-auto px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          {project.status === "finish" ? "Finalizado" : "Em andamento"}
        </span>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 flex items-start">
          <RiAlertLine className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
          <p className="text-green-700 text-sm">{message}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start">
          <RiAlertLine className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Detalhes do Projeto</h2>
            </div>
            <div className="p-6">
              <div className="border-b mb-6">
                <div className="flex flex-wrap -mb-px">
                  <button
                    type="button"
                    onClick={() => setActiveTab("info")}
                    className={`mr-4 py-2 px-4 border-b-2 font-medium ${
                      activeTab === "info"
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Informações
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tech")}
                    className={`mr-4 py-2 px-4 border-b-2 font-medium ${
                      activeTab === "tech"
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Tecnologias
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("calendar")}
                    className={`mr-4 py-2 px-4 border-b-2 font-medium ${
                      activeTab === "calendar"
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Calendário
                  </button>
                </div>
              </div>

              {activeTab === "info" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <RiUser2Fill className="h-4 w-4 mr-2" />
                      <span className="text-sm">Responsável</span>
                    </div>
                    <p className="font-medium">{project.answerable}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <RiClockwiseLine className="h-4 w-4 mr-2" />
                      <span className="text-sm">Duração</span>
                    </div>
                    <p className="font-medium">{timeResult?.formatTime}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <RiCalendarLine className="h-4 w-4 mr-2" />
                      <span className="text-sm">Período</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Início:</span> {startDate}
                      </div>
                      <div>
                        <span className="text-gray-500">Término:</span> {endDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <h3 className="font-medium">Descrição</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>

                  {(project.linkRepository || project.linkDeploy) && (
                    <div className="space-y-4 pt-4">
                      <h3 className="font-medium">Links</h3>
                      <div className="flex flex-wrap gap-4">
                        {project.linkRepository && (
                          <Link
                            href={project.linkRepository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <RiGithubLine className="h-4 w-4" />
                            Repositório
                          </Link>
                        )}
                        {project.linkDeploy && (
                          <Link
                            href={project.linkDeploy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <RiExternalLinkLine className="h-4 w-4" />
                            Deploy
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <RiCodeLine className="h-5 w-5 mr-2 text-gray-500" />
                      <h3 className="font-medium">Frontend</h3>
                    </div>
                    {Array.isArray(project.frontend) && project.frontend.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.frontend.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Não possui frontend</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <RiCodeLine className="h-5 w-5 mr-2 text-gray-500" />
                      <h3 className="font-medium">Backend</h3>
                    </div>
                    {Array.isArray(project.backend) && project.backend.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.backend.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Não possui backend</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <RiDatabase2Line className="h-5 w-5 mr-2 text-gray-500" />
                      <h3 className="font-medium">Banco de dados</h3>
                    </div>
                    {Array.isArray(project.database) && project.database.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.database.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Não possui banco de dados</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <RiTestTubeLine className="h-5 w-5 mr-2 text-gray-500" />
                      <h3 className="font-medium">Testes</h3>
                    </div>
                    {Array.isArray(project.tests) && project.tests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.tests.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Não possui testes</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "calendar" && (
                <div className="h-[400px]">
                  <MyFullCalendar
                    id={project._id}
                    name={project.name}
                    start={pastDateProject}
                    end={afterDateProject}
                    color={project.color}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Ações</h2>
            </div>
            <div className="p-6 space-y-4">
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                onClick={handleEdit}
              >
                <RiEditLine className="h-4 w-4" />
                Editar projeto
              </button>

              {!showDeleteConfirm ? (
                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <RiDeleteBinLine className="h-4 w-4" />
                  Excluir projeto
                </button>
              ) : (
                <div className="border rounded-md p-4 space-y-4">
                  <p className="text-sm text-gray-700">
                    Tem certeza? Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto "
                    {project.name}".
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50 transition-colors text-sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                      onClick={handleDelete}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

