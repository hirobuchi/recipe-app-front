import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/UseLogin";
import { LoginRequest } from "../../api/LoginApi";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { execute: loginExec, loading, error } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const req: LoginRequest = { username, password };
            await loginExec(req);
            navigate("/");
        } catch {
            /* エラーはフック内で状態設定済み */
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col>
                    <h2 className="mb-4 text-center">ログイン</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>ユーザー名</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>パスワード</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                // minLength={8}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading} className="w-100">
                            {loading ? <Spinner animation="border" size="sm" /> : "ログイン"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
