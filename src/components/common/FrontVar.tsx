import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { checkSession } from "../../api/AuthApi";
import { logout } from "../../api/LogoutApi";
import { fetchMenus } from "../../api/MenuApi";
import { Menu } from "../types/Menu";

const FrontVar = () => {
    const location = useLocation();
    const [authLoading, setAuthLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [menuLoading, setMenuLoading] = useState(false);
    const [menuError, setMenuError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const verify = async () => {
            try {
                setAuthLoading(true);
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
                    setAuthLoading(false);
                }
            }
        };

        verify();
        return () => {
            cancelled = true;
        };
    }, [location.pathname]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        let cancelled = false;
        setMenuLoading(true);
        setMenuError(null);

        fetchMenus()
            .then((data) => {
                if (!cancelled) {
                    setMenus(data);
                }
            })
            .catch((e: unknown) => {
                if (!cancelled) {
                    const msg =
                        (e as { message?: string })?.message ??
                        "メニューの取得に失敗しました";
                    setMenuError(msg);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setMenuLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

    let rightContent;

    if (authLoading) {
        rightContent = (
            <div className="ms-auto">
                <Spinner animation="border" size="sm" />
            </div>
        );
    } else if (isAuthenticated) {
        rightContent = (
            <>
                <Nav className="me-auto">
                    {menuLoading && (
                        <Nav.Item className="d-flex align-items-center px-2">
                            <Spinner animation="border" size="sm" />
                        </Nav.Item>
                    )}
                    {menuError && (
                        <Nav.Item className="px-2 text-danger small">
                            {menuError}
                        </Nav.Item>
                    )}
                    {menus.map((menu) => (
                        <Nav.Link
                            as={Link}
                            to={`/${menu.menu_api}`}
                            key={menu.menu_api}
                        >
                            {menu.menu_name}
                        </Nav.Link>
                    ))}
                </Nav>
                <Nav>
                    <Nav.Link
                        as="button"
                        onClick={() => {
                            // ログアウト API 呼び出しは非同期に投げるだけにして、
                            // 画面側は即座にログアウト状態＋リダイレクトする
                            logout().catch(() => {
                                /* API エラー時も画面上はログアウト扱いとする */
                            });
                            setIsAuthenticated(false);
                            globalThis.location.replace("/login");
                        }}
                    >
                        ログアウト
                    </Nav.Link>
                </Nav>
            </>
        );
    } else {
        rightContent = (
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login">
                    ログイン
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                    新規登録
                </Nav.Link>
            </Nav>
        );
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    recipe-app
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {rightContent}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default FrontVar;
