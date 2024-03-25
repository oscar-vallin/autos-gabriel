import React from 'react';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

// car one 
import onecar1 from '../../assets/oneCar1.jpeg';
import onecar2 from '../../assets/oneCar2.jpeg';
import onecar3 from '../../assets/oneCar3.jpeg';
import onecar4 from '../../assets/oneCar4.jpeg';
import onecar5 from '../../assets/oneCar5.jpeg';

// car two
import twocar1 from '../../assets/twoCar1.jpeg';
import twocar2 from '../../assets/twoCar2.jpeg';
import twocar3 from '../../assets/twoCar3.jpeg';
import twocar4 from '../../assets/twoCar4.jpeg';
import twocar5 from '../../assets/twoCar5.jpeg';

export const CarsPage = () => {
  return (
    <Container>
      <Row>
        <Col md="12" lg="6">
          <Card style={{ marginBottom: '30px' }}>
            <Carousel>
            <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={onecar1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={onecar2}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={onecar3}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={onecar5}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={onecar4}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
            <Card.Body>
              <Card.Title><i className="fa fa-car" style={{ marginRight: '5px' }}></i>Nissan versa 2017 </Card.Title>
              <Card.Text>
                <p>Versión Advance automático</p>
                <p> <FontAwesomeIcon icon={faDollarSign} /> 165,000</p>
              </Card.Text>
            </Card.Body>
            <Button style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }} variant="info">
              Estoy Interesado
              <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i> 
            </Button>
          </Card>
        </Col>
        <Col md="12" lg="6">
          <Card style={{ marginBottom: '30px' }}>
            <Carousel>
            <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={twocar1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={twocar2}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={twocar3}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={twocar4}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={twocar5}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
            <Card.Body>
              <Card.Title><i className="fa fa-car" style={{ marginRight: '5px' }}></i> Nissan versa 2017 </Card.Title>
              <Card.Text>
                <p>Versión Advance automático</p>
                <p><FontAwesomeIcon icon={faDollarSign} /> 165,000</p>
              </Card.Text>
            </Card.Body>
            <Button style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }} variant="info">
              Estoy Interesado
              <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i> 
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

