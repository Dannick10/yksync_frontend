"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ButtonHamburguerProps = {
  items: {
    text: string
    url: string
  }[]
}

const ButtonHamburguer = ({ items: NavItems }: ButtonHamburguerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleChangeButton = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  }

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  return (
    <>
      <button
        className="flex md:hidden z-40 flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        onClick={handleChangeButton}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-[6px] items-center justify-center">
          <span
            className={`w-[24px] h-[2px] bg-white rounded-full transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          ></span>
          <span
            className={`w-[24px] h-[2px] bg-white rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : ""
            }`}
          ></span>
          <span
            className={`w-[24px] h-[2px] bg-white rounded-full transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          ></span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
              onClick={handleChangeButton}
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
            />

            <motion.div
              className="fixed top-0 right-0 z-30 w-4/5 sm:w-3/5 h-full bg-black/95 shadow-xl"
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-6">
                  <button
                    onClick={handleChangeButton}
                    className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
                    aria-label="Close menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto">
                  <ul className="flex flex-col text-white p-6 space-y-2">
                    {NavItems.map((item, index) => (
                      <motion.li
                        key={index}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={item.url}
                          onClick={handleChangeButton}
                          className="block py-3 px-4 border-b border-gray-800 hover:bg-gray-800 transition-all rounded-md group"
                        >
                          <span className="flex items-center">
                            <span className="w-0 h-[2px] bg-white group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                            {item.text}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="p-6 text-center text-gray-500 text-sm">© {new Date().getFullYear()} YKSYNCK</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ButtonHamburguer

