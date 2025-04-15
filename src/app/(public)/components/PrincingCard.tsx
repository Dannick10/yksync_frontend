import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

type princingCardProps = {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  popular?: boolean;
  delay: number;
};

const PricingCard = ({
  title,
  subtitle,
  price,
  features,
  popular = false,
  delay = 0,
}: princingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`${
        popular
          ? "bg-zinc-950 text-white transform scale-105 -mt-2 shadow-xl"
          : "bg-white text-gray-900 border border-gray-100"
      } p-6 rounded-xl shadow-md relative flex flex-col justify-between`}
    >
      <div>
        {popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="inline-block px-3 py-1 bg-white text-gray-800 text-xs font-medium rounded-full">
              Mais Popular
            </span>
          </div>
        )}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className={popular ? "text-blue-100" : "text-gray-600"}>
            {subtitle}
          </p>
        </div>
        <div className="text-center mb-6">
          <p
            className={`text-sm uppercase font-medium ${popular ? "text-blue-100" : "text-zinc-900"}`}
          >
            INVESTIMENTO
          </p>
          <p className="text-2xl font-bold mt-1">{price}</p>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <FaCheck
                className={`h-5 w-5 mr-2 mt-0.5 ${popular ? "text-white" : "text-green-500"}`}
              />
              <span className={popular ? "text-blue-100" : "text-zinc-900"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <Link href="/contato">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block w-full px-6 py-3 font-medium rounded-full text-base shadow-md hover:shadow-lg transition-all ${
              popular
                ? "bg-white text-zinc-900 hover:bg-gray-100"
                : "bg-white text-zinc-900 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Solicitar orçamento
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;
