"use client";

import React, { useEffect, useState } from "react";
import { RiLockPasswordFill, RiMailAiFill, RiUser2Fill } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUser, reset } from "@/redux/slices/AuthSlices";

const loginSchema = z.object({
  email: z.string().email("Adicione um email válido"),
  password: z.string().min(5, "Precisa de no mínimo 5 caracteres"),
});

type formData = z.infer<typeof loginSchema>;

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(loginSchema),
  });

  const {loading, error} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();

  const loginSubmit: SubmitHandler<formData> = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);



  return (
    <main className="flex justify-center py-4">
      <section className="w-[650px] p-4  text-black bg-zinc-900 rounded-2xl">
        <form
          className="bg-white rounded-2xl p-8"
          onSubmit={handleSubmit(loginSubmit)}
        >
          <fieldset className="space-y-8">
            <legend className="text-xl font-semibold text-center">
              Entre com sua conta
            </legend>

            <div className="flex flex-col py-4 px-20 gap-8  ">
              <label className="flex justify-center items-center gap-2">
                <span className="text-2xl">
                  <RiMailAiFill />
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  className={`input flex-1 ${errors.email ? "border border-red-400" : ""}`}
                  placeholder="Email"
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
                  {...register("password")}
                />
              </label>
              {errors.password && (
                <p className="msg">{errors.password.message}</p>
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
