import { Moment } from "moment";

export type User = {
    username: string;
    displayName: string;

    repositories: Repository[];
    repositoryCount: number;
};

export type Repository = {
    id: string;
    createdAt: Moment;
    updatedAt: Moment;

    name: string;
    languages: string[];
    diskUsageInKiloBytes: number;
    githubUrl: string;

    deyployments: Deployment[];
    deploymentCount: number;
    pullRequests: PullRequest[];
    pullRequestCount: number;
};

export type Deployment = {
    createdAt: Moment;
};

export type PullRequest = {
    createdAt: Moment;
};
