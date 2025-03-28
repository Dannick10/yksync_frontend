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
      <div className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 bg-white border rounded-lg min-w-40">
        <div className="h-2" style={{ backgroundColor: color }} />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg truncate">{title}</h3>
            {isOverdue && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 shrink-0">
                Atrasado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <RiUser2Fill className="h-3 w-3 mr-1" />
            <span className="truncate">{answerable}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <RiClockwiseLine className="h-3 w-3 mr-1" />
            <span>{timeResult?.formatTime}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <RiCalendarLine className="h-3 w-3 mr-1" />
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

