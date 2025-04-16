"use client"
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {

  return (
    <div>{children}</div>
  )
}

export default Layout