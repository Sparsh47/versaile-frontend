"use client";

import { useUser, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';

export default function CustomUserDropdown() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);

    console.log("USER: ", user);

    return (
        <div className="relative">
            <img
                src={user?.imageUrl}
                alt="User avatar"
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                    <a href="/account" className="block px-4 py-2 hover:bg-gray-100">Manage account</a>
                    <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
