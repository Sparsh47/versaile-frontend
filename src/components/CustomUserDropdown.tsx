"use client";

import { useUser, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function CustomUserDropdown() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <Image
                width={50}
                height={50}
                src={user?.imageUrl}
                alt="User avatar"
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded-t">Dashboard</Link>
                    <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">Manage account</Link>
                    <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
