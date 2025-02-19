"use client";
import { parse, isBefore, isToday } from "date-fns";
import Projects from "@/components/Projects";
import { getProject } from "@/redux/slices/ProjectSlices";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Page = () => {
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);


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
            <p>Projetos</p>
            <Link href="/projects/add">
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
        <section className="flex flex-col justify-center gap-20 mt-4 px-4">
          <aside className="flex flex-col gap-8 overflow-x-auto">
            <h2>Em andamento</h2>
            <div className="flex flex-wrap gap-10">
              {projects.map((project) => (
                <Projects
                  key={project._id}
                  id={project._id}
                  title={project.name}
                  answerable={project.answerable}
                  description={project.description}
                  time={project.endDate}
                />
              ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
};

export default Page;
