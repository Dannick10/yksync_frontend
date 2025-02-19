"use client";

import { getProject_Id } from "@/redux/slices/ProjectSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type projectProps = {
  params: { project: string };
};

const page = ({ params }: projectProps) => {
  const { project, loading, error, message } = useSelector(
    (state: RootState) => state.project
  );
  const id = params.project;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProject_Id(id));
  }, []);

  return (
    <main className="px-2 flex flex-col justify-center items-center gap-10">
      <section className="flex flex-col items-center gap-4">
        <p className="text-xl">Responsavel {project?.answerable}</p>
        <h2 className="text-2xl font-bold">Projeto {project?.name}</h2>
        <aside className="flex gap-10">
          <div className=" flex bg-indigo-800 text-xl p-5  gap-3 rounded-md">
            <p>Backend:</p>
            <span className="text-indigo-100 font-extrabold">
              {project?.backend.length}
            </span>
          </div>
          <div className=" flex bg-indigo-800 text-xl p-5 gap-3  rounded-md">
            <p>Frontend:</p>
            <span className="text-indigo-100 font-extrabold">
              {project?.frontend.length}
            </span>
          </div>
          <div className=" flex bg-indigo-800 text-xl p-5  gap-3 rounded-md">
            <p> Database:</p>
            <span className="text-indigo-100 font-extrabold">
              {project?.database.length}
            </span>
          </div>
          <div className=" flex bg-indigo-800 text-xl p-5 gap-3  rounded-md">
            <p>tests:</p>
            <span className="text-indigo-100 font-extrabold">
              {project?.tests.length}
            </span>
          </div>
        </aside>
      </section>
      <section>
        <h2 className="font-bold ">
          Sobre o projeto:{" "}
          <span className="bg-indigo-800 text-indigo-100 p-5 rounded-lg">
            {project?.description}
          </span>
        </h2>
      </section>
    </main>
  );
};

export default page;
