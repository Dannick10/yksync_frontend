"use client";

import { RiCheckLine } from "react-icons/ri";
import { motion } from "framer-motion";

type CardsProps = {
  title: string;
  list: string[];
  variant?: "light" | "dark";
};

const Cards = ({ title, list, variant = "light" }: CardsProps) => {
  return (
    <motion.div
      className={`flex flex-col h-full rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden ${
        variant === "dark"
          ? "bg-gray-950 text-white border border-gray-800"
          : "bg-white text-gray-900 border border-gray-200"
      }`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Card Header */}
      <div
        className={`px-6 py-5 font-semibold text-xl relative ${
          variant === "dark" ? "bg-black text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        {title}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-20"></div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-5 flex-grow">
        {list.map((item, index) => (
          <motion.div
            key={item}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-md mt-0.5 flex-shrink-0 ${
                variant === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <RiCheckLine className="w-4 h-4" />
            </span>
            <span className="text-base leading-tight">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Card Footer with animated line */}
      <div className="mt-auto relative h-1">
        <div className={`h-full w-full ${
          variant === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}></div>
        <div 
          className={`absolute bottom-0 left-0 w-0 h-full group-hover:w-full transition-all duration-300 ease-out ${
            variant === "dark" ? "bg-gray-500" : "bg-gray-400"
          }`}
        ></div>
      </div>
    </motion.div>
  );
};

export default Cards;
