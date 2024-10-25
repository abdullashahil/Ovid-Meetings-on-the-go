import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
<nav className="flex-between fixed z-50 w-full px-6 py-5 lg:px-10 border-b border-gray-50 bg-white">
      <Link href='/sign-in' className='flex items-center'>
        <Image alt='logo' src='/icons/ovid-logo.svg'
          width={90}
          height={90}
          className='max-sm:size-18'
        />
      </Link>

      <div className='flex-between gap-5 lg:ml-3'>
        <SignedIn>
          <UserButton 
            appearance={{ 
              elements: { 
                userButtonAvatarBox: 'w-10 h-10'  
              } 
            }} 
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>

    
  )
}

export default Navbar
