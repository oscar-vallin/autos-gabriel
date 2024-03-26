import { firestore, storage} from './firebase';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

const deleteCar = async (carId) => {
  const carDocRef = doc(firestore, 'cars', carId);
  await deleteDoc(carDocRef);
};



const deleteCarImages = async (carId, path) => {
  const carImagesRef = ref(storage, `cars/${path}/`);
  const { items } = await listAll(carImagesRef);

  for (const itemRef of items) {
    await deleteObject(itemRef);
  }
};


export const deleteCarAndImages = async (carId, path) => {
  try {
    await deleteCar(carId);
    await deleteCarImages(carId, path);
    return true;
  } catch (error) {
    return false;
  }
};