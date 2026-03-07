import axios from "axios";

const baseUrl =
    typeof window !== "undefined"
        ? ""
        : process.env.BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: baseUrl,
});

export const getData = async (url, config = {}) => {
    const { data } = await api.get(url, config);
    return data;
};
