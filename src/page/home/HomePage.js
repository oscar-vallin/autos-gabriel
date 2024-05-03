import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import {
  HomeContainer, OverlayText,
} from './home.styles';
import { motion } from 'framer-motion';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const MainImage = React.lazy(() => import('../../components/mainImages/MainImages'));

export const HomePage = () => {
  const whatsappNumber = process.env.REACT_APP_NUMBER
  return (
    <HomeContainer>
      <Helmet>
      <title>Global Automotriz - Encuentra tu coche ideal</title>
        <meta name="description" content="Explora nuestra amplia selección de coches. Encuentra ofertas en coches nuevos y usados en Global Automotriz." />
        <meta name="keywords" content="coches, venta de coches, coches usados, coches nuevos en Global Automotriz" />
      </Helmet>
      <Suspense  fallback={<div  style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ 
            color: 'blue',
            fontSize: '100px',
            width: '2rem',
            height: '2rem',
            }} 
            animation="border"
            role="status"
          >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>}>
        <MainImage />
      </Suspense>
      <OverlayText>
        <h1>Encuentra tu vehículo <br></br>Perfecto</h1>
        <motion.h4
           initial={{ opacity: 0, y: -60 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
        >En Global Automotriz</motion.h4>
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