import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
// controlId sets both id and htmlFor attributes for better accessibility, couldn't use when wrapping in div must be done in Form.Group className
// as it is a bootstrap component, not a react-bootstrap component

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred while signing up");
    }
    console.log("Form submitted");
    // user made so redirect to sign in page
  };

  return (
    <Container className="d-flex justify-content-left align-items-center min-vh-100">
      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <h3>Sign Up</h3>
        <div className="d-flex justify-content-left gap-2 mb-3">
          <p>Already Have an Account?</p>
          <Link to="/signin" className="card-link">
            Sign in
          </Link>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <div className="d-flex gap-2">
              <div className="flex-fill">
                <Form.Label htmlFor="firstName">First Name *</Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-fill">
                <Form.Label htmlFor="lastName">Last Name *</Form.Label>
                <Form.Control
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              //For controlling password input and reflect react state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(""); //Reset error
              }}
              //Preventing copy, cut, and paste to ensure password security
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
            />
          </Form.Group>
          {error && (
            <div className="text-danger mb-3" aria-live="polite">
              {error}
            </div>
          )}
          <Button variant="primary" type="submit" className="w-100">
            Create account
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
