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
      className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg group ${
        variant === "dark"
          ? "bg-gray-950 text-white border border-gray-800"
          : "bg-white text-gray-900 border border-gray-200"
      }`}
      whileHover={{ scale: 1.03 }}
    >

      <div className={`absolute bottom-0 opacity-75 left-0 w-0 h-1 ${variant === "dark" ? "bg-white" : "bg-black"} rounded-lg group-hover:w-full group-hover:opacity-100 transition-all duration-100 ease-linear`}></div>

      <div
        className={`px-6 py-4 font-semibold text-xl ${
          variant === "dark" ? "bg-black text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        {title}
      </div>


      <div className="p-6 space-y-4">
        {list.map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                variant === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <RiCheckLine className="w-5 h-5" />
            </span>
            <span className="text-lg">{item}</span>
          </motion.div>
        ))}
      </div>


      <div
        className={`h-1 w-full ${
          variant === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`}
      ></div>
    </motion.div>
  );
};

export default Cards;
