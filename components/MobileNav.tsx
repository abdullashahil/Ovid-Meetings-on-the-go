'use client'
import React from 'react'

import { sideBarLinks } from '@/constants'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px] '>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src='/icons/hamburger.svg' width={42} height={42} alt='Hamburger icon'
                        className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-color-1'>
                    <Link href='/sign-in' className='flex items-center  '>
                        <Image alt='logo' src='/icons/ovid-logo-2.svg'
                            width={32}
                            height={32}
                            className='max-sm:size-24'
                        /> 
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className=" flex h-full flex-col gap-6 pt-10 text-white">
                                {sideBarLinks.map((item) => {
                                    const isActive = pathname === item.route;

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn(
                                                    'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                                                    {
                                                        'bg-color-2': isActive,
                                                    }
                                                )}
                                            >
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className="font-semibold">{item.label}</p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav