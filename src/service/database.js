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
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

export const writeImage = async (id, title, url, date) => {
  await setDoc(doc(db, "gallery", id), {
    title: title,
    date: date,
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
    window.sessionStorage.setItem(sessionName, JSON.stringify(data));
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
  setPageData(data);
  data.length !== 0 &&
    window.sessionStorage.setItem("firstImgs", JSON.stringify(data));
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

export const dbNotice = async (id, title, date, content, num, urls) => {
  await setDoc(doc(db, "notice", id), {
    id: id,
    title: title,
    date: date,
    urls: urls,
    content: content,
    num: num,
    read: 0,
  });
};

export const deleteNotice = async (id) => {
  await updateDoc(doc(db, "notice", id), {
    id: deleteField(),
    title: deleteField(),
    date: deleteField(),
    urls: deleteField(),
    content: deleteField(),
    num: deleteField(),
    read: deleteField(),
  }).then(() => deleteDoc(doc(db, "notice", id)));
};

// 조회수 상승 함수
export const noticeRead = async (id, readcnt) => {
  await updateDoc(doc(db, "notice", id), {
    read: readcnt,
  });
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
    window.sessionStorage.setItem(sessionName, JSON.stringify(data));
  return data;
};

export const writeEnquire = async (product) => {
  const id = uuidv4();
  const now = moment().format("YY-MM-DD HH:mm:ss");
  await setDoc(doc(db, "enquire", id), {
    date: now,
    workdate: product[0].workdate,
    title: product[0].title,
    content: product[0].content,
    userEmail: product[0].userEmail,
    departAddress: product[0].departAddress,
    arrivalAddress: product[0].arrivalAddress,
    distanceTo: product[0].distanceTo,
    durationTo: product[0].durationTo,
    datas: product[0].datas,
    totalPrice: product[0].totalPrice,
  });
};
export const deleteEnquire = async (id) => {
  console.log(id);
  await updateDoc(doc(db, "enquire", id), {
    date: deleteField(),
    workdate: deleteField(),
    title: deleteField(),
    urls: deleteField(),
    content: deleteField(),
    userEmail: deleteField(),
    departAddress: deleteField(),
    arrivalAddress: deleteField(),
    distanceTo: deleteField(),
    durationTo: deleteField(),
    datas: deleteField(),
    totalPrice: deleteField(),
  }).then(() => deleteDoc(doc(db, "enquire", id)));
};
