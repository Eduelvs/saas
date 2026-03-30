import { useMutation, useQuery } from "@tanstack/react-query";
import authServices from "../API/auth.services";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authServices.login(email, password),
    });
};

export const useRefreshToken = (refreshToken: string) => {
    return useQuery({
        queryKey: ["refreshToken"],
        queryFn: () => authServices.refreshToken(refreshToken),
        enabled: !!refreshToken,
        staleTime: 1000 * 60 * 5,
    });
}

export const useLogout = () => {
    return useQuery({
        queryKey: ["logout"],
        queryFn: () => authServices.logout(),
    });
}