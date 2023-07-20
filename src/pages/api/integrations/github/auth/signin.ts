import type { NextApiRequest, NextApiResponse } from "next";

// This API function is the first url that gets hit during the GitHub OAuth proccess.
// Here we send the user to the unique Authorization URL.
export default async function signinHandler(req: NextApiRequest, res: NextApiResponse) {
    //
    // STEP 1 - Build unique GitHub Authorization Url
    //
    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const redirectUri = `${process.env.NEXT_PUBLIC_MY_APP_URL as string}/api/integrations/github/auth/callback`;
    const scopes = "repo";

    const githubAuthorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

    //
    // STEP 2 - Redirect to GitHub Authorization Url
    //
    return res.redirect(githubAuthorizationUrl);
}
