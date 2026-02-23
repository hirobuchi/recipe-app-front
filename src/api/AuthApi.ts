import { ApiClient } from "./ApiClient";

/**
 * セッションが有効か確認する。認証済みなら true、未認証（401/403）なら false。
 */
export const checkSession = async (): Promise<boolean> => {
    try {
        await ApiClient.get("/api/auth/me");
        return true;
    } catch (e: unknown) {
        const status = (e as { response?: { status?: number } })?.response?.status;
        if (status === 401 || status === 403) {
            return false;
        }
        throw e;
    }
};
