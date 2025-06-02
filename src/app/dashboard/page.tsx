"use client";

import {PlusCircledIcon} from "@radix-ui/react-icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import Link from "next/link";
import { v4 as uuidV4 } from "uuid";
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/documents/createDocument/${user?.id}`,
            { method: "POST" }
        );
        const { documentId } = await res.json();
        router.push(`/documents/${documentId}`);
    };

    useEffect(() => {
        if (!isLoaded || !user || !isSignedIn) return;

        const fetchDocuments = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/documents/getAllDocuments/${user.id}`);
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
                    <div className="w-full max-w-7xl py-5 px-10 xl:px-0">
                        <h3 className="text-lg font-medium">Recent Documents</h3>
                        {recentDocuments.length > 0 ? <div className="w-full flex flex-col">
                            <div className="w-full max-w-7xl flex items-center gap-8 flex-wrap">
                                {recentDocuments.map((doc) => (
                                    <PreviewDocumentCard key={doc._id} document={doc} />
                                ))}
                            </div>
                        </div> : <div className="w-full h-[400px] flex items-center justify-center">
                            <p>No Documents Found!</p>
                        </div>}
                    </div>
                </div>
            </>
    );
}

function DocumentCard({onCreate}: {onCreate: ()=>void}) {
    return (
        <button onClick={onCreate} className="flex flex-col gap-2">
            <div className="cursor-pointer group w-[180px] h-[230px] bg-white border-[1px] border-[rgba(0,0,0,0.15)] flex items-center justify-center rounded-sm hover:border-blue-400 duration-200 transition-all ease-in-out">
                <PlusCircledIcon className="w-8 h-8 text-[rgba(0,0,0,0.15)] group-hover:text-blue-400 duration-200 transition-all ease-in-out" />
            </div>
            <p className="font-medium cursor-default select-none">Blank Document</p>
        </button>
    )
}