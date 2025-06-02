import Link from "next/link";

export default function PreviewDocumentCard({ document }: { document: { _id: string; documentTitle: string } }) {
    return (
        <Link
            href={`/documents/${document._id}`}
            className="flex flex-col gap-2 w-full max-w-xs sm:max-w-none"
            style={{ maxWidth: '280px' }}
        >
            <div
                className="cursor-pointer group w-full bg-white border border-[rgba(0,0,0,0.15)] rounded-sm hover:border-blue-400 transition-all ease-in-out"
                style={{ aspectRatio: '4 / 5' }}
            >
                {/* Optionally, you can add thumbnail or preview here */}
            </div>
            <p className="font-medium cursor-default select-none text-left">{document.documentTitle}</p>
        </Link>
    );
}