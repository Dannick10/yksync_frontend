"use client";

import { LogoutUser, reset } from "@/redux/slices/AuthSlices";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

const page = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  useEffect(() => {
    if (!user) {
      redirect("/register");
    }
  }, [user]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div>
      <button className="btn" onClick={handleLogout}>
        Deslogar
      </button>
    </div>
  );
};

export default page;
