"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { getProject } from "@/redux/slices/ProjectSlices"
import { Getprofile } from "@/redux/slices/userSlices"
import { getStatus } from "@/redux/slices/statusSlices"
import {
  RiSearchLine,
  RiAddLine,
  RiCalendarLine,
  RiBarChartLine,
  RiLayoutGridLine,
  RiCodeSSlashFill,
  RiFilterLine,
  RiSortAlphabetAsc,
  RiRefreshLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiAlarmWarningLine,
  RiListCheck,
  RiCloseLine,
} from "react-icons/ri"

import Pagination from "@/components/pagination"
import Projects from "@/components/Projects"
import ChartComponent from "@/components/ChartComponent"
import TechStatistics from "@/components/StackStatistics"
import MyFullCalendar from "@/components/MyFullCalendar"
import { AnimatePresence, motion } from "framer-motion"

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { projects, meta, loading } = useSelector((state: RootState) => state.project)
  const { user } = useSelector((state: RootState) => state.user)
  const { projectTotal, projectsCurrent, projectsFinish, status } = useSelector((state: RootState) => state.status)

  const [searchQuery, setSearchQuery] = useState({
    name: "",
    status: "",
    startDate: "",
    endDate: "",
  })
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState({
    name: "",
    status: "",
    startDate: "",
    endDate: "",
  })
  const [activeTab, setActiveTab] = useState("projects")
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClearFilters = () => {
    setSearchQuery({
      name: "",
      status: "",
      startDate: "",
      endDate: "",
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (user) {
      dispatch(getProject({ page, filter: debouncedSearchQuery }))
    }
  }, [dispatch, user, page, debouncedSearchQuery])

  const tabs = [
    { id: "projects", label: "Projetos", icon: RiLayoutGridLine },
    { id: "statistics", label: "Estatísticas", icon: RiBarChartLine },
    { id: "technologies", label: "Tecnologias", icon: RiCodeSSlashFill },
    { id: "callendar", label: "Calendário", icon: RiCalendarLine },
  ]

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1)
  }

  useEffect(() => {
    dispatch(Getprofile())
    dispatch(getStatus())
  }, [dispatch])

 

  const totalProjectsCount = status?.projectsTotal || 0
  const activeProjectsCount = status?.projectsCurrents || 0
  const overdueProjectCont = status?.projectsOverdue || 0
  const finishedProjectsCount = status?.projectsFinish || 0

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center w-full max-w-md">

            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RiSearchLine className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Pesquisar projeto"
                className="w-full pl-9 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={searchQuery.name}
                onChange={handleChange}
              />
              {searchQuery.name && (
                <button
                  onClick={() => setSearchQuery((prev) => ({ ...prev, name: "" }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Limpar pesquisa"
                >
                  <RiCloseLine className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {meta && (
              <p className="text-sm text-gray-500">
                {meta.totalProjects > 0 ? `${meta.totalProjects} projetos` : "Você ainda não tem projetos"}
              </p>
            )}
            <Link
              href="/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <RiAddLine className="h-4 w-4" />
              Adicionar projeto
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {!projects && totalProjectsCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-full max-w-md bg-white border rounded-lg shadow-sm p-10 flex flex-col items-center space-y-6">
              <RiCalendarLine className="h-16 w-16 text-gray-400" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Comece a acompanhar seus projetos</h2>
                <p className="text-gray-500">Adicione seu primeiro projeto para começar a gerenciar seu trabalho</p>
              </div>
              <Link
                href="/projects/new"
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <RiAddLine className="h-4 w-4" />
                Adicionar projeto
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border-b">
              <div className="flex space-x-8 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex items-center gap-2 px-4 py-2 font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="active-tab"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total de Projetos</p>
                          <h3 className="text-2xl font-bold mt-1">{totalProjectsCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <RiListCheck className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Em Andamento</p>
                          <h3 className="text-2xl font-bold mt-1">{activeProjectsCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                          <RiTimeLine className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Concluídos</p>
                          <h3 className="text-2xl font-bold mt-1">{finishedProjectsCount}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                          <RiCheckboxCircleLine className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Atrasados</p>
                          <h3 className="text-2xl font-bold mt-1">{overdueProjectCont}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                          <RiAlarmWarningLine className="h-6 w-6 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Controls */}
                  <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border mb-6">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <h2 className="text-lg font-bold">Seus Projetos</h2>
                      {debouncedSearchQuery.name && (
                        <div className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                          Pesquisando: {debouncedSearchQuery.name}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border bg-white hover:bg-gray-50"
                      >
                        <RiFilterLine className="h-4 w-4" />
                        Filtrar
                      </button>

                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border bg-white hover:bg-gray-50">
                        <RiSortAlphabetAsc className="h-4 w-4" />
                        Ordenar
                      </button>

                      <button
                        onClick={() => {
                          dispatch(getProject({ page, filter: debouncedSearchQuery }))
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border bg-white hover:bg-gray-50"
                      >
                        <RiRefreshLine className="h-4 w-4" />
                        Atualizar
                      </button>
                    </div>
                  </div>

            
                  {(debouncedSearchQuery.name ||
                    debouncedSearchQuery.status ||
                    debouncedSearchQuery.startDate ||
                    debouncedSearchQuery.endDate) && (
                    <div className="bg-gray-50 border rounded-xl p-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 mr-3">Filtros ativos:</span>
                          <div className="flex flex-wrap gap-2">
                            {debouncedSearchQuery.name && (
                              <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                                <span>Nome: {debouncedSearchQuery.name}</span>
                                <button
                                  onClick={() => setSearchQuery((prev) => ({ ...prev, name: "" }))}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <RiCloseLine className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {debouncedSearchQuery.status && (
                              <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                                <span>
                                  Status: 
                                  {debouncedSearchQuery.status === "current" && "Em andamento"}
                                  {debouncedSearchQuery.status === "finish" && "Concluído"}
                                  {debouncedSearchQuery.status === "overdue" && "Atrasado"}
                                </span>
                                <button
                                  onClick={() => setSearchQuery((prev) => ({ ...prev, status: "" }))}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <RiCloseLine className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {debouncedSearchQuery.startDate && (
                              <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                                <span>
                                  Início após: {new Date(debouncedSearchQuery.startDate).toLocaleDateString()}
                                </span>
                                <button
                                  onClick={() => setSearchQuery((prev) => ({ ...prev, startDate: "" }))}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <RiCloseLine className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {debouncedSearchQuery.endDate && (
                              <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                                <span>Término até: {new Date(debouncedSearchQuery.endDate).toLocaleDateString()}</span>
                                <button
                                  onClick={() => setSearchQuery((prev) => ({ ...prev, endDate: "" }))}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <RiCloseLine className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <button onClick={handleClearFilters} className="text-sm text-gray-600 hover:text-gray-900">
                          Limpar todos
                        </button>
                      </div>
                    </div>
                  )}

                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white border rounded-xl p-4 mb-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="status"
                            value={searchQuery.status}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-black focus:border-black"
                          >
                            <option value="">Todos</option>
                            <option value="current">Em andamento</option>
                            <option value="finish">Concluídos</option>
                            <option value="overdue">Atrasados</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                          <input
                            type="date"
                            name="startDate"
                            value={searchQuery.startDate}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-black focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
                          <input
                            type="date"
                            name="endDate"
                            value={searchQuery.endDate}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-black focus:border-black"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={handleClearFilters}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                        >
                          Limpar filtros
                        </button>
                        <button
                          onClick={() => setFilterOpen(false)}
                          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium"
                        >
                          Aplicar filtros
                        </button>
                      </div>
                    </motion.div>
                  )}


                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
                      ))}
                    </div>
                  ) : projects && projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <Projects
                          key={project._id}
                          id={project._id}
                          title={project.name}
                          answerable={project.answerable}
                          description={project.description}
                          timeStart={project.startDate}
                          timeEnd={project.endDate}
                          color={project.color}
                          status={project.status}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <RiSearchLine className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum projeto encontrado</h3>
                      <p className="text-gray-500 max-w-md">
                        {debouncedSearchQuery.name
                          ? `Não encontramos projetos com o termo "${debouncedSearchQuery.name}"`
                          : "Não há projetos para exibir com os filtros atuais"}
                      </p>
                    </div>
                  )}

                  {meta && meta.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <Pagination page={page} totalPages={meta.totalPages} onPageChange={handlePageChange} />
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "statistics" && (
                <motion.div
                  key="statistics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-xl shadow-sm p-6"
                >
                  <div className="w-full h-[400px] flex justify-center">
                    {projectsCurrent && projectsFinish && (
                      <ChartComponent
                        projectsCurrent={projectsCurrent}
                        projectsFinish={projectsFinish}
                        indexMoth={0}
                        monthDisplayCount={6}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "technologies" && (
                <motion.div
                  key="technologies"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TechStatistics />
                </motion.div>
              )}

              {activeTab === "callendar" && (
                <motion.div
                  key="callendar"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold mb-4">Calendário de Projetos</h2>
                  <div className="h-[600px]">{projectTotal && <MyFullCalendar projects={projectTotal} />}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}
