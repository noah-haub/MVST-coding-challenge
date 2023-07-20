import { Moment } from "moment";

export type User = {
    username: string;
    displayName: string;

    repositories: Repository[];
};

export type Repository = {
    id: string;
    createdAt: Moment;
    updatedAt: Moment;

    name: string;
    languages: string[];
    diskUsageInKiloBytes: number,
    githubUrl: string;

    deyployments: Deployment[];
};

export type Deployment = {
    createdAt: Moment;
};
