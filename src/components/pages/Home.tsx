import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseMenus } from '../../hooks/UseMenus';

const Home = () => {
    const { menus, loading, error } = UseMenus();

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>エラー: {error}</div>;

    return (
        <Container className="py-4">
            <Row className="g-4">
                {menus.map((menu) => (
                    <Col md={4} key={menu.menu_api}>
                        <Link to={`/${menu.menu_api}`} className="text-decoration-none">
                            <Card className="h-100 shadow-sm hover-card">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{menu.menu_name}</Card.Title>
                                    <Card.Text>{menu.menu_description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
