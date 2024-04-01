import { Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faCheckCircle, faTags, faHeadset } from '@fortawesome/free-solid-svg-icons';

export const DescriptionPage = () => {
  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4rem', letterSpacing: '3px' }}>
          Ventajas
        </h1>
        <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.5rem' }}>
          Nuestra venta de coches ofrece lo siguiente:
        </p>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faCarSide} /> Gran Variedad
          </h2>
          <p>
            Tenemos una amplia selección de coches nuevos y usados ​​para elegir.
          </p>
        </Col>
        <Col Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faCheckCircle} /> Calidad Garantizada
          </h2>
          <p>
          Todos nuestros coches pasan por rigurosas inspecciones para garantizar su calidad.
          </p>
        </Col>
      </Row>
      <Row>
        <Col Col md="12" lg="6" style={{ marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faTags} /> Precios competitivos y Financiamientos
          </h2>
          <p>
          Ofrecemos los mejores precios en nuestros coches para que puedas encontrar el mejor trato.
          </p>
        </Col>
        <Col Col md="12" lg="6">
          <h2 style={{ fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faHeadset} /> Excelente servicio al cliente
          </h2>
          <p>
            Nuestro equipo está siempre disponible para ayudarte y brindarte la mejor experiencia de compra.
          </p>
        </Col>
      </Row>
    </Container>
  )
};