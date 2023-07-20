import { Repository, User } from "@/utils/@types";
import { axiosApi } from "@/utils/axios";
import useSWR from "swr";

async function getUserFetcher(url: string) {
    try {
        const response = await axiosApi.get(url);

        if (response.data.error) {
            throw new Error(response.data.error);
        } else {
            const data = response.data.data;
            const user = data.userData;

            return user;
        }
    } catch (error) {
        throw error;
    }
}

export function useUser() {
    const { data, error, isLoading } = useSWR("/integrations/github/getUser", (url: string) => getUserFetcher(url), {
        suspense: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });

    return {
        user: data as User,
        isLoadingUser: isLoading,
        errorUser: error,
    };
}

export async function searchRepos(githubUserName: string, searchQuery: string): Promise<{ repos: Repository[] | null; error: string | null }> {
    try {
        const data = {
            githubUserName: githubUserName,
            searchQuery: searchQuery,
        };
        const response = await axiosApi.post("/integrations/github/searchRepos", data);

        if (response.data.error) {
            return {
                repos: null,
                error: `${response.data.error}`,
            };
        } else if (response.data.data.repos) {
            const resultRepos = response.data.data.repos as Repository[];

            return {
                repos: resultRepos,
                error: null,
            };
        } else {
            return {
                repos: null,
                error: `Something went wrong searching through the repos`,
            };
        }
    } catch (error) {
        return {
            repos: null,
            error: `${error}`,
        };
    }
}
