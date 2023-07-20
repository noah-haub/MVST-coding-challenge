import { Deployment, Repository, User } from "@/utils/@types";
import { getApiCookie } from "@/utils/cookies";
import { cookieNames } from "@/utils/helpers";
import axios from "axios";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    error: string | null;
    data: {
        repos: Repository[];
    } | null;
};

// This API function gets repositories for the currently signed in user based on a search query
export default async function getUserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { githubUserName, searchQuery } = req.body;

    if (githubUserName && searchQuery) {
        try {
            //
            // Step 1 - Get Access Token
            //
            const githubAccessToken = getApiCookie(req, res, cookieNames.githubAccessToken);

            //
            // Step 2 - Get Repos based on Access Token and Search Query
            //
            const searchResult = await axios.post(
                "https://api.github.com/graphql",
                {
                    query: `
                        query {
                            search(type: REPOSITORY, query: "owner:${githubUserName} sort:updated-desc ${searchQuery}", first: 100) {
                                repositoryCount,
                                
                                edges {
                                    node {
                                        ... on Repository {
                                            id,
                                            createdAt,
                                            updatedAt,
                                            pushedAt,
                                            name,
                                            description,
                        
                                            owner { login },
                                            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                                                nodes {
                                                    name
                                                }
                                            },
                                            diskUsage,
                        
                                            deployments(first: 25, orderBy: { field: CREATED_AT, direction: DESC }) {
                                                nodes {
                                                    createdAt,
                                                },
                                                totalCount
                                            },
                        
                                            pullRequests(first: 25, orderBy: { field: CREATED_AT, direction: DESC }) {
                                                nodes {
                                                    createdAt,
                                                },
                                                totalCount
                                            },
                        
                                            url
                                        }
                                    }
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
            searchResult.data.data.search.edges.forEach((item: any, index: number) => {
                const languages: string[] = [];
                item.node.languages.nodes.forEach((languageItem: { name: string }) => {
                    languages.push(languageItem.name);
                });

                const deployments: Deployment[] = [];
                item.node.deployments.nodes.forEach((deploymentItem: { createdAt: string }) => {
                    deployments.push({ createdAt: moment(deploymentItem.createdAt) });
                });

                const pullRequests: Deployment[] = [];
                item.node.pullRequests.nodes.forEach((pullRequestItem: { createdAt: string }) => {
                    pullRequests.push({ createdAt: moment(pullRequestItem.createdAt) });
                });

                repositories.push({
                    id: item.node.id,
                    createdAt: moment(item.node.createdAt),
                    updatedAt: moment(item.node.pushedAt),
                    name: item.node.name,
                    languages: languages,
                    diskUsageInKiloBytes: Number(item.node.diskUsage ?? 0),
                    githubUrl: item.node.url,
                    deyployments: deployments,
                    deploymentCount: Number(item.node.deployments.totalCount ?? 0),
                    pullRequests: pullRequests,
                    pullRequestCount: Number(item.node.pullRequests.totalCount ?? 0),
                });
            });

            if (!searchResult) {
                console.log("Something went wrong searching repos: " + "No data in response.");
                return res.status(200).json({
                    error: "Something went wrong searching repos: " + "No data in response.",
                    data: null,
                });
            }

            return res.status(200).json({
                error: null,
                data: {
                    repos: repositories,
                },
            });
        } catch (error) {
            console.log("Something went wrong searching repos: " + error);
            return res.status(200).json({
                error: "Something went wrong searching repos: " + error,
                data: null,
            });
        }
    } else {
        console.log("Something went wrong searching repos: " + "Missing Information (githubUserName, searchQuery)");
        return res.status(200).json({
            error: "Something went wrong searching repos: " + "Missing Information (githubUserName, searchQuery)",
            data: null,
        });
    }
}
