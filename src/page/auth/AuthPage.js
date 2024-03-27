import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { singin } from '../../firebase/authFireBase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';


const StyledContainer = styled(Container)`
  max-width: 400px;
  margin-top: 50px;
`;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const { password, username } = formData;
    try {
      await singin(username, password);
      // Redirect to a protected route after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
    }
    console.log('Form data:');
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/registercar');
    }
  }, [currentUser, navigate])

  return (
    <StyledContainer>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <Link to="/" style={{ marginLeft: '20px' }}>
          Pagina Principal
        </Link>
      </Form>
    </StyledContainer>
  );
};

export default SignUpPage;
