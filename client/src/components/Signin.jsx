import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for the cookie
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Sign-in successful:", data);
        navigate("/task-manager");
      } else {
        setError(data.error || "Sign-in failed");
        console.error("Sign-in error:", data.error);
        return;
      }
    } catch (error) {
      setError("An error occurred while signing in");
      return;
    }
  };

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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value), setError("");
              }}
            />
          </Form.Group>
          {error && (
            <div className="text-danger mb-3" aria-live="polite">
              {error}
            </div>
          )}
          <Button variant="primary" type="submit" className="w-100">
            Sign in
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signin;
