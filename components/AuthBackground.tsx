"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthBackgroundProps {
  children: ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <div className={isAuthPage ? 'page-with-bg' : 'page-with-bg2'}>
      {children}
    </div>
  );
}
