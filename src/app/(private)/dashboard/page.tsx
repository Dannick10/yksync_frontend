"use client";
import { parse, isBefore, isToday } from "date-fns";
import Projects from "@/components/Projects";
import { getProject } from "@/redux/slices/ProjectSlices";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/pagination";
import { Getprofile } from "@/redux/slices/userSlices";
import ChartComponent from "@/components/ChartComponent";
import { GrArticle } from "react-icons/gr";

interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, meta, loading, error } = useSelector(
    (state: RootState) => state.project
  );
  const { user } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    scroll(0, 0);
  };

  useEffect(() => {
    dispatch(Getprofile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getProject(page));
    }
  }, [dispatch, user, page]);

  return (
    <>
      <header className="w-full">
        <nav className="h-[115px] w-full flex justify-between px-4 items-center bg-white text-black font-medium">
          <div className="flex gap-4">
            <h2>Project</h2>
            <input
              type="text"
              className="input"
              placeholder="Pesquisar projeto"
              aria-label="Pesquisar projeto"
            />
          </div>
          <div className="flex items-center gap-4">
            <p>
              {meta && meta!.totalProjects > 0 ? (
                <p>{meta?.totalProjects} projetos</p>
              ) : (
                <p> voçê ainda não têm projetos</p>
              )}
            </p>
            <Link href={"/projects/add"}>
              <button
                className="btn bg-black text-white"
                aria-label="Adicionar projeto"
              >
                Adicionar projeto
              </button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="w-full">
        <section className="flex flex-col justify-center gap-10 mt-10 px-8 min-h-[400px]">
          {projects && <h2 className="font-medium text-xl">Estatisticas</h2>}

          {!projects && (
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1 className="font-bold text-4xl">
                Para começar acompanhar seus projetos
              </h1>
              <h2 className="font-medium text-xl">
                Adicione seu projeto na barra acima
              </h2>
              <Link href="/projects/add">
                <p className="btn">Tenha controle total aos seus projetos</p>
              </Link>
            </div>
          )}

          {projects && (
            <article className="h-80 flex">
              <ChartComponent projects={projects} />
            </article>
          )}

          <aside className="flex flex-col gap-10">
            {projects && <h2 className="font-medium text-xl">projetos</h2>}

            <div className="grid grid-cols-3 justify-start gap-20 mb-4">
              {projects &&
                projects.map((project) => (
                  <Projects
                    key={project._id}
                    id={project._id}
                    title={project.name}
                    answerable={project.answerable}
                    description={project.description}
                    timeStart={project.startDate}
                    timeEnd={project.endDate}
                  />
                ))}
            </div>
          </aside>
        </section>

        {meta && (
          <Pagination
            page={page}
            totalPages={meta?.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </>
  );
};

export default Page;
