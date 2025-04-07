import Link from 'next/link'
import React from 'react'
import { motion} from "framer-motion"
import { RiCheckboxCircleLine, RiTimerLine } from 'react-icons/ri'

const StatsSection = () => {
  return (
         <section className="py-10">
         <div className="container mx-auto px-4">
           <motion.div
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
           >
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Números que impressionam
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Veja o impacto que o Yksynk tem na produtividade de nossos
               usuários
             </p>
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               {
                 number: "10k+",
                 label: "Usuários ativos",
                 icon: (
                   <RiCheckboxCircleLine className="h-8 w-8 text-green-500" />
                 ),
               },
               {
                 number: "50k+",
                 label: "Projetos gerenciados",
                 icon: <RiTimerLine className="h-8 w-8 text-blue-500" />,
               },
               {
                 number: "98%",
                 label: "Satisfação dos clientes",
                 icon: (
                   <RiCheckboxCircleLine className="h-8 w-8 text-purple-500" />
                 ),
               },
               {
                 number: "24/7",
                 label: "Suporte disponível",
                 icon: <RiTimerLine className="h-8 w-8 text-indigo-500" />,
               },
             ].map((stat, index) => (
               <motion.div
                 key={index}
                 className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 whileHover={{
                   y: -5,
                   boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                 }}
               >
                 <div className="flex justify-center mb-4">{stat.icon}</div>
                 <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                 <p className="text-gray-600">{stat.label}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
  )
}

export default StatsSection