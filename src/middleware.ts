import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
]);

const PUBLIC_PATHS = ["/", "/health"];

export default clerkMiddleware(async (auth, req) => {
    const { nextUrl } = req;
    const { pathname } = nextUrl;

    if (!PUBLIC_PATHS.includes(pathname)) {
        try {
            const healthRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/health`
            );
            if (!healthRes.ok) {
                const url = nextUrl.clone();
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
            const data = await healthRes.json();
            if (!data.ready) {
                const url = nextUrl.clone();
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
        } catch {
            const url = nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
