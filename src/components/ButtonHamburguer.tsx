"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ButtonHamburguerProps = {
  items: {
    text: string;
    url: string;
  }[];
};

const ButtonHamburguer = ({ items: NavItems }: ButtonHamburguerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeButton = () => {
    setIsOpen(!isOpen);
  };

  const resizeClose = () => {
    addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    });
  };

  useEffect(() => {
    resizeClose();
    return () => removeEventListener("resize", resizeClose);
  }, []);

  const SubItems: { label: string; link: string }[] = [
    {
      label: "Sobre",
      link: "/sobre",
    },
    {
      label: "Recursos",
      link: "/recursos",
    },
    {
      label: "Serviços",
      link: "/services",
    },
    {
      label: "Contato",
      link: "/contato",
    },
  ];

  return (
    <>
      <div
        className="flex md:hidden z-40 flex-col gap-2 cursor-pointer relative bg-zinc-950"
        onClick={handleChangeButton}
      >
        <span
          className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        ></span>
        <span
          className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-[30px] h-[2px] bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        ></span>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={handleChangeButton}
          ></div>
          <div className="fixed top-0 right-0 z-30 w-4/5 sm:w-3/5 h-full bg-black shadow-lg">
            <div className="flex justify-end p-6">
              <button
                onClick={handleChangeButton}
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col text-white p-6 space-y-4">
              {NavItems.map((item, index) => (
                <Link
                  className="w-full"
                  href={item.url}
                  key={index}
                  onClick={handleChangeButton}
                >
                  <li className="py-3 px-4 border-b border-gray-800 hover:bg-gray-900 transition-colors rounded-md">
                    {item.text}
                  </li>
                </Link>
              ))}
            </ul>

            <ul className="flex flex-col text-white p-6 space-y-4">
              {SubItems.map((item, index) => (
                <Link className="w-full" href={item.link} key={index}>
                  <li className="py-3 px-4 border-b border-gray-500 hover:bg-gray-900 transition-colors rounded-md">
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default ButtonHamburguer;
