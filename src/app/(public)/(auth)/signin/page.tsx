"use client";

import React, { useEffect } from "react";
import { RiMailAiFill, RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUser, reset } from "@/redux/slices/AuthSlices";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Adicione um email válido"),
  password: z.string().min(5, "Precisa de no mínimo 5 caracteres"),
});

type FormData = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p className="text-gray-500 text-sm">Faça login para continuar</p>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-black">
                <RiMailAiFill className="text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 bg-transparent border-0 outline-none px-2"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-black">
                <RiLockPasswordFill className="text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  className="flex-1 bg-transparent border-0 outline-none px-2"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
  
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
                {error}
              </div>
            )}
  
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Aguarde..." : "Entrar"}
            </button>
  
            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-black font-medium hover:underline">
                Registre-se
              </Link>
            </div>
          </form>
        </div>
  );
  
}
