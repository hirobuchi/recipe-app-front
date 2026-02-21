import { useState } from "react";
import { LoginRequest, login as loginApi } from "../api/LoginApi";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = async (payload: LoginRequest) => {
        setError(null);
        setLoading(true);
        try {
            await loginApi(payload);
        } catch (e: any) {
            const msg = e.response?.data?.message || "ログインに失敗しました";
            setError(msg);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
};
