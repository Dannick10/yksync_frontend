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
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium ${
                    activeTab === "projects"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <RiLayoutGridLine className="h-4 w-4" />
                  Projetos
                </button>
                <button
                  onClick={() => setActiveTab("statistics")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium ${
                    activeTab === "statistics"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <RiBarChartLine className="h-4 w-4" />
                  Estatísticas
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium ${
                    activeTab === "calendar"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <RiCalendarLine className="h-4 w-4" />
                  Calendário
                </button>
              </div>
            </div>

            {activeTab === "projects" && (
              <div className="space-y-6">
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
              </div>
            )}

            {activeTab === "statistics" && (
              <div className="bg-white border rounded-lg shadow-sm p-6">
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
              </div>
            )}

            {activeTab === "calendar" && (
              <div className="bg-white border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">
                  Calendário de Projetos
                </h2>
                <div className="h-[600px]">
                  {projectTotal && <MyFullCalendar projects={projectTotal} />}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
