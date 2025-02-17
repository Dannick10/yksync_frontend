"use client";

import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

type navItems = {
  text: string;
  url: string;
};

const Header = (props: Props) => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const publicNavItems: navItems[] = [
    {
      text: "entrar",
      url: "/signin",
    },
    {
      text: "cie uma conta",
      url: "/register",
    },
  ];

  const privateNavItems: navItems[] = [
    {
      text: "adicionar um projeto",
      url: "/signin",
    },
    {
      text: "meus projetos",
      url: "/register",
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-10 py-7 bg-black">
        <Link href="/">
          <span className="text-2xl ">YKSYNCK</span>
        </Link>

        <ul className="hidden md:flex gap-10">
          {user && (
            <>
              {publicNavItems.map((items) => (
                <>
                  <Link href={items.url} key={items.url}>
                    <li className="btn ">{items.text}</li>
                  </Link>
                </>
              ))}
            </>
          )}

          {!user && (
            <>
              {privateNavItems.map((items) => (
                <>
                  <Link href={items.url} key={items.url}>
                    <li className="btn ">{items.text}</li>
                  </Link>
                </>
              ))}
            </>
          )}
        </ul>
        <Button items={publicNavItems} />
      </header>
    </>
  );
};

export default Header;
