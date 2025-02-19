"use client";
import { reset, signUser } from "@/redux/slices/AuthSlices";

import React, { useEffect, useState } from "react";
import { RiUser2Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiMailAiFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { Getprofile } from "@/redux/slices/userSlices";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Precisa de no mínimo 3 caracteres")
      .refine((val) => val.trim().split(/\s+/).length > 1, {
        message: "Precisa de um nome completo",
      }),
    email: z.string().email("Adicione um email válido"),
    password: z.string().min(5, "Precisa de no mínimo 5 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof registerSchema>;

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleRegister: SubmitHandler<formData> = async (data) => {
    await dispatch(signUser(data));
  };

  return (
    <main className="flex justify-center py-4">
      <section className="w-[650px] p-4  text-black bg-zinc-900 rounded-2xl">
        <form
          method="post"
          className="bg-white rounded-2xl p-8"
          onSubmit={handleSubmit(handleRegister)}
        >
          <fieldset className="space-y-8">
            <legend className="text-xl font-semibold text-center">
              Começe organizar seus projetos
            </legend>

            <div className="flex flex-col py-4 px-20 gap-8  ">
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiUser2Fill />
                </span>
                <input
                  type="text"
                  className={`input flex-1 ${errors.name ? "border border-red-400" : ""}`}
                  placeholder="Nome completo"
                  autoComplete="off"
                  {...register("name")}
                />
              </label>
              {errors.name && <p className="msg">{errors.name.message}</p>}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiMailAiFill />
                </span>
                <input
                  type="text"
                  className={`input flex-1 ${errors.email ? "border border-red-400" : ""}`}
                  placeholder="Email"
                  autoComplete="off"
                  {...register("email")}
                />
              </label>
              {errors.email && <p className="msg">{errors.email.message}</p>}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  className={`input flex-1 ${errors.password ? "border border-red-400" : ""}`}
                  placeholder="Senha"
                  autoComplete="off"
                  {...register("password")}
                />
              </label>
              {errors.password && (
                <p className="msg">{errors.password.message}</p>
              )}

              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  className={`input flex-1 ${errors.confirmPassword ? "border border-red-400" : ""}`}
                  placeholder="Confirme a senha"
                  autoComplete="off"
                  {...register("confirmPassword")}
                />
              </label>
              {errors.confirmPassword && (
                <p className="msg">{errors.confirmPassword.message}</p>
              )}
              {!loading && (
                <input
                  type="submit"
                  className="btn bg-black text-white mx-10 cursor-pointer"
                  value="Entrar"
                />
              )}
              {loading && (
                <input
                  type="submit"
                  className="btn bg-black text-white mx-10 cursor-pointer bg-gray-950"
                  value="aguarde..."
                  disabled
                />
              )}
              {error && <p className="msg">{error}</p>}
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default page;
