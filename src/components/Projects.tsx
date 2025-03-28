import { RiCalendarLine, RiClockwiseLine, RiUser2Fill } from "react-icons/ri"
import Link from "next/link"
import { configureTIme } from "@/utils/configureTime"

interface ProjectCardProps {
  id: string
  title: string
  answerable: string
  description: string
  timeStart: string
  timeEnd: string
  color?: string
}

export default function ProjectCard({
  id,
  title,
  answerable,
  description,
  timeStart,
  timeEnd,
  color = "#6366f1",
}: ProjectCardProps) {
  const startDate = new Date(timeStart)
  const endDate = new Date(timeEnd)
  const timeResult: any = configureTIme(startDate, endDate)

  const isOverdue = endDate < new Date() && timeResult?.days && timeResult.days < 0

  return (
    <Link href={`/projects/${id}`}>
      <div className="relative h-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border-gray-300 bg-white border rounded-lg min-w-40">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: color }} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl text-gray-800 truncate">{title}</h3>
            {isOverdue && (
              <span className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 uppercase tracking-wide">
                Atrasado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-3 mb-5">{description}</p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <RiUser2Fill className="h-4 w-4 mr-2 text-gray-500" />
            <span className="truncate">{answerable}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <RiClockwiseLine className="h-4 w-4 mr-2 text-gray-500" />
            <span>{timeResult?.formatTime}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <RiCalendarLine className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              {startDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
              {" - "}
              {endDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
  
}

