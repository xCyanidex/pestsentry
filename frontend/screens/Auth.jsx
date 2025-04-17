import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import pestImage from "../src/assets/pest_control.jpeg";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const [authForm, setAuthForm] = useState(true);
  const authFormStatusHandler = () => {
    setAuthForm(!authForm);
  };
  useEffect(() => {
    if (location.state?.registered) {
      alert("Registration successful. Please login to continue.");
      // Optional: clear the state so it doesn't alert again on refresh
      window.history.replaceState({}, document.title);
      setAuthForm(true);
    }
  }, [location.state]);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          backgroundImage: `url(${pestImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Container
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "10px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          {authForm ? <LoginForm /> : <RegisterForm />}

          <div className="text-center mt-3">
            <p>
              {authForm
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                onClick={authFormStatusHandler}
                className="text-primary text-decoration-underline"
                style={{ cursor: "pointer" }}
              >
                {authForm ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Auth;
