import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 text-center space-y-10">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de profissionais que já estão gerenciando seus
            projetos de forma eficiente.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Comece aqui
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
