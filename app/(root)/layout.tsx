// 'use client'
import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, {ReactNode} from 'react'

export const metadata: Metadata = {
  title: "Ovid",
  description: "Meetings on the go",
  icons: {
    icon: '/icons/logo.svg'
  }
};


const RootLayout = ({children} : {children : ReactNode}) => {

  return (
    <main>
        <StreamVideoProvider >
        {children}
        </StreamVideoProvider >

    </main>
  )
}

export default RootLayout