"use client";

import { LogoutUser, reset } from "@/redux/slices/AuthSlices";
import { resetUser } from "@/redux/slices/userSlices";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Getprofile } from "@/redux/slices/userSlices";
import {
  RiUser2Fill,
  RiLogoutBoxRLine,
  RiEditLine,
  RiMailLine,
} from "react-icons/ri";
import Loading from "@/app/loading";
import Cookies from "js-cookie";

const PerfilPage = () => {
  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    dispatch(resetUser());
    router.push("/");
    window.location.reload()
  };

  useEffect(() => {
    if (!user) {
      dispatch(Getprofile());
    }
  }, [dispatch, user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Perfil</h1>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <RiUser2Fill className="w-12 h-12" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.email && (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-1">
                    <RiMailLine className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Ações</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => router.push("/perfil/edit")}
                  >
                    <RiEditLine className="w-4 h-4" />
                    Editar perfil
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxRLine className="w-4 h-4" />
                    Sair da conta
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PerfilPage;
