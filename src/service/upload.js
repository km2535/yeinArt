import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { writeEnquire, writeImage } from "./database";
import { v4 as uuidv4 } from "uuid";

export const upload = async (file, title, uid) => {
  const id = uid || uuidv4();
  const storage = getStorage();
  console.log(file);
  file.map((file) =>
    file.thumbnail
      ? resizeFile(
          ref(storage, `images/${id}/thumb/${file.id}`),
          file.file,
          title,
          id,
          file.date
        )
      : resizeFile(
          ref(storage, `images/${id}/sub/${file.id}`),
          file.file,
          title,
          id,
          file.date
        )
  );
};

const url = ["thumbnail"];
const resizeFile = async (storageRef, img, title, id, date) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  url.length = 0;
  imageCompression(img, options).then((v) => {
    uploadBytes(storageRef, v).then((snapshot) => {
      snapshot.metadata.fullPath.includes("thumb")
        ? getDownloadURL(snapshot.ref)
            .then((downloadURL) => (url[0] = downloadURL))
            .then(() => writeImage(id, title, url, date))
        : getDownloadURL(snapshot.ref)
            .then((downloadURL) => url.push(downloadURL))
            .then(() => writeImage(id, title, url, date));
    });
  });
};

export const enquireUpload = async (file, products) => {
  const id = uuidv4();
  const storage = getStorage();
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  const imgUrls = [];
  const fileUrls = [];
  if (file.length === 0) {
    writeEnquire(id, imgUrls, fileUrls, products);
  }
  file.map((file) =>
    file.type.includes("image")
      ? imageCompression(file, options).then((v) => {
          uploadBytes(ref(storage, `enquire/${id}/image/${file.name}`), v).then(
            (snapshot) => {
              getDownloadURL(snapshot.ref)
                .then((imgUrl) => imgUrls.push({ imgUrl: imgUrl }))
                .then(() => writeEnquire(id, imgUrls, fileUrls, products));
            }
          );
        })
      : uploadBytes(ref(storage, `enquire/${id}/file/${file.name}`), file).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((fileUrl) =>
                fileUrls.push({ fileUrl: [file.name, fileUrl] })
              )
              .then(() => writeEnquire(id, imgUrls, fileUrls, products));
          }
        )
  );
};
