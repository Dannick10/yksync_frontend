"use client"

import { Getprofile } from '@/redux/slices/userSlices'
import { AppDispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  useEffect(() => {
      if (token && !user) {
          dispatch(Getprofile());
      }
  }, [token, user, dispatch]);


  useEffect(() => {
      if (user) {
          router.push('/dashboard');
      }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl overflow-hidden">
      {children}
      </div>
    </div>
  )
}

export default Layout