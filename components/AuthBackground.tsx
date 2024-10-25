"use client";

import { usePathname } from 'next/navigation';

export default function AuthBackground({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <div className={isAuthPage ? 'page-with-bg' : 'page-with-bg2'}>
      {children}
    </div>
  );
}
