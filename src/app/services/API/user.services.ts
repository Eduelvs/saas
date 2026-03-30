import { prefix, user_url } from "../../types/api";
import { http } from "./http";

const getUser = async (id: string) => {
	const response = await http.get(`${prefix}/${user_url}`);
	return response.data;
};

const getUserMe = async () => {
	const response = await http.get(`${prefix}/${user_url}/me`);
	return response.data;
};

export default {
    getUser,
    getUserMe
}