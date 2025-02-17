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

  const hanldeChangeButton = () => {
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

    return () => resizeClose();
  }, []);

  return (
    <>
      <div
        className="flex md:hidden z-40 flex-col  gap-2 cursor-pointer relative"
        onClick={hanldeChangeButton}
      >
        
        <span
          className={`w-[45px] h-1  bg-white transition-all ${
              isOpen && `rotate-45 translate-y-5`
            }`}
        ></span>
        <span
          className={`w-[45px] h-1 bg-white transition-all ${
              isOpen && "hidden"
            }`}
        ></span>
        <span
          className={`w-[45px] h-1 bg-white transition-all ${
              isOpen && `-rotate-45 translate-y-2`
            }`}
        ></span>
      </div>

      {isOpen && (
        <>
          <span
            className="w-full h-full top-0 left-0 fixed "
            onClick={hanldeChangeButton}
          ></span>
          <div className="fixed top-0 right-0 z-10 w-3/5 h-full bg-green-950">
            <ul className="gap-4 flex flex-col text-white py-16 items-center">
              {NavItems.map((items, index) => (
                <Link
                  className="w-full"
                  href={items.url}
                  key={index}
                  onClick={hanldeChangeButton}
                >
                  <li className="relative border-b-2 border-gray-500 w-full py-2  text-center hover:text-green-100 group text-xl text-white font-medium">
                    {items.text}
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
