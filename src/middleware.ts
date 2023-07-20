import { NextRequest, NextResponse } from "next/server";
import { cookieNames, urlPaths } from "./utils/helpers";
import { getMiddlewareCookie } from "./utils/cookies";

const publicRoutes = [urlPaths.signin];

export async function middleware(req: NextRequest, res: NextResponse) {
    const isPublicRoute = publicRoutes.some((route) => req.url.includes(route));

    if (!isPublicRoute && !req.url.includes("/api")) {
        //
        // Check if user is authed with GitHub
        //

        // Get accessToken from cookies
        const githubAccessTokenCookie = getMiddlewareCookie(req, cookieNames.githubAccessToken);

        if (!githubAccessTokenCookie) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_MY_APP_URL}${urlPaths.signin}`);
        } else {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

// Needed to fix some random NextJS bug for the current version
export const config = {
    matcher: ["/((?!_next|api/auth).*)(.+)"],
};
