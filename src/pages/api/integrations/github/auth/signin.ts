import type { NextApiRequest, NextApiResponse } from "next";

export default async function signinHandler(req: NextApiRequest, res: NextApiResponse) {
    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const redirectUri = `${process.env.NEXT_PUBLIC_MY_APP_URL as string}/api/integrations/github/auth/callback`;
    const scopes = "repo";

    const githubAuthorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

    return res.redirect(githubAuthorizationUrl);
}
