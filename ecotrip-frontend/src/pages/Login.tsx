import React, { useState } from react;
import axios from axios;
import { useNavigate, Link } from react-router-dom;
import { Form, Button } from react-bootstrap;

const Login React.FC = () = {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e React.FormEvent) = {
    e.preventDefault();

    try {
      const response = await axios.post(
        httplocalhost8081apiauthlogin,
        { email, password }
      );

      const { token, name, role } = response.data;

      localStorage.setItem(token, token);
      localStorage.setItem(email, email);
      localStorage.setItem(name, name);
      localStorage.setItem(role, role);

      if (role === ADMIN) {
        navigate(admin);
      } else {
        navigate(vehicle);
      }

    } catch (err) {
      alert(Invalid email or password);
    }
  };

  return (
    div
      style={{
        minHeight 100vh,
        backgroundImage url('eco-bg1.png'),
        backgroundSize cover,
        backgroundPosition center,
        display flex,
        alignItems center,
        justifyContent center,
      }}
    
      { Dark Overlay }
      div
        style={{
          position absolute,
          width 100%,
          height 100%,
          backgroundColor rgba(0,0,0,0.45),
        }}
      

      { Glass Card }
      div
        style={{
          position relative,
          width 400px,
          padding 40px,
          borderRadius 20px,
          backdropFilter blur(15px),
          background rgba(255, 255, 255, 0.15),
          border 1px solid rgba(255, 255, 255, 0.3),
          boxShadow 0 8px 32px rgba(0,0,0,0.3),
          color white,
        }}
      
        h2 className=text-center mb-2Welcome Back 🌿h2
        p className=text-center mb-4 style={{ opacity 0.8 }}
          Continue your eco-friendly journey
        p

        Form onSubmit={handleLogin}
          Form.Group className=mb-3
            Form.LabelEmailForm.Label
            Form.Control
              type=email
              placeholder=Enter your email
              value={email}
              onChange={(e) = setEmail(e.target.value)}
              required
              style={{
                background rgba(255,255,255,0.2),
                border none,
                color white,
              }}
            
          Form.Group

          Form.Group className=mb-4
            Form.LabelPasswordForm.Label
            Form.Control
              type=password
              placeholder=Enter your password
              value={password}
              onChange={(e) = setPassword(e.target.value)}
              required
              style={{
                background rgba(255,255,255,0.2),
                border none,
                color white,
              }}
            
          Form.Group

          Button
            type=submit
            className=w-100 mb-3
            style={{
              backgroundColor #1f7a3f,
              border none,
              borderRadius 10px,
              padding 10px,
              fontWeight 600,
            }}
          
            Start Your Journey
          Button
        Form

        div className=text-center
          small style={{ opacity 0.8 }}
            Don’t have an account
          small
          br 
          Link
            to=signup
            style={{
              color #90ee90,
              fontWeight 600,
              textDecoration none,
            }}
          
            Create EcoTrip Account
          Link
        div
      div
    div
  );
};

export default Login;