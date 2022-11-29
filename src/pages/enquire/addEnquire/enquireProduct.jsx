import React, { useEffect, useRef, useState } from "react";
import styles from "./enquireProduct.module.css";
import { readProduct } from "../../../service/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
export default function EnquireProduct({
  addProduct,
  id,
  setAddProduct,
  setTotalPrice,
}) {
  const [product, setProduct] = useState([]);
  const divRef = useRef();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const values = document.querySelectorAll(".price");
    const prices = [];
    values.forEach((element) => prices.push(Number(element.value)));
    setTotalPrice(prices.reduce((acc, curr) => acc + curr, 0));
  }, [addProduct, price, setTotalPrice]);

  useEffect(() => {
    const session = window.sessionStorage.getItem("product");
    session || readProduct("productInfo", "product").then((v) => setProduct(v));
    session && setProduct(JSON.parse(session));
  }, []);
  const selectProduct = (e) => {
    setPrice(e.target.value);
  };
  const removeProductHandler = () => {
    addProduct.length > 1 &&
      setAddProduct((prev) => [...prev].filter((v) => v !== id));
  };
  const countSetting = (e) => {
    setPrice((prev) => prev * e.target.value);
  };
  const selectWeight = (e) => {
    setPrice((prev) => prev * e.target.value);
  };
  return (
    <>
      <div className={styles.productsInfo} id={id} ref={divRef}>
        <select
          onChange={selectProduct}
          className={styles.selectProduct + " productInfo"}
        >
          <option value="0">제품을 선택하세요</option>
          {product[0] &&
            Object.entries(product[0])
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map((v) => (
                <option key={v} value={v[1]}>
                  {v[0]}
                </option>
              ))}
        </select>
        <div className={styles.countName}>수량</div>
        <input
          className={styles.count + " count"}
          type="number"
          step={1}
          min={1}
          defaultValue={1}
          onChange={countSetting}
        />
        <div className={styles.countName}>무게</div>
        <select
          className={styles.selectWeight + " weight"}
          onChange={selectWeight}
        >
          <option value="1.1">5kg</option>
          <option value="1.2">10kg</option>
          <option value="1.3">15kg</option>
          <option value="1.4">20kg</option>
          <option value="1.5">25kg</option>
          <option value="1.6">30kg</option>
          <option value="1.7">35kg</option>
          <option value="1.8">40kg</option>
          <option value="1.9">45kg</option>
          <option value="2.0">50kg</option>
          <option value="2.1">55kg</option>
          <option value="2.2">60kg</option>
          <option value="2.3">65kg</option>
          <option value="2.4">70kg</option>
          <option value="2.5">75kg</option>
          <option value="2.6">80kg</option>
        </select>
        <div className={styles.price}>
          <input type="text" value={price} disabled className="price" />
        </div>
        <div className={styles.remove} onClick={removeProductHandler}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </div>
      </div>
    </>
  );
}
