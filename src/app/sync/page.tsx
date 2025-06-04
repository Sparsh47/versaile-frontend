"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function Page() {
    const { user, isSignedIn } = useUser();
    const hasStartedSyncRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!user || !isSignedIn || hasStartedSyncRef.current) return;
        hasStartedSyncRef.current = true;

        const syncUser = () => {
            const authProvider = user.externalAccounts?.[0]?.provider || "email";

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sync-user`, {
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
                .then(async (res) => {
                    if (res.ok) {
                        return res.json().then(() => ({ status: 200 }));
                    } else if (res.status === 409) {
                        return { status: 409 };
                    } else {
                        const text = await res.text();
                        throw new Error(`Sync failed: ${res.status} ${text}`);
                    }
                })
                .then((result) => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    router.push("/dashboard");
                })
                .catch((err) => {
                    console.error("User sync error, retrying in 10s:", err);
                });
        };

        syncUser();

        intervalRef.current = setInterval(syncUser, 10_000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [user, isSignedIn, router]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <MoonLoader color="#7752FE" size={50} speedMultiplier={1.5} />
        </div>
    );
}
