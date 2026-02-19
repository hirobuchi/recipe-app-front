import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const ApiClient = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});