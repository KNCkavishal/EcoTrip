import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/signup",
        { name, email, password }
      );

      const { token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);

      navigate("/vehicle");

    } catch (err: any) {
      if (err.response) {
        alert(err.response.data);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/eco-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />

      {/* Glass Card */}
      <div
        style={{
          position: "relative",
          width: "420px",
          padding: "40px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-2">Join EcoTrip 🌿</h2>
        <p className="text-center mb-4" style={{ opacity: 0.8 }}>
          Start planning your sustainable adventures
        </p>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Minimum 6 characters"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mb-3"
            style={{
              backgroundColor: "#1f7a3f",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "600",
            }}
          >
            Create Eco Account
          </Button>
        </Form>

        <div className="text-center">
          <small style={{ opacity: 0.8 }}>
            Already have an account?
          </small>
          <br />
          <Link
            to="/login"
            style={{
              color: "#90ee90",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
