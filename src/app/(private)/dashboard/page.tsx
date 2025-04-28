"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { getProject } from "@/redux/slices/ProjectSlices";
import { Getprofile } from "@/redux/slices/userSlices";
import { getStatus } from "@/redux/slices/statusSlices";
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
  RiCloseLine,
  RiBookLine,
} from "react-icons/ri";

import Pagination from "@/components/pagination";
import Projects from "@/components/Projects";
import ChartComponent from "@/components/ChartComponent";
import TechStatistics from "@/components/StackStatistics";
import MyFullCalendar from "@/components/MyFullCalendar";
import { AnimatePresence, motion } from "framer-motion";
import DisplayCountProject from "@/components/DisplayCountProject";
import LayoutDisplay from "@/components/LayoutDisplay";
import Loading from "@/app/loading";


export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    projects,
    meta,
    loading: loadingProject,
    error: errorProject,
  } = useSelector((state: RootState) => state.project);
  const { user } = useSelector((state: RootState) => state.user);
  const { projectTotal, projectsCurrent, projectsFinish, status } = useSelector(
    (state: RootState) => state.status
  );

  const [searchQuery, setSearchQuery] = useState({
    name: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState({
    name: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [activeTab, setActiveTab] = useState("projects");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchQuery({
      name: "",
      status: "",
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (user) {
      dispatch(getProject({ page, filter: debouncedSearchQuery }));
    }
  }, [dispatch, user, page, debouncedSearchQuery]);

  const tabs = [
    { id: "projects", label: "Projetos", icon: RiLayoutGridLine },
    { id: "statistics", label: "Estatísticas", icon: RiBarChartLine },
    { id: "technologies", label: "Tecnologias", icon: RiCodeSSlashFill },
    { id: "callendar", label: "Calendário", icon: RiCalendarLine },
    { id: "resumo", label: "resumo", icon: RiBookLine },
  ];

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    dispatch(Getprofile());
    dispatch(getStatus());
  }, [dispatch]);

  if(!user) {
    return <Loading/>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-10">
      <main className="flex-1 container mx-auto px-4 py-8">
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
                {/* Project Controls */}
                <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl border mb-6">
                  <div className="flex w-full lg:w-auto items-center space-x-2 mb-2 lg:mb-0">
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
                          onClick={() =>
                            setSearchQuery((prev) => ({ ...prev, name: "" }))
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label="Limpar pesquisa"
                        >
                          <RiCloseLine className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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
                        dispatch(
                          getProject({ page, filter: debouncedSearchQuery })
                        );
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border bg-white hover:bg-gray-50"
                    >
                      <RiRefreshLine className="h-4 w-4" />
                      Atualizar
                    </button>
                    <Link
                      href="/projects/new"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border bg-white hover:bg-gray-50"
                    >
                      <RiAddLine className="h-4 w-4" />
                      Adicionar projeto
                    </Link>
                  </div>
                </div>

                {(debouncedSearchQuery.name ||
                  debouncedSearchQuery.status ||
                  debouncedSearchQuery.startDate ||
                  debouncedSearchQuery.endDate) && (
                  <div className="bg-gray-50 border rounded-xl p-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 mr-3">
                          Filtros ativos:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {debouncedSearchQuery.name && (
                            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                              <span>Nome: {debouncedSearchQuery.name}</span>
                              <button
                                onClick={() =>
                                  setSearchQuery((prev) => ({
                                    ...prev,
                                    name: "",
                                  }))
                                }
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
                                {debouncedSearchQuery.status === "current" &&
                                  "Em andamento"}
                                {debouncedSearchQuery.status === "finish" &&
                                  "Concluído"}
                                {debouncedSearchQuery.status === "overdue" &&
                                  "Atrasado"}
                              </span>
                              <button
                                onClick={() =>
                                  setSearchQuery((prev) => ({
                                    ...prev,
                                    status: "",
                                  }))
                                }
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <RiCloseLine className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          {debouncedSearchQuery.startDate && (
                            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                              <span>
                                Início após:{" "}
                                {new Date(
                                  debouncedSearchQuery.startDate
                                ).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() =>
                                  setSearchQuery((prev) => ({
                                    ...prev,
                                    startDate: "",
                                  }))
                                }
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <RiCloseLine className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          {debouncedSearchQuery.endDate && (
                            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 border">
                              <span>
                                Término até:{" "}
                                {new Date(
                                  debouncedSearchQuery.endDate
                                ).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() =>
                                  setSearchQuery((prev) => ({
                                    ...prev,
                                    endDate: "",
                                  }))
                                }
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <RiCloseLine className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleClearFilters}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Início
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={searchQuery.startDate}
                          onChange={handleChange}
                          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Término
                        </label>
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

                {/* Projects Grid */}
                {loadingProject && !errorProject ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-100 rounded-xl h-64 animate-pulse"
                      ></div>
                    ))}
                  </div>
                ) : projects.length > 0 ? (
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
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Nenhum projeto encontrado
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      {debouncedSearchQuery.name
                        ? `Não encontramos projetos com o termo "${debouncedSearchQuery.name}"`
                        : "Não há projetos para exibir com os filtros atuais"}
                    </p>
                    {!meta?.totalProjects && (
                      <Link href="/projects/new">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-3 bg-zinc-950 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto mt-6"
                        >
                        Adicionar projeto
                        </motion.button>
                      </Link>
                    )}
                  </div>
                )}

                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      page={page}
                      totalPages={meta.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "statistics" && (
              <LayoutDisplay key="statistics">
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
              </LayoutDisplay>
            )}

            {activeTab === "technologies" && (
              <LayoutDisplay key="technologies">
                <TechStatistics />
              </LayoutDisplay>
            )}

            {activeTab === "callendar" && (
              <LayoutDisplay key="callendar">
                <>
                  <h2 className="text-xl font-bold mb-4">
                    Calendário de Projetos
                  </h2>
                  <div className="h-[600px]">
                    {projectTotal && <MyFullCalendar projects={projectTotal} />}
                  </div>
                </>
              </LayoutDisplay>
            )}

            {activeTab === "resumo" && (
              <LayoutDisplay key="resumo">
                <>
                  <h2 className="text-xl font-bold mb-4">
                    Resumo dos Projetos
                  </h2>
                  <div className="h-auto">
                    <DisplayCountProject />
                  </div>
                </>
              </LayoutDisplay>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
