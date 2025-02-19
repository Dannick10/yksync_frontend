"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Getprofile } from "@/redux/slices/userSlices";

type Props = {};

type navItems = {
  text: string;
  url: string;
};

const Header = (props: Props) => {

  const { user } = useSelector(
    (state: RootState) => state.user
  );

  const {token} = useSelector((state: RootState) => state.auth)


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
      text: "Dashboard",
      url: "/dashboard",
    },
    {
      text: "Perfil",
      url: "/perfil",
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-10 py-7 bg-black">
        <Link href="/">
          <span className="text-2xl ">YKSYNCK</span>
        </Link>

        <ul className="hidden md:flex gap-10">
          {!token  && (
            <>
              {publicNavItems.map((items, index) => (
                <Link href={items.url} key={index}>
                  <li className="btn ">{items.text}</li>
                </Link>
              ))}
            </>
          )}

          {token  && (
            <>
              {privateNavItems.map((items, index) => (
                <Link href={items.url} key={index}>
                  <li className="btn bg-transparent text-white ">
                    {items.text}
                  </li>
                </Link>
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
