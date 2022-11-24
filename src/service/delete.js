import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { deleteImg, deleteNotice } from "./database";

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

export const deleteData = async (id) => {
  const storage = getStorage();
  const dataRef = ref(storage, `notice/${id}`);
  const allFolder = [];
  listAll(dataRef)
    .then((res) => {
      res.prefixes.forEach((folder) => {
        allFolder.push(folder.fullPath);
      });
    })
    .then(() => {
      allFolder.map((folders) =>
        listAll(ref(storage, folders))
          .then((res) => {
            res.items.forEach((items) => {
              //allData.push(items);
              deleteObject(ref(storage, items.fullPath)).catch((err) => {
                console.log(err);
              });
            });
          })
          .then(() => {
            deleteNotice(id);
          })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
