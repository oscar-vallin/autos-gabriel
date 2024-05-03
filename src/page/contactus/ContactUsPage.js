import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 40px 0;
  text-align: center;
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
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 10, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3rem', letterSpacing: '3px', marginBottom: '40px' }}>
            Contáctanos
            </h2>
            </motion.div>
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

