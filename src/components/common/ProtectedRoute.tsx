import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { checkSession } from "../../api/AuthApi";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * 未ログイン時に /login へリダイレクトするルートガード。
 * ログイン済みの場合のみ children を表示する。
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let cancelled = false;

        const verify = async () => {
            try {
                const ok = await checkSession();
                if (!cancelled) {
                    setIsAuthenticated(ok);
                }
            } catch {
                if (!cancelled) {
                    setIsAuthenticated(false);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        verify();
        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
