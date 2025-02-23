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

const projectSchema = z.object({
  name: z.string().min(3, "Precisa de no mínimo 3 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  answerable: z
    .string()
    .min(3, "O responsável deve ter no mínimo 3 caracteres"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de início inválida",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de termino inválida",
  }),
  frontend: z.array(z.string().optional()),
  backend: z.array(z.string().optional()),
  database: z.array(z.string().optional()),
  tests: z.array(z.enum(["unit", "integration", "e2e"])).optional(),
  deploy: z
    .enum(["Vercel", "Netlify", "AWS", "DigitalOcean"])
    .default("Vercel"),
});

type formData = z.infer<typeof projectSchema>;

type projectProps = {
  params: { id: string };
};

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

  const techFrontendOptions: string[] = [
    "html",
    "css",
    "styles-components",
    "Next.js",
    "React",
    "TailwindCSS",
  ];
  const selectedFrontendTechs = watch("frontend") || [];
  const techBackendOptions: string[] = [
    "node",
    "java",
    "c#",
    "firebase",
    "python",
    "goLang",
  ];
  const selectedBackendTechs = watch("backend") || [];
  const techDatabaseOptions: string[] = [
    "mongodb",
    "mysql",
    "postgree",
    "mariaDb",
    "sqlLite",
    "firebase Database",
    "azure Database",
  ];
  const selectedDatabaseOptions = watch("database") || [];
  const techTestsOptions: string[] = ["unit", "integration", "e2e"];
  const selectedTestsOptions = watch("tests") || [];
  const DeployProjectOptions: string[] = [
    "Vercel",
    "Netlify",
    "AWS",
    "DigitalOcean",
  ];

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
      setValue("startDate", project?.startDate.split('T')[0]);
      setValue("endDate", project?.endDate.split('T')[0]);
      setValue("frontend", project?.frontend);
      setValue("backend", project?.backend);
      setValue("tests", project?.tests as any);
      setValue("deploy", project?.deploy as any);

    }
  }, [project]);

  const router = useRouter();
  console.log({message})

  const handleProject: SubmitHandler<formData> = (data: any) => {

    const project = {
      _id: id,
      ...data
    }
    
    dispatch(projectEdit(project));
    
    setTimeout(() => {
      dispatch(resetMessage());
    }, 800);

    router.push('/projects/' + id)
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
              editar projeto
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
                  <RiCalendar2Fill />
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
                  <RiCalendar2Fill />
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
              <legend className="font-semibold">
                onde foi realizado o deploy do projeto ?
              </legend>
              <div className="flex flex-wrap gap-4">
                <select {...register("deploy")}>
                  {DeployProjectOptions.map((deploy) => (
                    <option key={deploy} value={deploy}>
                      {deploy}
                    </option>
                  ))}
                </select>
              </div>
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
