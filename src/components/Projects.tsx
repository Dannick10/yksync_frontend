"use client"

import { RiCalendarLine, RiTimeLine, RiUser3Line, RiArrowRightLine } from "react-icons/ri"
import Link from "next/link"
import { configureTIme } from "@/utils/configureTime"
import { motion } from "framer-motion"

interface ProjectCardProps {
  id: string
  title: string
  answerable: string
  description: string
  timeStart: string
  timeEnd: string
  color?: string
  status?: string
}

export default function ProjectCard({
  id,
  title,
  answerable,
  description,
  timeStart,
  timeEnd,
  color = "#6366f1",
  status = "current",
}: ProjectCardProps) {
  const startDate = new Date(timeStart)
  const endDate = new Date(timeEnd)
  const currentDate = new Date()
  const timeResult: any = configureTIme(startDate, endDate)

  const isOverdue = endDate < currentDate && status === "current"

  const formattedStartDate = startDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })

  const formattedEndDate = endDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })


  const getStatusInfo = () => {
    if (status === "finish") {
      return {
        text: "Concluído",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        icon: "✓",
      }
    } else if (isOverdue) {
      return {
        text: "Atrasado",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        icon: "!",
      }
    } else {
      return {
        text: "Em andamento",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        icon: "→",
      }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Link href={`/projects/${id}`} className="block h-full">
      <motion.div
        className="h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md group"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Header with color and title */}
        <div className="relative">
          <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: color }} />
          <div className="pt-4 px-5 pb-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-gray-800 pr-3 truncate group-hover:text-black transition-colors">
                {title}
              </h3>
              <div
                className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
              >
                {statusInfo.text}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-3">
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">{description}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mx-5" />

        {/* Project details */}
        <div className="px-5 py-3 space-y-2.5">
          <div className="flex items-center text-sm">
            <RiUser3Line className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700 truncate">{answerable}</span>
          </div>

          <div className="flex items-center text-sm">
            <RiTimeLine className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{timeResult?.formatTime}</span>
          </div>

          <div className="flex items-center text-sm">
            <RiCalendarLine className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">
              {formattedStartDate} - {formattedEndDate}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-5 py-3 border-t border-gray-100 flex justify-between items-center`}>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: status === "finish" ? "#10B981" : isOverdue ? "#EF4444" : color }}
          />
          <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-black transition-colors">
            Ver detalhes
            <RiArrowRightLine className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

