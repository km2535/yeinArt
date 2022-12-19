import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { writeEnquire, writeImage } from "./database";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

export const upload = async (file, title, content, uid, setDelay) => {
  const id = uid || uuidv4();
  const storage = getStorage();
  const now = moment().format("YY-MM-DD HH:mm:ss");
  const fileLength = file.length;
  console.log(fileLength);
  file.map((file) =>
    file.thumbnail
      ? resizeFile(
          ref(storage, `images/${id}/thumb/${file.id}`),
          file.file,
          title,
          content,
          id,
          now,
          fileLength,
          setDelay
        )
      : resizeFile(
          ref(storage, `images/${id}/sub/${file.id}`),
          file.file,
          title,
          content,
          id,
          now,
          fileLength,
          setDelay
        )
  );
};

const url = [];
const resizeFile = async (
  storageRef,
  img,
  title,
  content,
  id,
  date,
  fileLength,
  setDelay
) => {
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
            .then((downloadURL) => url.unshift(downloadURL))
            .then(() => {
              writeImage(id, title, content, url, date);
              console.log(url);
              if (url.length === fileLength) {
                console.log("업로드 완료");
                setDelay(true);
              }
            })
        : getDownloadURL(snapshot.ref)
            .then((downloadURL) => url.push(downloadURL))
            .then(() => {
              writeImage(id, title, content, url, date);
              console.log(url);
              if (url.length === fileLength) {
                console.log("업로드 완료");
                setDelay(true);
              }
            });
    });
  });
};

// 의뢰하기
export const enquireUpload = async (file, products, setDelay) => {
  const id = uuidv4();
  const storage = getStorage();
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  const imgUrls = [];
  const fileUrls = [];
  const fileLength = file.length;
  if (file.length === 0) {
    console.log("파일이 없는 함수");
    writeEnquire(id, imgUrls, fileUrls, products);
    setDelay(true);
  }
  file.map((file) =>
    fileUpload(
      id,
      file,
      products,
      imgUrls,
      fileUrls,
      storage,
      options,
      fileLength,
      setDelay
    )
  );
};

const fileUpload = async (
  id,
  file,
  products,
  imgUrls,
  fileUrls,
  storage,
  options,
  fileLength,
  setDelay
) => {
  file.type.includes("image")
    ? imageCompression(file, options).then((v) => {
        uploadBytes(ref(storage, `enquire/${id}/image/${file.name}`), v).then(
          (snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((imgUrl) => imgUrls.push({ imgUrl: imgUrl }))
              .then(() => {
                writeEnquire(id, imgUrls, fileUrls, products);
                if (imgUrls.length + fileUrls.length === fileLength) {
                  console.log("파일업로드 완료");
                  setDelay(true);
                }
              });
          }
        );
      })
    : uploadBytes(ref(storage, `enquire/${id}/file/${file.name}`), file).then(
        (snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((fileUrl) => fileUrls.push({ fileUrl: [file.name, fileUrl] }))
            .then(() => {
              writeEnquire(id, imgUrls, fileUrls, products);
              if (imgUrls.length + fileUrls.length === fileLength) {
                console.log("파일업로드 완료");
                setDelay(true);
              }
            });
        }
      );
};
