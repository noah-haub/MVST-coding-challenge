import type { NextApiRequest, NextApiResponse } from "next";

import { cookieNames, urlPaths } from "@/utils/helpers";
import { deleteCookie } from "cookies-next";

// This API function signs out the current user by removing the auth cookie and redirects the user to the sign in page
export default async function signoutHandler(req: NextApiRequest, res: NextApiResponse) {
    deleteCookie(cookieNames.githubAccessToken, { req, res });

    return res.redirect(urlPaths.signin);
}
