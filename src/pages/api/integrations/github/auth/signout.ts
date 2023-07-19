import type { NextApiRequest, NextApiResponse } from "next";

import { cookieNames, urlPaths } from "@/utils/helpers";
import { deleteCookie } from "cookies-next";

export default async function signoutHandler(req: NextApiRequest, res: NextApiResponse) {
    deleteCookie(cookieNames.githubAccessToken, { req, res });

    return res.redirect(urlPaths.signin);
}
