import { ClerkProvider,SignInButton,SignOutButton,UserButton} from '@clerk/nextjs'

import { Toaster } from "@/components/ui/toaster"

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ovid",
  description: "Meetings on the go",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider 
      appearance={{
        variables: {
           
        }
      }}>
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white `}
        >
          {children}
          <Toaster />
        </body>
    </html>
      </ClerkProvider>
  );
}
