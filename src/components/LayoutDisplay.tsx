import { motion } from "framer-motion"
import { JSX } from "react";

type layoutDisplayProps = {
    key: string,
    children: JSX.Element
}

const LayoutDisplay = ({key,children}: layoutDisplayProps) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white border rounded-xl shadow-sm p-6"
    >   {children}
    </motion.div>
  );
};

export default LayoutDisplay;
