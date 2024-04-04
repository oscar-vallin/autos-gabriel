import React, { Suspense } from 'react';
import {
  HomeContainer, OverlayText,
} from './home.styles';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const MainImage = React.lazy(() => import('../../components/mainImages/MainImages'));

export const HomePage = () => {
  const whatsappNumber = process.env.REACT_APP_NUMBER
  return (
    <HomeContainer>
      <Suspense  fallback={<div>Loading...</div>}>
        <MainImage />
      </Suspense>
      <OverlayText>
        <h1>Encuentra tu vehículo <br></br>Perfecto</h1>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <p>
          Tenemos una amplia selección de 
          vehículos ​​para elegir
        </p>
        </motion.div>
        <Button variant="light" size="lg">
          <a style={{ textDecoration: 'none', color: '#000' }} href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">Contáctanos</a>
          <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '10px' }}/> 
        </Button>
      </OverlayText>
    </HomeContainer>
  )
}