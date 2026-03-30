import axios from "axios";

const raw = import.meta.env.VITE_API_URL as string | undefined;
const baseURL = raw?.replace(/\/$/, "") ?? "";

export const http = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});
