import { Deployment, Repository, User } from "@/utils/@types";
import { getApiCookie } from "@/utils/cookies";
import { cookieNames } from "@/utils/helpers";
import axios from "axios";
import moment from "moment";
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
                            login,
                            name,
                            avatarUrl,
                            
                            repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
                                nodes {
                                    id,
                                    createdAt,
                                    updatedAt,
                                    name,
                                    description,
                            
                                    owner { login },
                                    languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
                                        nodes {
                                            name
                                        }
                                    },
                                    diskUsage,

                                    deployments(first: 25) {
                                        nodes {
                                            createdAt
                                        }
                                    },
                    
                                    url
                                },
                            }
                        }
                    }
            `,
            },
            {
                headers: { Authorization: `Bearer ${githubAccessToken}` },
            }
        );

        const repositories: Repository[] = [];
        user.data.data.viewer.repositories.nodes.forEach((item: any, index: number) => {
            const languages: string[] = [];
            item.languages.nodes.forEach((languageItem: { name: string }) => {
                languages.push(languageItem.name);
            });

            const deployments: Deployment[] = [];
            item.deployments.nodes.forEach((deploymentItem: { createdAt: string }) => {
                deployments.push({ createdAt: moment(deploymentItem.createdAt) });
            });

            repositories.push({
                id: item.id,
                createdAt: moment(item.createdAt),
                updatedAt: moment(item.updatedAt),
                name: item.name,
                languages: languages,
                diskUsageInKiloBytes: Number(item.diskUsage ?? 0),
                githubUrl: item.url,
                deyployments: deployments,
            });
        });

        const userData: User = {
            username: user.data.data.viewer.login,
            displayName: user.data.data.viewer.name,

            repositories: repositories,
        };

        // console.log(userData);

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
