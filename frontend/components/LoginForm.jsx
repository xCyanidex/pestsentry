import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {login} from "../services/auth";
import recordService from "../services/records";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";


const LoginForm = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [formSubmit,setFormSubmit]=useState(false);
  const [password, setPassword] = useState("");
  const [error,setError]=useState('');
  const [rememberMe, setRememberMe] = useState(false);


const handleLogin = async (event) => {
  event.preventDefault();

  if (!email.trim() || !password.trim()) {
    setError("Please enter login details");
    return;
  }

  try {
    setFormSubmit(true);
    setError(null); // clear any previous errors

    const user = await login({
      email,
      password,
      rememberMe,
    });
    recordService.setToken(user.token);
    dispatch(loginSuccess({ user, token: user.token }));

    // clear form
    setEmail("");
    setPassword("");

    navigate("/records");
  } catch (err) {
    let errorMessage = "Wrong credentials";

    if (err.response?.data) {
      const { data } = err.response;

      if (data.error) {
        errorMessage = data.error;
      } else if (data.message) {
        errorMessage = data.message;
      } else if (Array.isArray(data.errors) && data.errors[0]?.msg) {
        errorMessage = data.errors[0].msg;
      }
    }

    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  } finally {
    setFormSubmit(false);
  }
};

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked); // Update rememberMe state when checkbox is clicked
  };

  return (
    <>
      <Form onSubmit={handleLogin}>
        <h1 className="text-primary text-center">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autocomplete="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autocomplete="current-password"
          />
        </Form.Group>
        <Form.Check
          checked={rememberMe}
          onChange={handleRememberMeChange}
          type={"checkbox"}
          label={`Remember me.`}
        />
        <Button
          disabled={formSubmit}
          variant="primary"
          type="submit"
          className="my-2"
        >
          {formSubmit ? "Logging In..." : "Login"}
        </Button>
        <Row>
          <Col md={12} className="text-center">
            <p style={{ color: "red" }}>{error}</p>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;
