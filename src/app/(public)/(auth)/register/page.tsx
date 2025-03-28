"use client";

import React, { useEffect } from "react";
import { RiUser2Fill, RiMailAiFill, RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signUser, reset } from "@/redux/slices/AuthSlices";
import Link from "next/link";

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

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(signUser(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
        <div className="bg-white rounded-2xl p-8">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-gray-500 text-sm">
              Comece a organizar seus projetos hoje mesmo
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome completo
              </label>
              <div className="flex items-center border rounded-md pl-3 focus-within:ring-2 focus-within:ring-black focus-within:border-black">
                <RiUser2Fill className="h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="flex-1 px-3 py-2 border-0 focus:outline-none"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="flex items-center border rounded-md pl-3 focus-within:ring-2 focus-within:ring-black focus-within:border-black">
                <RiMailAiFill className="h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-3 py-2 border-0 focus:outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <div className="flex items-center border rounded-md pl-3 focus-within:ring-2 focus-within:ring-black focus-within:border-black">
                <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  className="flex-1 px-3 py-2 border-0 focus:outline-none"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirme a senha
              </label>
              <div className="flex items-center border rounded-md pl-3 focus-within:ring-2 focus-within:ring-black focus-within:border-black">
                <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  className="flex-1 px-3 py-2 border-0 focus:outline-none"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Aguarde..." : "Criar conta"}
            </button>
            
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/signin" className="text-black font-medium hover:underline">
                Entrar
              </Link>
            </div>
          </form>
        </div>
  );
}
