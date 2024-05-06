import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { singin } from '../../firebase/authFireBase';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../components/message/Message';
import { useAuth } from '../../context/authContext';

const StyledContainer = styled(Container)`
  max-width: 600px;
  width: 100%;
  margin-top: 50px;
`;

const TogglePasswordText = styled.div`
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 30px;
  &:hover {
    text-decoration: underline;
  }
`;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const { password, username } = formData;
      const statusUser = await singin(username, password);
      if (statusUser) {
        setErrMsg("");
      } else {
        setErrMsg("Las credenciales son incorrectas");
      }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/registercar');
    }
  }, [currentUser, navigate]);

  return (
    <StyledContainer>
      {errorMsg && <Message type="error">{errorMsg}</Message>}
      <Message
        type="warning"
      >
        Está página solamente es para usuarios con credenciales,
        sino cuentas con ellas da click en "Pagina Principal"
      </Message>
      <h2>Autenticación</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Ingrese nombre de usuario"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <TogglePasswordText onClick={togglePasswordVisibility}>
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </TogglePasswordText>
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
        <Link to="/" style={{ marginLeft: '20px' }}>
          Pagina Principal
        </Link>
      </Form>
    </StyledContainer>
  );
};

export default SignUpPage;
