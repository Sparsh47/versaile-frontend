"use client";

import Link from "next/link";

export default function PreviewDocumentCard({document}: {document: {_id: string, data: string, userId: string[], documentTitle: string}}) {

    return (
        <Link href={`/documents/${document._id}`} className="flex flex-col gap-2">
            <div className="cursor-pointer group w-[180px] h-[230px] bg-white border-[1px] border-[rgba(0,0,0,0.15)] flex items-center justify-center rounded-sm hover:border-blue-400 duration-200 transition-all ease-in-out">
            </div>
            <p className="font-medium cursor-default select-none">{document.documentTitle}</p>
        </Link>
    )
}