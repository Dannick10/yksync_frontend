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
} from "react-icons/ri";

import Pagination from "@/components/pagination";
import Projects from "@/components/Projects";
import ChartComponent from "@/components/ChartComponent";
import MyFullCalendar from "@/components/MyFullCalendar";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, meta, loading } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { projectTotal, projectsCurrent, projectsFinish } = useSelector(
    (state: RootState) => state.status
  );
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [indexMoth, SetIndexMoth] = useState(0);
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { id: "projects", label: "Projetos", icon: RiLayoutGridLine },
    { id: "statistics", label: "Estatísticas", icon: RiBarChartLine },
    { id: "callendar", label: "Calendário", icon: RiCalendarLine },
  ];

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleIndexMothChange = (number: number) => {
    SetIndexMoth(number);
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
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
                href="/projects/add"
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
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex items-center gap-2 px-4 py-2 font-medium text-gray-500 hover:text-gray-700"
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

            <AnimatePresence>
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
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
                      />
                    ))}
                  </div>

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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold mb-4">
                    Estatísticas de Projetos
                  </h2>
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

              {activeTab === "callendar" && (
                <motion.div
                  key="callendar"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border rounded-lg shadow-sm p-6"
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
