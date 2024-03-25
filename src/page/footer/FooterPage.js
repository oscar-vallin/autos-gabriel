import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

// Styled component for the footer
const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-top: 30px;
`;

// Styled component for the footer content
const FooterContent = styled.div`
  text-align: center;
`;

export const  FooterPage = () => {
  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col>
            <FooterContent>
              <p>&copy; 2024 Venta de coches Gabriel. Todos los derechos reservados.</p>
              <p>Siguenos en
              <a href="https://twitter.com"> Twitter </a>,
              <a href="https://facebook.com"> Facebook </a>, y 
              <a href="https://instagram.com"> Instagram </a>.</p>
            </FooterContent>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  );
};
