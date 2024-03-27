import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
              <p>
              <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '10px' }}/> + {process.env.REACT_APP_NUMBER}
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: '10px' }}/> {process.env.REACT_APP_USER_EMAIL}
              </p>
              <p>
                Esta página web fue creada por <a href="https://www.quantum3digit.com" target="_blank" rel="noopener noreferrer">quantum3digit</a>
              </p>
            </FooterContent>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  );
};
