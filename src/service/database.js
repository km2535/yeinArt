import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";
import moment from "moment/moment";

export const writeImage = async (id, title, content, url, date) => {
  await setDoc(doc(db, "gallery", id), {
    title: title,
    date: date,
    content: content,
    tumbnailUrl: url[0],
    subUrl1: url[1] || "",
    subUrl2: url[2] || "",
    subUrl3: url[3] || "",
    subUrl4: url[4] || "",
    subUrl5: url[5] || "",
  });
};

export const readData = async (collectionName, sessionName) => {
  console.log("reading 발생");
  const q = query(collection(db, collectionName), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });
  data.length !== 0 &&
    window.sessionStorage?.setItem(sessionName, JSON.stringify(data));
  return data;
};

export const firstRead = async (setPageData) => {
  console.log("처음 reading 발생");
  const q = query(collection(db, "gallery"), orderBy("date", "desc"), limit(6));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });
  data.length !== 0 &&
    window.sessionStorage?.setItem("firstRead", JSON.stringify(data));
  setPageData(data);
};

export const deleteImg = async (id) => {
  await updateDoc(doc(db, "gallery", id), {
    date: deleteField(),
    subUrl1: deleteField(),
    subUrl2: deleteField(),
    subUrl3: deleteField(),
    subUrl4: deleteField(),
    subUrl5: deleteField(),
    title: deleteField(),
    tumbnailUrl: deleteField(),
  }).then(() => deleteDoc(doc(db, "gallery", id)));
};

export const readProduct = async (collectionName, sessionName) => {
  console.log("reading readProduct[0] 발생");
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  data.length !== 0 &&
    window.sessionStorage?.setItem(sessionName, JSON.stringify(data));
  return data;
};

export const writeEnquire = async (id, imgUrls, fileUrls, product) => {
  const now = moment().format("YY-MM-DD HH:mm:ss");
  await setDoc(doc(db, "enquire", id), {
    date: now,
    workdate: product.workdate,
    title: product.title,
    content: product.cont,
    userEmail: product.userEmail,
    userName: product.userName,
    departAddress: product.departAddress,
    arrivalAddress: product.arrivalAddress,
    password: product.password,
    imgUrls,
    fileUrls,
  }).catch((e) => console.log(e));
};
export const deleteEnquire = async (id) => {
  await updateDoc(doc(db, "enquire", id), {
    date: deleteField(),
    workdate: deleteField(),
    title: deleteField(),
    content: deleteField(),
    userEmail: deleteField(),
    userName: deleteField(),
    departAddress: deleteField(),
    arrivalAddress: deleteField(),
    password: deleteField(),
    imgUrls: deleteField(),
    fileUrls: deleteField(),
  }).then(() => deleteDoc(doc(db, "enquire", id)));
};
