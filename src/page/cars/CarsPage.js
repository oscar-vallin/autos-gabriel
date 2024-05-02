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
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { deleteCarAndImages, editCarStore, deleteCarImages} from '../../firebase/crudFireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useAuth } from '../../context/authContext';

import { Message } from '../../components/message/Message';

import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 20px 0;
`;

export const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const { currentUser } = useAuth();
  const [index, setIndex] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentRemoveCarData, setCurrentRemoveCarData] = useState({
    id: '',
    path: '',
  });
  const [currentEditImages, setCurrentEditImages] = useState([]);
  const [imagesNotRemoved, setImagesNotRemoved] = useState([]);
  const [newEditData, setNewEditData] = useState({
    name: '',
    price: '',
    description: '',
    id: '',
    nameDirectory: '',
  })
  const [removeCarModal, setRemoveCarModal] = useState(false);
  const [editCarModal, setEditCarModal] = useState(false);
  const [removeImgModal, setRemoveImgModal] = useState(false);
  const [currentRemoveEditImg, setCurrentRemoveEditImg] = useState('');

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

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const openRemoveCarModal = async (id, path) => {
    setRemoveCarModal(true);
    setCurrentRemoveCarData({
      id,
      path
    });
    
  };

  const openEditCarModal = async (car) => {
    setEditCarModal(true);
    setNewEditData({
      description: car.description,
      name: car.name,
      price: car.price,
      id: car.id,
      nameDirectory: car.nameDirectory,
    });
    setCurrentEditImages(car.images);
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
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
    const newImages = Array.from(e.target.files).map((file) => ({
      ...file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setCurrentEditImages((prevImages) => [...prevImages, ...newImages.map((ni) => ni.preview)]);
  };

  const editCar = async () => {
    const imageUrls = [];
    await deleteCarImages(newEditData.nameDirectory);
    for (const image of newImages) {
      const imageRef = await ref(storage, `cars/${newEditData.nameDirectory}/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    for (const imageNotRemoved of imagesNotRemoved) {
      imageUrls.push(imageNotRemoved);
    }
    const edit = editCarStore(newEditData, imageUrls);
    setCurrentEditImages([]);

    if (edit) {
      setUploadSuccess(true)
      setTimeout(async () => {
        const cars = await fetchCars();
        setCars(cars);
        setEditCarModal(false);
        setUploadSuccess(false);
      }, 2000)
    } else {
      setUploadError(true);
      setEditCarModal(false);
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

  useEffect(() => {
    if (!editCarModal){
      setNewEditData({
        id: '',
        description: '',
        name: '',
        price: '',
      });

      setCurrentEditImages([]);
      setNewImages([]);
      setImagesNotRemoved([]);
    }
  }, [editCarModal]);

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
            <div style={{display: 'flex'}}>
            {currentUser && <Button
              variant="danger"
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              onClick={() => openRemoveCarModal(car.id, car.nameDirectory)}
            >
              Borrar
              <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '10px' }}/>
            </Button>}
            {currentUser && <Button
              variant="secondary"
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              onClick={() => openEditCarModal(car)}
            >
              Editar
              <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '10px' }}/>
            </Button>}
            </div>
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
          <Modal.Title>¿Estás seguro de eliminar este Veihículo?</Modal.Title>
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
      <Modal  show={editCarModal} onHide={() => setEditCarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Vehículo</Modal.Title>
        </Modal.Header>
          {uploadSuccess && <Message type="success">El vehículo se editó correctamente</Message>}
          <Card>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null} >
            {currentEditImages.map((imageCar, indexCar) => (
                <Carousel.Item key={indexCar} style={{backgroundColor: '#000'}}>
                  <img
                    style={{margin: '0 auto', cursor: 'pointer'}}
                    className="d-block w-50"
                    src={imageCar}
                    alt="First slide"
                    onClick={() => {
                      setCurrentRemoveEditImg(imageCar);
                      setRemoveImgModal(true);
                    }}
                  />
                </Carousel.Item>
              ))}
              </Carousel>
            <Card.Body>
              <Card.Text>
                <Form.Label htmlFor="carname">Nombre</Form.Label>
                <Form.Control
                  style={{ marginBottom: '15px', border: '3px solid rgba(13,110,253,.25)' }} 
                  type='text'
                  id="carname"
                  value={newEditData.name}
                  onChange={(e) => setNewEditData({...newEditData,name: e.target.value})}
                  />
                  <Form.Label htmlFor="cardescription">Descripción</Form.Label>
                  <Form.Control
                    style={{ marginBottom: '15px', border: '3px solid rgba(13,110,253,.25)' }} 
                  as="textarea"
                  value={newEditData.description}
                  id="cardescription"
                  onChange={(e) => setNewEditData({...newEditData,description: e.target.value})}
                  />
                  <Form.Label htmlFor="cardprice">Precio</Form.Label>
                  <Form.Control
                    style={{ marginBottom: '15px', border: '3px solid rgba(13,110,253,.25)' }} 
                  type='text'
                  value={newEditData.price}
                  id='cardprice'
                  onChange={(e) => setNewEditData({...newEditData,price: e.target.value})}
                  />
                  <Form.Label>Subir Imagenes</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: '10px', border: '1px solid #000' }}
                  />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Button onClick={editCar}>
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditCarModal(false)}
              style={{ marginLeft: '20px' }}
              >
              Cancelar
            </Button>
            </Card.Footer>
          </Card>
      </Modal>
      <Modal show={removeImgModal} onHide={() => setRemoveImgModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Estás qué quieres eliminar está imagen?</Modal.Title>
        </Modal.Header>
          <img
            style={{margin: '0 auto', cursor: 'pointer'}}
            className="d-block w-50"
            src={currentRemoveEditImg}
            alt="First slide"
          />
        <Modal.Body>
            <Button onClick={() => {
              
              const removeImg = currentEditImages.filter((img) => img !== currentRemoveEditImg && img);
              setRemoveImgModal(false)
              setCurrentEditImages(removeImg);
              setImagesNotRemoved(removeImg);
              // Adjust index if the current index is now out of bounds
            if (index >= setCurrentEditImages.length) {
                setIndex(setCurrentEditImages.length - 1);
            }
            }}>
              Eliminar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setRemoveImgModal(false)}
              style={{ marginLeft: '20px' }}
            >
              Cancelar
            </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

