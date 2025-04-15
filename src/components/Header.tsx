"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import ButtonHamburguer from "./ButtonHamburguer"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { motion } from "framer-motion"
import Image from "next/image"

type Props = {}

type navItems = {
  text: string
  url: string
}

const Header = () => {
  const reduxToken = useSelector((state: RootState) => state.auth.token)
  const [clientToken, setClientToken] = useState<string | null>(null)

  useEffect(() => {
    setClientToken(reduxToken)
  }, [reduxToken])


  const publicNavItems: navItems[] = [
    {
      text: "Entrar",
      url: "/signin",
    },
    {
      text: "Crie uma conta",
      url: "/register",
    },
  ]

  const privateNavItems: navItems[] = [
    {
      text: "Dashboard",
      url: "/dashboard",
    },
    {
      text: "Perfil",
      url: "/perfil",
    },
  ]

  const navItems = clientToken ? privateNavItems : publicNavItems

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 bg-black`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-2xl font-bold text-white relative group">
          <div className="flex justify-center items-centergap-2">
            <div className="relative w-9 h-9">
          <Image src={'/ykLogo.webp'} fill className="object-cover" alt="logo" />
            </div>
          <span className="relative z-10">YKSYNCK</span>
          </div>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-white group-hover:w-full transition-all duration-300 z-0"></span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-2">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.url}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-all relative group block"
                >
                  <span className="relative z-10">{item.text}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white group-hover:w-4/5 transition-all duration-300 z-0"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <ButtonHamburguer items={navItems} />
      </div>
    </header>
  )
}

export default Header

