import React, { useEffect, useState } from 'react';
import { storage, firestore } from '../../firebase/firebase'; // Adjust the import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import {
  Form,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Spinner,
} from 'react-bootstrap';
import { Message } from '../../components/message/Message';
import styled from 'styled-components';
import { handleLogout } from '../../firebase/authFireBase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const StyledDiv = styled(Container)`
  margin-top: 30px;
`;

const StyledInput = styled(Form.Control)`
  margin-bottom: 10px;
  border: 3px solid rgba(13,110,253,.25);
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const RegisterCarPage = () => {
  const [images, setImages] = useState([]);
  const [currentImgs, setCurrentImgs] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [filesCompleted, setFilesCompleted] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
    const newImages = Array.from(e.target.files).map((file) => ({
      ...file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setCurrentImgs((prevImages) => [...prevImages, ...newImages]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const imageUrls = [];
    const randomNum = Math.round(Math.random(0,100)*100);
    // const userId = uuidv4();
    try {
      for (const image of images) {
        const imageRef = await ref(storage, `cars/${name}_${randomNum}/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
      
      // Save the car data to Firestore
      const carDoc = {
        name: name,
        price: price,
        description: description,
        images: imageUrls,
        nameDirectory: `${name}_${randomNum}`,
      };
      
      await addDoc(collection(firestore, `cars/`), carDoc);
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
      setUploadError(false);

      setImages([]);
      setCurrentImgs([]);
      setName('');
      setDescription('');
      setPrice('');

    } catch (error) {
      setUploadError(true);
      setUploadSuccess(false);
    }
  };

  const disableUpload = () => {
    if (!filesCompleted) {
      return true;
    }

    if (uploading){
      return true
    }

    return false;

  };

  const handleRemoveImage = (name) => {
    const newImages = images.filter((image) => image.name !== name && image);
    const newCurrentImg = currentImgs.filter((image) => image.name !== name && image);
    setImages(newImages);
    setCurrentImgs(newCurrentImg);
  };

  useEffect(() => {
    if (
      name.trim() !== '' &&
      price.trim() !== '' &&
      description.trim() !== '' &&
      images.length
    ) {
      setFilesCompleted(true)
    } else {
      setFilesCompleted(false)
    }
  }, [name, price, description, images]);

  return (
    <StyledDiv>
      {!uploadSuccess && !uploading && disableUpload() && <Message type="info">Todos los campos son obligatorios</Message>}
      {uploadSuccess && <Message type="success">Los datos se subieron correctamente</Message>}
      {uploadError && <Message type="error">Hubo un error al subir la información!</Message>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        { uploading && <Spinner
          style={{ 
            color: 'blue',
            fontSize: '100px',
            width: '5rem',
            height: '5rem',
            }} 
            animation="border"
            role="status"
          >
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      </div>
      {!uploading && <Row>
      <Col md="12" lg="6">
      <Form.Group>
      <Form.Label>Nombre del vehículo</Form.Label>
        <StyledInput
          type="text"
          placeholder="Nombre del vehículo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Precio del vehículo</Form.Label>
         <StyledInput
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Form.Label>Descripción del vehículo</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Descripción del vehículo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '10px', border: '3px solid rgba(13,110,253,.25)' }}
        />
        <Form.Label>Subir Imagenes</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ marginBottom: '10px', border: '1px solid #000' }}
        />
        <Button
          onClick={handleUpload}
          disabled={disableUpload()}
          style={{ marginTop: '40px' }}
        >
          {uploading ? 'Subiendo Imagenes...' : 'Agregar nuevo Vehículo'}
        </Button>
      </Form.Group>
      <ListGroup>
        {images.map((image, index) => (
          <ListGroup.Item
          style={{
            maxWidth: '600px',
            width: '100%',
            margin: '10px 0 10px 0'
          }}
          key={index}
          >
          {image.name}
          <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleRemoveImage(image.name)}
              style={{ cursor: 'pointer', color: 'red', paddingLeft: '40px' }}
            />
        </ListGroup.Item>
        ))}
      </ListGroup>
      </Col>
      <Col md="12" lg="6" style={{ marginTop: '20px' }}>
        <h5>Así se va mostrar el coche en la pagina principal</h5>
      <Card style={{ marginBottom: '30px', borderRadius: '20px', boxShadow: '0 4px 8px #666666' }}>
            <Carousel >
              {currentImgs.map((imageCar, indexCar) => (
                <Carousel.Item key={indexCar}>
                  <img
                    className="d-block w-100"
                    src={imageCar.preview}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title><i className="fa fa-car" style={{ marginRight: '5px' }}></i>{name} </Card.Title>
              <Card.Text>
                <p> <i className="fa fa-info-circle" style={{ marginRight: '5px' }}></i>{description}</p>
                <p> <FontAwesomeIcon icon={faDollarSign} /> {price}</p>
              </Card.Text>
            </Card.Body>
            <Button
              style={{ margin: '0 auto', marginBottom: '20px', fontWeight: '400' }}
              variant="info"
              disabled
            >
              Estoy Interesado
              <i className="fa fa-phone" style={{ marginLeft: '10px' }}></i> 
            </Button>
            </Card>
      </Col>
      </Row>}
     {!uploading && <div style={{ marginBottom: '30px', marginTop: '30px' }}>
      <Link to="/">
          Pagina Principal
      </Link>
      <Link onClick={handleLogout} variant="secondary" style={{ marginLeft: '20px' }}>
        Salir de la sesión
      </Link>
      </div>}
    </StyledDiv>
  );
};

