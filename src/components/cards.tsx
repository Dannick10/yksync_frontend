"use client"

import { RiCheckLine } from "react-icons/ri"
import { motion } from "framer-motion"

type CardsProps = {
  title: string
  list: string[]
  variant?: "light" | "dark"
}

const Cards = ({ title, list, variant = "light" }: CardsProps) => {
  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl ${
        variant === "dark" ? "bg-black text-white" : "bg-white border border-gray-200"
      }`}
    >
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <ul className="space-y-4">
          {list.map((item, index) => (
            <motion.li
              key={item}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 mt-0.5 rounded-full flex-shrink-0 ${
                  variant === "dark" ? "bg-white bg-opacity-20" : "bg-black bg-opacity-10"
                }`}
              >
                <RiCheckLine className="h-4 w-4" />
              </span>
              <span className="text-base">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className={`h-1 w-full ${variant === "dark" ? "bg-white bg-opacity-20" : "bg-black bg-opacity-10"}`}></div>
    </div>
  )
}

export default Cards

