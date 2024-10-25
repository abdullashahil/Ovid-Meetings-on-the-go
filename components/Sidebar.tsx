'use client'
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className="sticky left-10 top-28 flex h-fit w-fit flex-col  justify-between bg-theme-3 p-6  text-white max-sm:hidden lg:w-[270px] lg:mr-3 rounded-3xl">
            <div className="flex flex-1 flex-col gap-6">
                {sideBarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                                'flex gap-4 items-center p-4 rounded-lg justify-start text-gray-900',
                                {
                                    'bg-theme-2 text-white font-medium': isActive,
                                }
                            )}
                        >
                            <Image src={ isActive ? link.imgURL : link.imgURL2 } alt={link.label} width={24} height={24}/>
                            <p>{link.label}</p>
                        </Link>
                    )
                })}

            </div>
        </section>
    )
}

export default Sidebar