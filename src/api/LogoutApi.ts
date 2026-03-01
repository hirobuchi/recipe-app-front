import { ApiClient } from "./ApiClient";

/**
 * ログアウト。セッションを無効化し、クッキーを削除する。
 */
export const logout = async (): Promise<void> => {
    await ApiClient.post("/api/auth/logout");
};
