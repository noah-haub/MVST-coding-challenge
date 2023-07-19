import { User } from "@/utils/@types";
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
