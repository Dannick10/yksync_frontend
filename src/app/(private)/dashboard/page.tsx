"use client";

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
  RiCheckboxCircleLine,
  RiTimeLine,
  RiAlarmWarningLine,
  RiListCheck,
} from "react-icons/ri";

import Pagination from "@/components/pagination";
import Projects from "@/components/Projects";
import ChartComponent from "@/components/ChartComponent";
import TechStatistics from "@/components/StackStatistics";
import MyFullCalendar from "@/components/MyFullCalendar";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, meta, loading } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { projectTotal, projectsCurrent, projectsFinish, status } = useSelector(
    (state: RootState) => state.status
  );
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [indexMoth, SetIndexMoth] = useState(0);
  const [activeTab, setActiveTab] = useState("projects");
  const [filterOpen, setFilterOpen] = useState(false);

  const tabs = [
    { id: "projects", label: "Projetos", icon: RiLayoutGridLine },
    { id: "statistics", label: "Estatísticas", icon: RiBarChartLine },
    { id: "technologies", label: "Tecnologias", icon: RiCodeSSlashFill },
    { id: "callendar", label: "Calendário", icon: RiCalendarLine },
  ];

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    dispatch(Getprofile());
    dispatch(getStatus());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getProject(page));
    }
  }, [dispatch, user, page]);

  const currentDate = new Date();
  const overdueProjects =
    projectTotal?.filter(
      (project) =>
        new Date(project.endDate) < currentDate && project.status === "current"
    ).length || 0;

  const totalProjectsCount = status?.projectsTotal || 0;
  const activeProjectsCount = status?.projectsCurrents || 0;
  const finishedProjectsCount = status?.projectsFinish || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center w-full max-w-md">
            <div className="relative w-full">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar projeto"
                className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {meta && (
              <p className="text-sm text-gray-500">
                {meta.totalProjects > 0
                  ? `${meta.totalProjects} projetos`
                  : "Você ainda não tem projetos"}
              </p>
            )}
            <Link
              href="/projects/add"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <RiAddLine className="h-4 w-4" />
              Adicionar projeto
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {!projects || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-full max-w-md bg-white border rounded-lg shadow-sm p-10 flex flex-col items-center space-y-6">
              <RiCalendarLine className="h-16 w-16 text-gray-400" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  Comece a acompanhar seus projetos
                </h2>
                <p className="text-gray-500">
                  Adicione seu primeiro projeto para começar a gerenciar seu
                  trabalho
                </p>
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
                  {/* Project Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total de Projetos
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {totalProjectsCount}
                          </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full  flex items-center justify-center">
                          <RiListCheck className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Em Andamento</p>
                          <h3 className="text-2xl font-bold mt-1">
                            {activeProjectsCount}
                          </h3>
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
                          <h3 className="text-2xl font-bold mt-1">
                            {finishedProjectsCount}
                          </h3>
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
                          <h3 className="text-2xl font-bold mt-1">
                            {overdueProjects}
                          </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                          <RiAlarmWarningLine className="h-6 w-6 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects Grid */}
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="bg-gray-100 rounded-xl h-64 animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : (
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
                <motion.div
                  key="statistics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold mb-4">
                    Estatísticas de Projetos
                  </h2>
                  <div className="w-full flex justify-center">
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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
                  <h2 className="text-xl font-bold mb-4">
                    Calendário de Projetos
                  </h2>
                  <div className="h-[600px]">
                    {projectTotal && <MyFullCalendar projects={projectTotal} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
