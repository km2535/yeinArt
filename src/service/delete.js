import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { deleteImg } from "./database";

export const deleteImage = async (id) => {
  const storage = getStorage();
  const thumbRef = ref(storage, `images/${id}/thumb`);
  const subRef = ref(storage, `images/${id}/sub`);
  const allRef = [];
  listAll(thumbRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        allRef.push(itemRef.fullPath);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      listAll(subRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            allRef.push(itemRef.fullPath);
          });
        })
        .then(() => {
          allRef.map((fullPath) =>
            deleteObject(ref(storage, `${fullPath}`)).catch((error) => {
              console.log(error);
            })
          );
        })
        .then(() => {
          deleteImg(id);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};
