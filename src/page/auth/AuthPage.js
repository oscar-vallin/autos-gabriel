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

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const { password, username } = formData;
      const statusUser = singin(username, password);
      if (statusUser) {
        setErrMsg("");
      } else {
        setErrMsg("Las credenciales son incorrectas");
      }

  };

  useEffect(() => {
    if (currentUser) {
      navigate('/registercar');
    }
  }, [currentUser, navigate])

  return (
    <StyledContainer>
      {errorMsg && <Message type="error">{errorMsg}</Message>}
      <Message
        type="warning"
      >
        Está página solamente es para usuarios con credenciales,
        sino cuentas con ellas da click en "Pagina Principal"
      </Message>
      <h2>Auth</h2>
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
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

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
