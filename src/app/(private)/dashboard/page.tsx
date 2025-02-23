"use client";
import Projects from "@/components/Projects";
import { getProject } from "@/redux/slices/ProjectSlices";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginatio from "@/components/pagination";
import { Getprofile } from "@/redux/slices/userSlices";
import ChartComponent from "@/components/ChartComponent";
import { getStatus } from "@/redux/slices/statusSlices";
import MyFullCalendar from "@/components/MyFullCalendar";
import { statusProject } from "@/@types/statusTypes";

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
  const { status, projectTotal, projectsCurrent, projectsFinish } = useSelector(
    (state: RootState) => state.status
  );
  const [page, setPage] = useState(1);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    scroll(0, 0);
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
            {meta && meta!.totalProjects > 0 ? (
              <p>{meta?.totalProjects} projetos</p>
            ) : (
              <p>Você ainda não tem projetos</p>
            )}
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

      <main className="w-full  px-4 flex flex-col gap-8">
        {!projects && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-4xl">
              Para começar a acompanhar seus projetos
            </h1>
            <h2 className="font-medium text-xl">
              Adicione seu projeto na barra acima
            </h2>
            <Link href="/projects/add">
              <p className="btn">Tenha controle total dos seus projetos</p>
            </Link>
          </div>
        )}
        <section className="gap-10 w-full space-y-8">
          <aside className="">
            {projects && <h2 className="font-medium text-xl">Estatísticas</h2>}
            {projectsCurrent && projectsFinish && (
              <article className="h-80 flex">
                <ChartComponent
                  projectsCurrent={projectsCurrent}
                  projectsFinish={projectsFinish}
                />
              </article>
            )}
          </aside>

          <article className="h-[600px]">
            {projects && <h2 className="font-medium text-xl">Calendário</h2>}

            {projectTotal && <MyFullCalendar projects={projectTotal} />}
          </article>
        </section>

        <section className="flex flex-col gap-10 mt-10">
          {projects && <h2 className="font-medium text-xl">Projetos</h2>}

          <article className="grid grid-cols-3 justify-start gap-20 mb-4">
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
          </article>
        </section>

        {meta && (
          <Paginatio
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
