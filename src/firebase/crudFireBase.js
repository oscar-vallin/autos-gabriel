import { firestore, storage} from './firebase';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const deleteCar = async (carId) => {
  const carDocRef = doc(firestore, 'cars', carId);
  await deleteDoc(carDocRef);
};



export const deleteCarImages = async (carId, path) => {
  const carImagesRef = ref(storage, `cars/${path}/`);
  const { items } = await listAll(carImagesRef);

  for (const itemRef of items) {
    await deleteObject(itemRef);
  }
};

export const editCarStore = async (dataCar, images) => {
  
  const documentRef = doc(firestore, "cars", dataCar.id);
  const { name, description, price } = dataCar;
  try {
    await updateDoc(documentRef, {
      name,
      price,
      description, 
      images,
    });
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
}


export const deleteCarAndImages = async (carId, path) => {
  try {
    await deleteCar(carId);
    await deleteCarImages(carId, path);
    return true;
  } catch (error) {
    return false;
  }
};