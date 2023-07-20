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

// This API function gets the currently signed in users github profile including their basic info (name, image url) and their repositories.
export default async function getUserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        //
        // Step 1 - Get Access Token
        //
        const githubAccessToken = getApiCookie(req, res, cookieNames.githubAccessToken);

        //
        // Step 2 - Get User Info Based On Access Token
        //
        const user = await axios.post(
            "https://api.github.com/graphql",
            {
                query: `
                    query {
                        viewer {
                            login,
                            name,
                            avatarUrl,
                            
                            repositories(first: 100, orderBy: { field: PUSHED_AT, direction: DESC }) {
                                nodes {
                                    id,
                                    createdAt,
                                    updatedAt,
                                    pushedAt,
                                    name,
                                    description,
                            
                                    owner { login },
                                    languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
                                        nodes {
                                            name
                                        }
                                    },
                                    diskUsage,

                                    deployments(first: 50, orderBy: { field: CREATED_AT, direction: DESC }) {
                                        nodes {
                                            createdAt
                                        },
                                        totalCount
                                    },

                                    pullRequests(first: 50, orderBy: { field: CREATED_AT, direction: DESC }) {
                                        nodes {
                                            createdAt
                                        },
                                        totalCount
                                    },
                    
                                    url
                                },
                                totalCount
                            }
                        }
                    }
            `,
            },
            {
                headers: { Authorization: `Bearer ${githubAccessToken}` },
            }
        );

        //
        // Step 3 - Format API response so it is easy to work with
        //
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

            const pullRequests: Deployment[] = [];
            item.pullRequests.nodes.forEach((pullRequestItem: { createdAt: string }) => {
                pullRequests.push({ createdAt: moment(pullRequestItem.createdAt) });
            });

            repositories.push({
                id: item.id,
                createdAt: moment(item.createdAt),
                updatedAt: moment(item.pushedAt),
                name: item.name,
                languages: languages,
                diskUsageInKiloBytes: Number(item.diskUsage ?? 0),
                githubUrl: item.url,
                deyployments: deployments,
                deploymentCount: Number(item.deployments.totalCount ?? 0),
                pullRequests: pullRequests,
                pullRequestCount: Number(item.pullRequests.totalCount ?? 0),
            });
        });

        const userData: User = {
            username: user.data.data.viewer.login,
            displayName: user.data.data.viewer.name,
            avatarUrl: user.data.data.viewer.avatarUrl,

            repositories: repositories,
            repositoryCount: user.data.data.viewer.repositories.totalCount,
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
