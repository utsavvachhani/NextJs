"use client"

import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/assent"
import { NAVBAR_LINKS, USER_MENU } from "@/constants/Navbar"
import { useState } from "react"

function Navbar() {
    const isUserLoggedIn = false;

    const user = {
        name: "John Doe",
        avatar: Logo,
    }

    const [open, setOpen] = useState(false)

    return (
        <nav className=" bg-black text-white">
            <div className="container mx-auto flex items-center justify-between py-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image src={Logo} alt="Fitnezz logo" width={40} height={40} priority />
                    <p className="font-bold text-lg">Fitnezz</p>
                </div>

                {/* Navbar Links */}
                <div className="flex gap-6">
                    {NAVBAR_LINKS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className="flex items-center gap-2 hover:text-yellow-400"
                        >
                            <item.icon fontSize="small" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Section */}
                <div className="relative">
                    {isUserLoggedIn ? (
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <Image
                                src={user.avatar}
                                alt="User avatar"
                                width={36}
                                height={36}
                                className="rounded-full"
                            />
                            <span>{user.name}</span>

                            {/* Dropdown */}
                            {open && (
                                <div className="absolute right-0 top-12 w-40 bg-white text-black rounded shadow-md">
                                    {USER_MENU.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/signin" className="btn btn-outline">
                                Sign In
                            </Link>
                            <Link href="/signup" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
