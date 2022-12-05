import React, { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
export default function Search({ totalData, setPageDate }) {
  const selectRef = useRef();
  const [searchMethod, setSeachMethod] = useState("");
  const [searchValue, setSeachValue] = useState("");
  useEffect(() => {
    const selectindex = selectRef.current.options.selectedIndex;
    setSeachMethod(selectRef.current.options[selectindex].value);
  }, []);
  const changeSearch = (e) => {
    setSeachMethod(e.target.value);
  };
  const inputSearch = (e) => {
    setSeachValue(e.target.value);
  };
  const searchFunc = () => {
    switch (searchMethod) {
      case "title":
        setPageDate(
          totalData.filter((v) => v.value.title.includes(searchValue))
        );
        break;
      case "userName":
        setPageDate(
          totalData.filter((v) => v.value.userName.includes(searchValue))
        );
        break;
      case "content":
        setPageDate(
          totalData.filter((v) => v.value.content.includes(searchValue))
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <select
          onChange={changeSearch}
          ref={selectRef}
          className={styles.search}
        >
          <option value="title">제목</option>
          <option value="userName">글쓴이</option>
          <option value="content">내용</option>
        </select>
        <input type="text" onChange={inputSearch} className={styles.input} />
      </div>
      <button onClick={searchFunc} className={styles.searchBtn}>
        검색
      </button>
    </div>
  );
}
