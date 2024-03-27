import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Section = styled.section`
  padding: 40px 0;
  text-align: center;
`;

const MainText = styled.h2`
  margin-bottom: 20px;
  font-size: 3rem;
`;

const SubText = styled.p`
  margin-bottom: 30px;
  font-size: 2rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
`;


export const ContactUsPage = () => {
  const whatsappNumber = process.env.REACT_APP_NUMBER
  return (
    <Section>
      <Container>
        <Row>
          <Col>
            <MainText>Contáctanos</MainText>
            <SubText>
              Si deseas atención personalizada o tienes alguna pregunta, no dudes en contactarnos.
            </SubText>
            <ContactButton href={`https://wa.me/${whatsappNumber}`} target="_blank">
              Contáctanos
              <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '10px' }}/> 
            </ContactButton>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

