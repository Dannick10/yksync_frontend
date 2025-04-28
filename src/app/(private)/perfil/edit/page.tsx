"use client"

import { udpateProfile, Getprofile, resetMessage } from "@/redux/slices/userSlices"
import type { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RiEditLine, RiUser2Fill, RiArrowLeftLine } from "react-icons/ri"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import { reset } from "@/redux/slices/AuthSlices"

const perfilSchema = z
  .object({
    name: z
      .string()
      .min(3, "Precisa de no mínimo 3 caracteres")
      .refine((val) => val.trim().split(/\s+/).length > 1, {
        message: "Precisa de um nome completo",
      }),
    password: z.string().min(5, "Senha precisa ter no mínimo 5 caracteres").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof perfilSchema>

const EditPerfilPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { user, loading, error, message, sucess } = useSelector((state: RootState) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset: resetForm,
  } = useForm<FormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    dispatch(resetMessage())
    dispatch(reset())

    if (!user) {
      dispatch(Getprofile())
    } else {
      resetForm({
        name: user.name || "",
        password: "",
        confirmPassword: "",
      })
    }
  }, [dispatch, user, resetForm])

  const onSubmit = (data: FormData) => {
    const updateData = {
      name: data.name,
      ...(data.password
        ? {
            password: data.password,
            confirmPassword: data.confirmPassword,
          }
        : {}),
    }

    dispatch(udpateProfile(updateData as any))
  }

  if (loading && !user) {
    return <Loading />
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center">
            <button
              onClick={() => router.push("/perfil")}
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Voltar para perfil"
            >
              <RiArrowLeftLine className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Editar Perfil</h1>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <RiUser2Fill className="w-12 h-12" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                {user?.email && <p className="text-gray-500">{user.email}</p>}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Nome Completo
                </label>
                <input id="name" type="text" {...register("name")} className="w-full border px-3 py-2 rounded" />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-1">
                  Nova Senha
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Deixe em branco para manter a senha atual"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-medium mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Confirme a nova senha"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

              {message && <div className="p-3 bg-green-100 text-green-700 rounded">{message}</div>}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/perfil")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <RiEditLine className="w-4 h-4" />
                  )}
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditPerfilPage
