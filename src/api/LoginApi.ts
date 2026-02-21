// 型を外部に持たず API 定義側で保持
export interface LoginRequest {
    username: string;
    password: string;
}

import { ApiClient } from "./ApiClient";

export const login = async (payload: LoginRequest): Promise<void> => {
    await ApiClient.post<void>("/api/auth/login", payload);
};
