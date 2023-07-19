export const brandColors = {
    white: "#FDFDFC",
    black: "#191a1e",
    captionBlack: "#191a1e95",

    purple: "#7645EB",
    lightPurple: "#F3F0F8",
    darkPurple: "#320e89",

    gray: "#F3F3F3",
    // darkenedGray: "#797979",

    cancelColor: "#C5C5C5",
};

export const urlPaths = {
    signin: "/signin",
    dashboard: "/repos",
    settings: "/settings",
};

export const cookieNames = {
    githubAccessToken: "gdy_github_token",
};

export const apiBaseUrl = process.env.NEXT_PUBLIC_MY_APP_URL ? `${process.env.NEXT_PUBLIC_MY_APP_URL}/api` : "https://localhost:3000/api";

export function getErrorMessage(errors: Error[]) {
    if (errors) {
        for (let error of errors) {
            if (error && error.message) {
                return error.message;
            }
        }
    }
    return "";
}
