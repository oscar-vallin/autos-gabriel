import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  text-align: center;
  margin-top: 50px;
`;

export const NotFoundPage = () => {
  return (
    <StyledContainer>
      <h1>404</h1>
      <h2>Pagina no encontrada</h2>
      <p>La página que buscas no existe</p>
      <Link to="/">
        <Button variant="primary">Regresar a la pagina principal</Button>
      </Link>
    </StyledContainer>
  );
};