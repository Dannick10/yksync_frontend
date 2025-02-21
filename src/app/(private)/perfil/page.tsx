"use client";

import { LogoutUser, reset } from "@/redux/slices/AuthSlices";
import { resetUser } from "@/redux/slices/userSlices";
import { AppDispatch, RootState } from "@/redux/store";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Getprofile } from "@/redux/slices/userSlices";


const page = () => {
  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()


  const handleLoogout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    dispatch(resetUser())
    router.push('/')
  };

  useEffect(() => {
    if(!user) {
      dispatch(Getprofile())
    }
  },[])


  return (
    <main className="flex flex-col min-h-screen">
      <div>
        <p className="text-2xl font-bold">{user?.name}</p>
        <button className="btn">Editar</button>
        <button className="btn" onClick={handleLoogout}>
          Logout
        </button>
      </div>
    </main>
  );
};

export default page;
