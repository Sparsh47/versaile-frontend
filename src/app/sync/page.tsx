"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import {MoonLoader} from "react-spinners";

export default function Page() {
    const { user, isSignedIn } = useUser();
    const hasSyncedRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (!user || !isSignedIn || hasSyncedRef.current) return;

        hasSyncedRef.current = true;

        const authProvider =
            user.externalAccounts?.[0]?.provider || "email";

        fetch("https://versaile-api-v1-0-0.onrender.com/api/v1/auth/sync-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkId: user.id,
                username: user.username,
                name: user.fullName,
                image: user.imageUrl,
                email: user.primaryEmailAddress?.emailAddress,
                authProvider: authProvider,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                router.push("/dashboard");
            })
            .catch((err) => {
                console.error("User sync error:", err);
            });
    }, [user, isSignedIn]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <MoonLoader color="#7752FE" size={50} speedMultiplier={1.5} />
        </div>
    );
}
