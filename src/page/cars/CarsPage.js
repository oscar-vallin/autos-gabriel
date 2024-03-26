import React, { useState, useEffect } from 'react';
import { 
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { deleteCarAndImages } from '../../firebase/crudFireBase';

import { useAuth } from '../../context/authContext';

import { Message } from '../../components/message/Message';

import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 20px 0;
`;

export const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const { currentUser } = useAuth();
  const [uploadError, setUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    carName: '',
    price: ''
  });
  const fetchCars = async () => {
    const carsCollectionRef = collection(firestore, 'cars');
    const querySnapshot = await getDocs(carsCollectionRef);
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cars;
  };

  const removeCar = (id, path) => {
    const removedCar = deleteCarAndImages(id, path);

    if (removedCar) {
      setUploadSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setUploadError(true);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Submit the form data
    handleClose();
  };

  const whatsappLink = () => {
    const message = JSON.stringify(formData);

    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/whatsAppNumber?text=${encodedMessage}`;

  }

  useEffect(() => {
    const fetchData = async () => {
      const carsData = await fetchCars();
      console.log(carsData)
      setCars(carsData);
    };
    fetchData();
  }, []);

  return (
    <Container>
      {uploadSuccess && <Message type="success">El vehículo se elimino correctamente</Message>}
      {uploadError && <Message type="error">Hubo un error al eliminar el vehículo</Message>}
      <Row>
        {cars.map((car, index) => (
          <Col md="12" lg="6" key={index}>
            <Card style={{ marginBottom: '30px' }}>
            <Carousel>
              {car.images.map((imageCar, indexCar) => (
                <Carousel.Item key={indexCar}>
                  <img
                    className="d-block w-100"
                    src={imageCar}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title><i className="fa fa-car" style={{ marginRight: '5px' }}></i>{car.name} </Card.Title>
              <Card.Text>
                <p>{car.description}</p>
                <p> <FontAwesomeIcon icon={faDollarSign} /> {car.price}</p>
              </Card.Text>
            </Card.Body>
            <Button
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              variant="info"
              onClick={handleShow}
            >
              Estoy Interesado
              <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i> 
            </Button>
            {currentUser && <Button
              variant="danger"
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              onClick={() => removeCar(car.id, car.nameDirectory)}
            >
              Borrar
              <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '10px' }}/>
            </Button>}
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Car Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Car Name</Form.Label>
              <Form.Control
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Send Message via WhatsApp
            </a>
          </StyledForm>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

