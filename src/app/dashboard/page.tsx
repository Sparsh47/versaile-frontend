"use client";

import {PlusCircledIcon} from "@radix-ui/react-icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import PreviewDocumentCard from "@/components/PreviewDocumentCard";

export default function Page() {

    const [recentDocuments, setRecentDocuments] = useState([])
    const {user, isSignedIn, isLoaded} = useUser();
    const router = useRouter();

    const handleCreate = async () => {
        const res = await fetch(
            // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/documents/createDocument/${user?.id}`,
            `https://versaile-api-v1-0-0.onrender.com/api/v1/documents/createDocument/${user?.id}`,
            { method: "POST" }
        );
        const { documentId } = await res.json();
        router.push(`/documents/${documentId}`);
    };

    useEffect(() => {
        if (!isLoaded || !user || !isSignedIn) return;

        const fetchDocuments = async () => {
            try {
                // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/documents/getAllDocuments/${user.id}`);
                const res = await fetch(`https://versaile-api-v1-0-0.onrender.com/api/v1/documents/getAllDocuments/${user.id}`);
                const data = await res.json();
                setRecentDocuments(data.documents);
            } catch (error) {
            }
        };

        fetchDocuments();

        const interval = setInterval(fetchDocuments, 10000);

        return () => clearInterval(interval);

    }, [user, isSignedIn, isLoaded]);

        return (
            <>
                <DashboardNavbar />
                <div className="w-full min-h-screen flex flex-col items-center">
                    <div className="w-full h-fit px-10 py-5 bg-stone-100 flex items-center justify-center">
                        <div className="w-full max-w-7xl flex flex-col gap-3">
                            <h2 className="text-lg font-medium">Start a new document</h2>
                            <div>
                                <DocumentCard onCreate={handleCreate} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-7xl py-5 px-4 sm:px-6 lg:px-0">
                        <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
                        {recentDocuments.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {recentDocuments.map((doc) => (
                                    <PreviewDocumentCard key={doc._id} document={doc} />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-[400px] flex items-center justify-center">
                                <p>No Documents Found!</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
    );
}

function DocumentCard({ onCreate }: { onCreate: () => void }) {
    return (
        <button
            onClick={onCreate}
            className="flex flex-col gap-2 w-full max-w-xs sm:max-w-none"
            style={{ maxWidth: '280px' }}
        >
            <div
                className="cursor-pointer group w-full bg-white border border-[rgba(0,0,0,0.15)] rounded-sm hover:border-blue-400 transition-all ease-in-out"
                style={{ aspectRatio: '4 / 5' }}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <PlusCircledIcon className="w-8 h-8 text-[rgba(0,0,0,0.15)] group-hover:text-blue-400 transition-all ease-in-out" />
                </div>
            </div>
            <p className="font-medium cursor-default select-none text-left">Blank Document</p>
        </button>
    );
}