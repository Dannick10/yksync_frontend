import { motion } from "framer-motion"
import { JSX } from "react"

type PrivacySectionProps = {
    icon: JSX.Element
    title: string
    content: JSX.Element
}

const PrivacySection = ({ icon, title, content }: PrivacySectionProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 text-zinc-900 p-3 rounded-full flex-shrink-0">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-zinc-900">{title}</h3>
            <div className="prose prose-lg max-w-none text-gray-700">{content}</div>
          </div>
        </div>
      </motion.div>
    )
  }

  export default PrivacySection