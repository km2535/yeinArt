import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { dbNotice, writeImage } from "./database";
import { v4 as uuidv4 } from "uuid";

export const upload = async (file, title, uid) => {
  const id = uid || uuidv4();
  const storage = getStorage();
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
  imageCompression(img, options).then((v) => {
    uploadBytes(storageRef, v).then((snapshot) => {
      snapshot.metadata.fullPath.includes("thumb")
        ? getDownloadURL(snapshot.ref)
            .then((downloadURL) => (url[0] = downloadURL))
            .then(() => writeImage(id, title, url, date))
        : getDownloadURL(snapshot.ref)
            .then(
              (downloadURL) => url.push(downloadURL)
              //writeUserData(title, downloadURL)
            )
            .then(() => writeImage(id, title, url, date));
    });
  });
};

export const uploadNotice = async (file, title, content, num, uid) => {
  const id = uid || uuidv4();
  const storage = getStorage();
  resizeAndUpload(file, title, content, num, id, storage);
};

const resizeAndUpload = async (file, title, content, num, id, storage) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  const urls = [];
  file.map((file) =>
    file.loader === "file1"
      ? imageCompression(file.file, options).then((v) => {
          uploadBytes(
            ref(storage, `notice/${id}/image/${file.file.name}`),
            v
          ).then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((imgUrl) => urls.unshift({ imgUrl: imgUrl }))
              .then(() => dbNotice(id, title, file.date, content, num, urls));
          });
        })
      : uploadBytes(
          ref(storage, `notice/${id}/file/${file.file.name}`),
          file.file
        ).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((fileUrl) => urls.push({ fileUrl: fileUrl }))
            .then(() => dbNotice(id, title, file.date, content, num, urls));
        })
  );
};
