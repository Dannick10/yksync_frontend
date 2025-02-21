"use client"

import { Getprofile } from '@/redux/slices/userSlices'
import { AppDispatch } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface LayoutProps {
    children: React.ReactNode
}

const layout = ({children}: LayoutProps) => {

  return (
    <div>{children}</div>
  )
}

export default layout