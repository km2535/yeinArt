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
  const q = query(collection(db, collectionName), orderBy("date", "asc"));
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
  const q = query(collection(db, "gallery"), orderBy("date", "asc"), limit(6));
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
