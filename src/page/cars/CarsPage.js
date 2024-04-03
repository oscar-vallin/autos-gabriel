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
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
  const [currentRemoveCarData, setCurrentRemoveCarData] = useState({
    id: '',
    path: '',
  });
  const [removeCarModal, setRemoveCarModal] = useState(false);
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

  const openRemoveCarModal = async (id, path) => {
    setRemoveCarModal(true);
    setCurrentRemoveCarData({
      id,
      path
    });
    
  };

  const removeCar = async () => {
    const { id, path } = currentRemoveCarData;
    const removedCar = deleteCarAndImages(id, path);
    setCurrentRemoveCarData({
      id: '',
      path: '',
    });

    if (removedCar) {
      setUploadSuccess(true)
      setTimeout(async () => {
        const cars = await fetchCars();
        setCars(cars);
        setRemoveCarModal(false);
        setUploadSuccess(false);
      }, 2000)
    } else {
      setUploadError(true);
      setRemoveCarModal(false);
    }
  }

  const handleClose = () => setShow(false);

  const handleShow = (carName, price) => {  
    setFormData({
      ...formData,
      carName,
      price,
    });
    setShow(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const whatsappLink = () => {
    const { name, phoneNumber, carName, price } = formData;
    let message = '';
    if (name) {
      message += `Nombre: ${name}\n`;
    }
    if (phoneNumber) {
      message += ` Numero: ${phoneNumber}\n`;
    }
    if (carName){
      message += ` Vehículo: ${carName}\n`;
    }
    if (price) {
      message += ` Precio: ${price}`;
    }
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${process.env.REACT_APP_NUMBER}?text=${encodedMessage}`;

  };

  useEffect(() => {
    const fetchData = async () => {
      const carsData = await fetchCars();
      setCars(carsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!removeCarModal){
      setCurrentRemoveCarData({
        id: '',
        path: '',
      });
    }
  }, [removeCarModal]);

  return (
    <Container>
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
              onClick={() => handleShow(car.name, car.price)}
            >
              Estoy Interesado
              <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i> 
            </Button>
            {currentUser && <Button
              variant="danger"
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              onClick={() => openRemoveCarModal(car.id, car.nameDirectory)}
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
          <Modal.Title>Información del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener
                noreferrer"
                style={{ 
                  color: '#fff',
                  textDecoration: 'none',
                 }}
                 onClick={() => setShow(false)}
                >
                Ir a WhatsApp
                <FontAwesomeIcon icon={faWhatsapp} style={{ marginLeft: '10px' }}/> 
              </a>
            </Button>
          </StyledForm>
        </Modal.Body>
      </Modal>
      <Modal show={removeCarModal} onHide={() => setRemoveCarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Estás seguro de eliminar este Veihículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {uploadSuccess && <Message type="success">El vehículo se eliminó correctamente</Message>}
            <Button onClick={removeCar}>
              Eliminar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setRemoveCarModal(false)}
              style={{ marginLeft: '20px' }}
            >
              Cancelar
            </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

