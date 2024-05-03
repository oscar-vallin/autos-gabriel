import { Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faCheckCircle, faTags, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'

export const DescriptionPage = () => {
  return (
    <Container>
      <Row>
        <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 10, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3rem', letterSpacing: '3px' }}>
            Ventajas
          </h2>
        </motion.div>
        <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.5rem' }}>
          De comprar en <span>Global Automotriz</span>:
        </p>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Start from the right
            whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
            viewport={{ once: true }}
            transition={{ duration: 2 }} // Increase the duration for a slower animation
          >
            <div>
            <h2 style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faCarSide} /> Gran Variedad
            </h2>
            </div>
            <p>
              Tenemos una amplia selección de coches nuevos y usados ​​para elegir.
            </p>
          </motion.div>
        </Col>
        <Col Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <motion.div
              initial={{ opacity: 0, x: 100 }} // Start from the right
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
              viewport={{ once: true }}
              transition={{ duration: 2 }} // Increase the duration for a slower animation
            >
            <h2 style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faCheckCircle} /> Calidad Garantizada
            </h2>
            <p>
            Todos nuestros coches pasan por rigurosas inspecciones para garantizar su calidad.
            </p>
          </motion.div>
        </Col>
      </Row>
      <Row>
        <Col Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <motion.div
              initial={{ opacity: 0, x: -100 }} // Start from the right
              whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
              viewport={{ once: true }}
              transition={{ duration: 2 }} // Increase the duration for a slower animation
            >
            <h2 style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faTags} /> Precios competitivos y financiamientos
            </h2>
            <p>
            Ofrecemos los mejores precios en nuestros coches para que puedas encontrar el mejor trato.
            </p>
          </motion.div>
        </Col>
        <Col Col md="12" lg="6">
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Start from the right
            whileInView={{ opacity: 1, x: 0 }} // Animate to the original position
            viewport={{ once: true }}
            transition={{ duration: 2 }} // Increase the duration for a slower animation
          >
            <h2 style={{ fontWeight: 'bold' }}>
            <FontAwesomeIcon icon={faHeadset} /> Excelente servicio al cliente
            </h2>
            <p>
              Nuestro equipo está siempre disponible para ayudarte y brindarte la mejor experiencia de compra.
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
};