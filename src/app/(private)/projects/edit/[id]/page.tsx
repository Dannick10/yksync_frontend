"use client";

import React, { use, useEffect, useState } from "react";
import {
  RiUser2Fill,
  RiLockPasswordFill,
  RiMailAiFill,
  RiProjector2Fill,
  RiTextWrap,
  RiDatabase2Fill,
  RiCalendar2Fill,
  RiStackFill,
  RiTestTubeFill,
  RiColorFilterAiFill,
  RiCalendar2Line,
  RiPlayFill,
  RiStopFill,
  RiLink,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createProject,
  getProject_Id,
  projectEdit,
  resetMessage,
  resetProject,
} from "@/redux/slices/ProjectSlices";
import { Getprofile } from "@/redux/slices/userSlices";
import { formData, projectSchema } from "../../schema/ProjectSchema";
import { StatusOptions, techBackendOptions, techDatabaseOptions, techFrontendOptions, techTestsOptions } from "../../schema/ProjectOptions";

const page = ({ params: asyncParams }: { params: Promise<{ id: string }> }) => {
  const params = use(asyncParams);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(projectSchema),
  });

  const selectedFrontendTechs = watch("frontend") || [];

  const selectedBackendTechs = watch("backend") || [];

  const selectedDatabaseOptions = watch("database") || [];

  const selectedTestsOptions = watch("tests") || [];

  const dispatch = useDispatch<AppDispatch>();

  const id = params?.id;

  useEffect(() => {
    dispatch(getProject_Id(id));
  }, []);

  const { user } = useSelector((state: RootState) => state.user);
  const { project, loading, error, message } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (project) {
      setValue("name", project?.name);
      setValue("answerable", project?.answerable);
      setValue("description", project?.description);
      setValue("color", project?.color);
      setValue("startDate", project?.startDate.split("T")[0]);
      setValue("endDate", project?.endDate.split("T")[0]);
      setValue("frontend", project?.frontend);
      setValue("backend", project?.backend);
      setValue("tests", project?.tests as any);
      setValue("linkDeploy", project?.linkDeploy);
      setValue("linkRepository", project?.linkRepository );
    }
  }, [project]);

  const router = useRouter();
  console.log({ message });

  const handleProject: SubmitHandler<formData> = (data: any) => {
    const project = {
      _id: id,
      ...data,
    };

    dispatch(projectEdit(project));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 800);

    router.push("/projects/" + id);
  };

  useEffect(() => {
    dispatch(Getprofile());
  }, []);

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  return (
    <main className="flex justify-center py-4">
      <section className="w-[650px] p-4 text-black bg-zinc-900 rounded-2xl">
        <form
          method="post"
          className="bg-white rounded-2xl p-8"
          onSubmit={handleSubmit(handleProject)}
        >
          <fieldset className="space-y-8">
            <legend className="text-xl font-semibold text-center">
              Adicionar um projeto
            </legend>

            <div className="flex flex-col py-4 px-20 gap-8">
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiProjector2Fill />
                </span>
                <input
                  type="text"
                  className={`input flex-1 ${errors.name ? "border border-red-400" : ""}`}
                  placeholder="Nome do projeto"
                  autoComplete="off"
                  {...register("name")}
                />
              </label>
              {errors.name && <p className="msg">{errors.name.message}</p>}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiTextWrap />
                </span>
                <textarea
                  className={`input flex-1 ${errors.description ? "border border-red-400" : ""}`}
                  placeholder="Uma descrição para o projeto"
                  autoComplete="off"
                  {...register("description")}
                />
              </label>
              {errors.description && (
                <p className="msg">{errors.description.message}</p>
              )}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiUser2Fill />
                </span>
                <input
                  type="text"
                  className={`input flex-1 ${errors.answerable ? "border border-red-400" : ""}`}
                  placeholder="Responsável"
                  autoComplete="off"
                  {...register("answerable", { value: user?.name })}
                />
              </label>
              {errors.answerable && (
                <p className="msg">{errors.answerable.message}</p>
              )}
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiColorFilterAiFill />
                </span>
                <input
                  type="color"
                  className={`input flex-1 ${errors.color ? "border border-red-400" : ""}`}
                  placeholder="Responsável"
                  autoComplete="off"
                  {...register("color", { value: user?.name })}
                />
              </label>
              {errors.color && <p className="msg">{errors.color.message}</p>}

              <legend className="font-semibold">status do projeto ?</legend>
              <div className="flex-1 w-full">
                <select
                  {...register("status")}
                  className="flex flex-wrap gap-4w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer flex-1 w-full"
                >
                  {StatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              {errors.status && <p className="msg">{errors.status.message}</p>}

              <legend className="font-semibold flex gap-2 items-center">
                <RiCalendar2Line />
                Selecione as datas do projeto
              </legend>
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiPlayFill />
                </span>
                <input
                  type="date"
                  className={`input flex-1 ${errors.startDate ? "border border-red-400" : ""}`}
                  placeholder="Data de início"
                  autoComplete="off"
                  {...register("startDate")}
                />
              </label>
              {errors.startDate && (
                <p className="msg">{errors.startDate.message}</p>
              )}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiStopFill />
                </span>
                <input
                  type="date"
                  className={`input flex-1 ${errors.endDate ? "border border-red-400" : ""}`}
                  placeholder="Data de término"
                  autoComplete="off"
                  {...register("endDate")}
                />
              </label>
              {errors.endDate && (
                <p className="msg">{errors.endDate.message}</p>
              )}

              <legend className="font-semibold flex gap-2 items-center">
                <RiStackFill />
                Selecione as tecnologias frontend
              </legend>
              <div className="flex flex-wrap gap-4">
                {techFrontendOptions.map((tech) => (
                  <label key={tech} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={tech}
                      {...register("frontend")}
                      checked={selectedFrontendTechs.includes(tech)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedFrontendTechs, tech]
                          : selectedFrontendTechs.filter((t) => t !== tech);
                        setValue("frontend", newValues);
                      }}
                    />
                    {tech}
                  </label>
                ))}
              </div>

              <legend className="font-semibold flex gap-2 items-center">
                <RiStackFill />
                Selecione as tecnologias backend
              </legend>
              <div className="flex flex-wrap gap-4">
                {techBackendOptions.map((tech) => (
                  <label key={tech} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={tech}
                      {...register("backend")}
                      checked={selectedBackendTechs.includes(tech)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedBackendTechs, tech]
                          : selectedBackendTechs.filter((t) => t !== tech);
                        setValue("backend", newValues);
                      }}
                    />
                    {tech}
                  </label>
                ))}
              </div>
              <legend className="font-semibold flex gap-2 items-center">
                <RiStackFill />
                Selecione as tecnologias backend
              </legend>
              <div className="flex flex-wrap gap-4">
                {techDatabaseOptions.map((tech) => (
                  <label key={tech} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={tech}
                      {...register("database")}
                      checked={selectedDatabaseOptions.includes(tech)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedDatabaseOptions, tech]
                          : selectedDatabaseOptions.filter((t) => t !== tech);
                        setValue("database", newValues);
                      }}
                    />
                    {tech}
                  </label>
                ))}
              </div>
              <legend className="font-semibold flex gap-2 items-center">
                <RiTestTubeFill />
                Selecione as tecnologias testes
              </legend>
              <div className="flex flex-wrap gap-4">
                {techTestsOptions.map((tech: any) => (
                  <label key={tech} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={tech}
                      {...register("tests")}
                      checked={selectedTestsOptions.includes(tech)}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedTestsOptions, tech]
                          : selectedTestsOptions.filter((t) => t !== tech);
                        setValue("tests", newValues);
                      }}
                    />
                    {tech}
                  </label>
                ))}
              </div>

              <legend className="font-semibold flex gap-2 items-center">
                <RiLink />
                Selecione os links (opcional)
              </legend>
              <label className="flex flex-wrap gap-4">
                <input
                  type="text"
                  className={`input flex-1 ${errors.linkDeploy ? "border border-red-400" : ""}`}
                  placeholder="deploy"
                  autoComplete="off"
                  {...register("linkDeploy")}
                />
              </label>
              {errors.linkDeploy && (
                <p className="msg">{errors.linkDeploy.message}</p>
              )}
              <label className="flex flex-wrap gap-4">
                <input
                  type="text"
                  className={`input flex-1 ${errors.linkRepository ? "border border-red-400" : ""}`}
                  placeholder="respostorio"
                  autoComplete="off"
                  {...register("linkRepository")}
                />
              </label>
              {errors.linkRepository && (
                <p className="msg">{errors.linkRepository.message}</p>
              )}
            </div>
            {!loading && (
              <input
                type="submit"
                className="btn bg-black text-white mx-10 cursor-pointer"
                value="Salvar"
              />
            )}
            {loading && (
              <input
                type="submit"
                className="btn text-white mx-10 cursor-pointer bg-gray-950"
                value="aguarde..."
                disabled
              />
            )}
            {error && <p className="msg">{error}</p>}
            {message && <p className="msg">{message}</p>}
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default page;
