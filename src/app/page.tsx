"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import Game from "@/components/LoaderGame/Game";
import Home from "@/components/Home";

export default function Page() {
    const [backendReady, setBackendReady] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if(backendReady) {
            return;
        }
        async function checkBackend() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/health`);
                const json = await res.json();
                if (json.ready) {
                    setBackendReady(true);
                }
            } catch {
            }
        }

        checkBackend();

        intervalId = setInterval(checkBackend, 10_000);

        return () => {
            clearInterval(intervalId);
        }
    }, [backendReady]);

    return (
        <>
            {show ? <Home /> : <Game isReady={backendReady} show={setShow} />}
        </>
    );
}
