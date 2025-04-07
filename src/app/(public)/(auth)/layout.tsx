"use client"

import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface LayoutProps {
    children: React.ReactNode
}

const layout = ({children}: LayoutProps) => {

  const {token } = useSelector((state: RootState) => state.auth)

  const router = useRouter()

  useEffect(() => {
    if(token) {
      router.push('/dashboard')
    }

  },[token, router])

  return (
    <div className="flex justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl overflow-hidden">
      {children}
      </div>
    </div>
  )
}

export default layout