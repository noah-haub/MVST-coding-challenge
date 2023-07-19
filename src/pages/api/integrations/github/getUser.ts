import { User } from "@/utils/@types";
import { getApiCookie } from "@/utils/cookies";
import { cookieNames } from "@/utils/helpers";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    error: string | null;
    data: {
        userData: User;
    } | null;
};

export default async function getUserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const githubAccessToken = getApiCookie(req, res, cookieNames.githubAccessToken);

        const user = await axios.post(
            "https://api.github.com/graphql",
            {
                query: `
                    query {
                        viewer {
                            login, name,
                        }
                    }
            `,
            },
            {
                headers: { Authorization: `Bearer ${githubAccessToken}` },
            }
        );

        const userData: User = {
            username: user.data.data.viewer.login,
            displayName: user.data.data.viewer.name,
        };

        if (!user || !userData) {
            console.log("Something went wrong getting user: " + "No user found.");
            return res.status(200).json({
                error: "Something went wrong getting user: " + "No user found.",
                data: null,
            });
        }

        return res.status(200).json({
            error: null,
            data: {
                userData: userData,
            },
        });
    } catch (error) {
        console.log("Something went wrong getting user: " + error);
        return res.status(200).json({
            error: "Something went wrong getting user: " + error,
            data: null,
        });
    }
}
