import { motion } from "framer-motion"
import { JSX } from "react"
import { FaCheck } from "react-icons/fa"

type serviceCard = {
    icon: JSX.Element,
    title: string,
    description: string,
    delay: number
}

const ServiceCard = ({ icon, title, description, delay = 0 }: serviceCard) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
      >
        <div className="h-12 w-12 bg-blue-50 text-zinc-900 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-zinc-900">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="space-y-2">
          {["Design personalizado", "Otimização para SEO", "Responsivo para todos dispositivos"].map((feature, index) => (
            <li key={index} className="flex items-start">
              <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    )
  }

export default ServiceCard