import Link from "next/link"
import { RiFile2Fill } from "react-icons/ri"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-md text-center">
        <RiFile2Fill className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
        <p className="text-gray-600 mb-6">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
