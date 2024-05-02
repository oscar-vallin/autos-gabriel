import { firestore, storage} from './firebase';
import { ref, listAll, deleteObject, getDownloadURL } from 'firebase/storage';
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

export const getStorageData = async (path) => {
  const carImagesRef = ref(storage, `cars/${path}/`);
  const { items } = await listAll(carImagesRef);
  const urls = await Promise.all(items.map(async item => {
    return {url: await getDownloadURL(item), names: item.name}
  }));
  return urls;
};

export const deleteSpecificImages = async (images, path) => {
  try {
    const deletePromises = images.map(imageName => {
      const imageRef = ref(storage, `cars/${path}/${imageName}`);
      return deleteObject(imageRef);
    });

    await Promise.all(deletePromises);
    console.log('Specific images have been deleted successfully');
  } catch (error) {
    console.error("Error deleting specific images", error);
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