"use client";

import {
  getProject_Id,
  projectDelete,
  resetProject,
} from "@/redux/slices/ProjectSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { configureTIme } from "@/utils/configureTime";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ptBR } from "date-fns/locale";
import clsx from "clsx";
import { resetMessage } from "@/redux/slices/userSlices";
import MyFullCalendar from "@/components/MyFullCalendar";

const page = ({ params: asyncParams }: { params: Promise<{ id: string }> }) => {
  const params = use(asyncParams);

  const { project, loading, error, message } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch<AppDispatch>();
  const id: any = params?.id;

  useEffect(() => {
    if (id) {
      dispatch(getProject_Id(id));
    }
  }, [dispatch, id]);

  const router = useRouter();

  const handleEdit = () => {
    router.push("/projects/edit/" + project?._id);
  };

  const handleDelete = () => {
    dispatch(projectDelete(id));

    setTimeout(() => {
      dispatch(resetMessage());
      dispatch(resetProject());
      router.push("/dashboard");
    }, 800);
  };

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const pastDateProject = new Date(project?.startDate as string);
  const afterDateProject = new Date(project?.endDate as string);

  const startDate =
    project && project?.startDate
      ? format(new Date(project.startDate), "dd/MM/yyyy HH:mm", {
          locale: ptBR,
        })
      : "Data de início não disponível";

  const endDate =
    project && project?.endDate
      ? format(new Date(project.endDate), "dd/MM/yyyy HH:mm", { locale: ptBR })
      : "Data de término não disponível";

  const timeresult =
    project && configureTIme(pastDateProject, afterDateProject);

  return (
    <main className="px-2 flex flex-col justify-center items-center gap-10">
      <section className="w-[650px] p-4 text-black bg-zinc-900 rounded-2xl relative">
        <span
          className={clsx(
            "w-4 h-8 top-10 left-10 border absolute rounded-full"
          )}
          style={{ background: timeresult?.colorStatus }}
        ></span>

        <div className="bg-white rounded-2xl p-8">
          <header className="text-center space-y-2">
            <h2 className="font-extrabold text-2xl">{project?.name}</h2>
            <p className="font-medium">{timeresult?.formatTime}</p>
          </header>
          <aside className="space-y-8 border-b-2 py-4">
            <div className="space-y-2">
              <h2 className="font-semibold italic text-xl">Reponsavel</h2>
              <p>{project?.answerable}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold italic text-xl">Sobre</h2>
              <p>{project?.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold italic text-xl">Datas</h2>
              <div className="flex justify-between px-2">
                <p>
                  <span className="font-medium">inicio</span> {startDate}
                </p>
                <p>
                  <span className="font-medium">fim</span> {endDate}
                </p>
              </div>
              <div className="h-80">
                {project && (
                  <MyFullCalendar
                    name={project?.name}
                    start={pastDateProject}
                    end={afterDateProject}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold italic text-xl">Deploy</h2>
              <p>{project?.deploy}</p>
            </div>

            <div className="space-y-5">
              <h2 className="font-semibold italic text-xl">Tecnologias</h2>

              <h3 className="text-lg font-semibold">front-end</h3>
              <div className="flex gap-2">
                {Array.isArray(project?.frontend) &&
                project.frontend.length > 0 ? (
                  project?.frontend.map((stack) => (
                    <span
                      className="bg-black p-2 px-6 rounded-lg text-white"
                      key={stack}
                    >
                      {stack}
                    </span>
                  ))
                ) : (
                  <p className="font-bold text-gray-900">
                    Não possue front-end
                  </p>
                )}
              </div>

              <h3 className="text-lg font-semibold">back-end</h3>
              <div className="flex gap-2">
                {Array.isArray(project?.backend) &&
                project.backend.length > 0 ? (
                  project?.backend.map((stack) => (
                    <span
                      className="bg-black p-2 px-6 rounded-lg text-white"
                      key={stack}
                    >
                      {stack}
                    </span>
                  ))
                ) : (
                  <p className="font-bold text-gray-900">Não possue backend</p>
                )}
              </div>

              <h3 className="text-lg font-semibold">database</h3>
              <div className="flex gap-2">
                {Array.isArray(project?.database) &&
                project.database.length > 0 ? (
                  project?.database.map((stack) => (
                    <span
                      className="bg-black p-2 px-6 rounded-lg text-white"
                      key={stack}
                    >
                      {stack}
                    </span>
                  ))
                ) : (
                  <p className="font-bold text-gray-900">
                    Não possue banco de dados
                  </p>
                )}
              </div>

              <h3 className="text-lg font-semibold">tests</h3>
              <div className="flex gap-2">
                {Array.isArray(project?.tests) && project.tests.length > 0 ? (
                  project?.tests.map((stack) => (
                    <span
                      className="bg-black p-2 px-6 rounded-lg text-white"
                      key={stack}
                    >
                      {stack}
                    </span>
                  ))
                ) : (
                  <p className="font-bold text-gray-900">Não possue testes</p>
                )}
              </div>
            </div>
          </aside>
          <article className="flex my-4 gap-5">
            <button
              className="btn bg-green-600 text-white"
              onClick={handleEdit}
            >
              Finalizar projeto
            </button>
            <button
              className="btn bg-red-600 text-white"
              onClick={handleDelete}
            >
              Excluir projeto
            </button>
            <button className="btn bg-black text-white" onClick={handleEdit}>
              Editar
            </button>
          </article>
          {error && <p className="msg">{error}</p>}
          {message && <p className="msg">{message}</p>}
        </div>
      </section>
    </main>
  );
};

export default page;
