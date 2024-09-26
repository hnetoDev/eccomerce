'use client'

import { SessionProvider } from 'next-auth/react'

const Provider = ({ children }:{children:React.ReactNode}) => {
  return <SessionProvider><div className='overflow-x-hidden w-full h-full'>{children}</div></SessionProvider>
}

export default Provider