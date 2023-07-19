import type { NextApiRequest, NextApiResponse } from "next";
import { cookieNames, urlPaths } from "../../../../../utils/helpers";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { setCookie } from "cookies-next";

interface ApiRequest extends NextApiRequest {
    query: {
        code: string;
    };
}

export default async function callbackHandler(req: ApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (code) {
        try {
            //
            // STEP 1 - Exchange code for access token
            //
            const githubAccessTokenPostUrl = `https://github.com/login/oauth/access_token`;
            const accessTokenResponse = await axios.post(githubAccessTokenPostUrl, null, {
                headers: {
                    Accept: "application/json",
                },
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID as string,
                    client_secret: process.env.GITHUB_CLIENT_SECRET as string,
                    code: code,
                },
            });
            console.log(accessTokenResponse.data);
            const githubAccessToken = accessTokenResponse.data.access_token;

            //
            // STEP 2 - Set auth cookie
            //
            const ecryptedAccessToken = CryptoJS.AES.encrypt(githubAccessToken as string, process.env.ENCRYPTION_PASSPHRASE as string).toString();
            const domain = (process.env.NEXT_PUBLIC_MY_APP_URL as string).replace(/(^\w+:|^)\/\//, "");
            setCookie(cookieNames.githubAccessToken, ecryptedAccessToken, {
                req: req,
                res: res,
                domain: process.env.NODE_ENV !== "development" ? `.${domain}` : undefined,
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax",
                path: "/",
                expires: moment().add(30, "days").toDate(),
            });

            //
            // STEP 3 - Redirect to app
            //
            return res.redirect(`${urlPaths.dashboard}`);
        } catch (error) {
            console.log(`Something went wrong in github auth callback: ${error}`);
            return res.redirect(urlPaths.signin);
        }
    } else {
        console.log("Something went wrong in github auth callback: " + "Invalid request (code missing)");
        return res.redirect(urlPaths.signin);
    }
}
