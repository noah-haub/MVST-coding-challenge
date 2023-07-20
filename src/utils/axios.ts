import axios from "axios";
import { apiBaseUrl } from "./helpers";

export const axiosApi = axios.create({
    baseURL: apiBaseUrl,
});
