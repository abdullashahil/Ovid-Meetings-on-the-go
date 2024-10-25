import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import AuthBackground from '@/components/AuthBackground'; // Import your new component

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
    icon: '/icons/ovid-header.svg',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/ovid-logo.svg",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#23B582",
          colorNeutral: "#F6F6F6",
          colorBackground: "#121212",
          colorInputBackground: "#4C4C4C",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthBackground>{children}</AuthBackground>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
