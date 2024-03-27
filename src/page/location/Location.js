
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const ResponsiveMapWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  margin-top: 40px;
  @media (max-width: 768px){
    margin-top: 70px;
  }
`;

export const ResponsiveIframe = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
    padding-bottom: 32px
`;

export const LocationPage = () => {
  const openGoogleMaps = () => {
    const url = 'https://maps.app.goo.gl/VJESjSCgBzp3NTNd8';
    window.open(url, '_blank');
  };
  return (
    <Container>
       <Row>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3rem', letterSpacing: '3px' }}>
          Ubicación
        </h2>
        <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.5rem' }}>
          Dirección: Av. del Parque 668, Hormiguero
        </p>
      </Row>
      <Row>
        <Col>
          <ResponsiveMapWrapper>
            <ResponsiveIframe 
                title="Address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.448267101164!2d-103.30378672475366!3d20.651334080905322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b3683fc3f737%3A0x289a14242f77d852!2sGlobal%20automotriz!5e0!3m2!1ses-419!2smx!4v1711498206836!5m2!1ses-419!2smx"
                allowFullScreen
            >

            </ResponsiveIframe>
          </ResponsiveMapWrapper>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={8} md={6} lg={4} >
          <Button
            onClick={openGoogleMaps}
            >
              Abrir en Google Maps <FontAwesomeIcon icon={faMapMarkedAlt} style={{ marginLeft: '10px' }}/>
            </Button>
        </Col>
      </Row>
    </Container>
  )
}