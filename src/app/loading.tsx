import { RiLoader2Fill } from "react-icons/ri"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <RiLoader2Fill className="h-12 w-12 animate-spin text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900">Carregando...</h2>
        <p className="text-gray-600">Aguarde enquanto preparamos tudo para você</p>
      </div>
    </div>
  )
}
