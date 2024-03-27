import React, { useState } from 'react';
import { storage, firestore } from '../../firebase/firebase'; // Adjust the import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { Message } from '../../components/message/Message';
import styled from 'styled-components';
import { handleLogout } from '../../firebase/authFireBase';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  margin: 20px;
`;

const StyledInput = styled(Form.Control)`
  margin-bottom: 10px;
`;

export const RegisterCarPage = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [nameDirectory, setNameDirectory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const imageUrls = [];
    // const userId = uuidv4();
    try {
      for (const image of images) {
        const imageRef = await ref(storage, `cars/${nameDirectory}/${image.name}`);
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
        nameDirectory,
      };
      
      await addDoc(collection(firestore, `cars/`), carDoc);
      setUploading(false);
      setUploadSuccess(true);
      setUploadError(false);

      setImages([]);
      setName('');
      setNameDirectory('');
      setDescription('');
      setPrice('');

    } catch (error) {
      setUploadError(true);
      setUploadSuccess(false);
    }
  };

  return (
    <StyledDiv>
      {uploadSuccess && <Message type="success">Los datos de subieron correctamente</Message>}
      {uploadError && <Message type="error">Hubo un error al subir la información!</Message>}
      <Form.Group>
        <StyledInput
          type="text"
          placeholder="Nombre del vehículo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         <StyledInput
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
          <StyledInput
          type="text"
          placeholder="Nombre del directorio"
          value={nameDirectory}
          onChange={(e) => setNameDirectory(e.target.value)}
        />
        <Form.Control
          as="textarea"
          placeholder="Descripción del vehículo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Form.Control
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ marginBottom: '10px' }}
        />
        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Subiendo Imagenes...' : 'Subir Imagenes'}
        </Button>
      </Form.Group>
      <ListGroup>
        {images.map((image, index) => (
          <ListGroup.Item key={index}>{image.name}</ListGroup.Item>
        ))}
      </ListGroup>
      <div style={{ marginBottom: '40px' }}/>
      <Link to="/">
          Pagina Principal
      </Link>
      <Link onClick={handleLogout} variant="secondary" style={{ marginLeft: '20px' }}>
        Salir de la sesión
      </Link>
    </StyledDiv>
  );
};

