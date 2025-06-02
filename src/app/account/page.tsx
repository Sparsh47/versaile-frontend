import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                Coming Soon...
            </h2>
            <Link href="/dashboard" className="px-8 py-3 rounded-md bg-blue-600 text-white uppercase font-semibold shadow-md hover:bg-blue-700 transition">
                Dashboard
            </Link>
        </div>
    );
}
