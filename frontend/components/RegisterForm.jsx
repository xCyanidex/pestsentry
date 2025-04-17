import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import {register} from "../services/auth"
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [license,setLicense]=useState('');
  const [company,setCompany]=useState('');
  const [error,setError]=useState('');
    const [formSubmit, setFormSubmit] = useState(false);
const navigate=useNavigate()

 const handleRegister = async (e) => {
   e.preventDefault();

   // Trim validation for required fields
   if (!email.trim() || !password.trim() || !name.trim()) {
     setError("Please enter the required Details.");
     return;
   }

   try {
     setFormSubmit(true);
     setError(null); // Clear previous errors

     await register({
       name,
       email,
       password,
       phone,
       address,
       license,
       company,
     });

     navigate("/", { state: { registered: true } });
   } catch (err) {
     let errorMessage = "Something went wrong.";

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
  return (
    <>
      <Form onSubmit={handleRegister}>
        <h1 className="text-primary text-center">Register</h1>
        <Row className="mb-6">
          <Col md={6}>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name (required)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email (required)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-6">
          <Col md={6}>
            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password (required)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-6">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>License #</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter License Number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-6">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button disabled={formSubmit} variant="primary" type="submit">
          Register
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

export default RegisterForm;
