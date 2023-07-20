import moment from "moment";
import { Moment } from "moment";

export const brandColors = {
    white: "#FDFDFC",
    black: "#191a1e",
    captionBlack: "#191a1e95",

    purple: "#7645EB",
    lightPurple: "#F3F0F8",
    darkPurple: "#320e89",

    gray: "#F3F3F3",

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

export function getDatesBetweenDates(startDate: Moment, endDate: Moment, timeIncrementInDays: number) {
    let dates: Moment[] = [];

    const currentDate = moment(startDate.format("YYYY-MM-DD"));
    const lastDate = moment(endDate.format("YYYY-MM-DD"));

    while (currentDate.isSameOrBefore(lastDate)) {
        dates.push(currentDate.clone());
        currentDate.add(timeIncrementInDays, timeIncrementInDays === 1 ? "day" : "days");
    }

    return dates;
}
