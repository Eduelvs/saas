import { auth_url, prefix } from "../../types/api";
import { http } from "./http";

const login = async (email: string, password: string) => {
	const body = new URLSearchParams({
		grant_type: "password",
		username: email,
		password,
	});
	const response = await http.post(`${prefix}/${auth_url}/login`, body, {
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
	});
	return response.data;
};

const refreshToken = async (refreshToken: string) => {
	const response = await http.post(`${prefix}/${auth_url}/refresh-token`, { refreshToken });
	return response.data;
};

const logout = async () => {
	const response = await http.post(`${prefix}/${auth_url}/logout`);
	return response.data;
};

export default {
    login,
    refreshToken,
    logout
}