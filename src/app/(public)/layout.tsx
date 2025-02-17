import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const layout = ({children}: LayoutProps) => {


  return (
    <div>{children}</div>
  )
}

export default layout