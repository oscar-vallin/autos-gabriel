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
  Spinner,
  ModalBody,
} from 'react-bootstrap';
import { CarouselItemStyled } from './cars.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { deleteCarAndImages, editCarStore, getStorageData, deleteSpecificImages} from '../../firebase/crudFireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useAuth } from '../../context/authContext';

import { Message } from '../../components/message/Message';
import { motion } from 'framer-motion';

import styled from 'styled-components';

const StyledForm = styled(Form)`
  margin: 20px 0;
`;

export const CarsPage = () => {
  const [cars, setCars] = useState([]);

  const { currentUser } = useAuth();
  const [uploadError, setUploadError] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [files, setFiles] = useState([]);
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
  const [showSpinner, setShowSpinner] = useState(false);
  const [viewFullImgModal, setViewFullImgModal] = useState(false);
  const [currentFullImg, setCurrentFullImg] = useState('');

  const fetchCars = async () => {
    const carsCollectionRef = collection(firestore, 'cars');
    const querySnapshot = await getDocs(carsCollectionRef);
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(cars)
    return cars;
  };

  const renderCard = () => {
    if (cars.length) {
      return (
        <Row>
        {cars.map((car, index) => (
          <Col md="12" lg="6" key={index}>
            <Card style={{ marginBottom: '50px', borderRadius: '20px', boxShadow: '0 4px 8px #666666' }}>
            <Carousel prevIcon={carouselArrows('prev')} nextIcon={carouselArrows('next')}  >
              {car.images.map((imageCar, indexCar) => (
                <Carousel.Item key={imageCar.id}>
                  <img
                    className="d-block w-100"
                    src={imageCar}
                    alt="First slide"
                    style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', cursor: 'pointer', maxHeight: '400px' }}
                    onClick={() => {
                      setCurrentFullImg(imageCar);
                      setViewFullImgModal(true);
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title><i className="fa fa-car" style={{ marginRight: '5px' }}></i>{car.name} </Card.Title>
              <Card.Text>
                <p><i className="fa fa-info-circle" style={{marginRight: '5px'}}></i>{car.description}</p>
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
      )
    }

    return null;
  }

 
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
    setImagesNotRemoved(car.images)
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
        window.location.reload();
      }, 2000)
    } else {
      setUploadError(true);
      setRemoveCarModal(false);
    }
  };

  const handleImageChange = (e) => {
    setFiles([...e.target.files]);
    const newImages = Array.from(e.target.files).map((file) => ({
      ...file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setCurrentEditImages((prevImages) => [...prevImages, ...newImages.map((ni) => ni.preview)]);
    setNewImages(newImages);
  };

  const editCar = async () => {
    setShowSpinner(true);
    const imageUrls = [];
    const storageData = await getStorageData(newEditData.nameDirectory);
    const getImgaesRemoved = [];
    storageData.forEach((data) => {
      if (imagesNotRemoved.indexOf(data.url) === -1) {
        getImgaesRemoved.push(data.names);
      }
    })
    const uploadImages = [];
    newImages.forEach((newImage) => {
      const uploadImage = files.find((file) => file.name === newImage.name && file);
      if(files.indexOf(uploadImage.name) === -1) {
        uploadImages.push(uploadImage);
      }

    });

    await deleteSpecificImages(getImgaesRemoved, newEditData.nameDirectory);
    for (const image of uploadImages) {
      const imageRef = await ref(storage, `cars/${newEditData.nameDirectory}/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    for (const imageNotRemoved of imagesNotRemoved) {
      imageUrls.push(imageNotRemoved);
    }
    const edit = editCarStore(newEditData, imageUrls);

    if (edit) {
      setShowSpinner(false);
      setUploadSuccess(true);
      setTimeout(async () => {
        window.location.reload();
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

  const carouselArrows = (typeIcon) => <CarouselItemStyled className={`carousel-control-${typeIcon}-icon`} />

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
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 10, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3rem', letterSpacing: '3px', marginBottom: '40px' }}>
          Nuestros Coches
        </h2>
        </motion.div>
      </Row>
      {renderCard()}
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
          { showSpinner && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
          </div>
          {uploadSuccess && <Message type="success">El vehículo se editó correctamente</Message>}
          {!currentEditImages.length && <Message type="warning">Al menos debes cargar una imagén</Message>}
          <Card>
            {<Carousel interval={null} >
            {!showSpinner && currentEditImages.map((imageCar, indexCar) => (
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
              </Carousel>}
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
            {!showSpinner && <Button disabled={!currentEditImages.length} onClick={editCar}>
              Editar
            </Button>}
            {!showSpinner && <Button
              variant="secondary"
              onClick={() => setEditCarModal(false)}
              style={{ marginLeft: '20px' }}
              >
              Cancelar
            </Button>}
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
              const removeNewImg = newImages.filter((img) => img.preview !== currentRemoveEditImg && img);
              const removeImg = currentEditImages.filter((img) => img !== currentRemoveEditImg && img);
              setRemoveImgModal(false)
              setCurrentEditImages(removeImg);
              setImagesNotRemoved(removeImg);
              setNewImages(removeNewImg);
              // Adjust index if the current index is now out of bounds
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
      <Modal show={viewFullImgModal} onHide={() => setViewFullImgModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <ModalBody  style={{margin: '0 auto'}}>
          <img 
            src={currentFullImg}
            alt='img'
            style={{width: '100%', height: '400px', borderRadius: '10px'}}
          />
        </ModalBody>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setViewFullImgModal(false)}
            style={{ marginLeft: '20px' }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

