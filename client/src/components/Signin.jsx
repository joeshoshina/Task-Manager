import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <Container className="d-flex justify-content-left align-items-center min-vh-100">
      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <h3 className="mb-4">Sign in</h3>
        <div className="d-flex justify-content-left gap-2 mb-3">
          <p>New to Task Manager?</p>
          <Link to="/signup" className="card-link">
            Create an account
          </Link>
        </div>
        <Form>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign in
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signin;
