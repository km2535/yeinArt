import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../components/context/AuthContext";
import styles from "./enquireDetail.module.css";
import { v4 as uuidv4 } from "uuid";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import { deleteEnquire } from "../../../service/database";
export default function EnquireDetail() {
  const { fbuser, kauser } = useAuthContext();
  const [currentUser, setCurrentUser] = useState();
  const {
    state: { id, value },
  } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (fbuser === null && kauser === undefined) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
    }
  }, [fbuser, kauser, navigate]);
  useEffect(() => {
    if (fbuser) {
      setCurrentUser(fbuser.email);
    }
    if (kauser) {
      setCurrentUser(kauser.kakao_account.email);
    }
  }, [fbuser, kauser]);
  const deleteHandler = () => {
    deleteEnquire(id).then(() => {
      window.location.replace("/");
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.name}>제목</div>
          <div className={styles.titleContent}>{value.title}</div>
        </div>
        <div className={styles.date}>
          <div className={styles.name}>작업요청일</div>
          <div className={styles.workdateContent}>{value.workdate}</div>
        </div>
        <div className={styles.user}>
          <div className={styles.name}>의뢰인</div>
          <div className={styles.userEmail}>{value.userEmail}</div>
        </div>
        <div className={styles.enquireContent}>
          <div className={styles.name}>내용</div>
          <div className={styles.contContent}>{value.content}</div>
        </div>
        <div className={styles.departure}>
          <div className={styles.name}>출발지</div>
          <div className={styles.arrAddrContent}>{value.arrivalAddress}</div>
        </div>
        <div className={styles.arrival}>
          <div className={styles.name}>도착지</div>
          <div className={styles.depAddrContent}>{value.departAddress}</div>
        </div>
        <div className={styles.distance}>
          <div className={styles.name}>총 거리 / 이동시간</div>
          <div className={styles.distAndDura}>
            {value.distanceTo} / {value.durationTo}
          </div>
        </div>
        <div className={styles.name}>제품 정보</div>
        {value.datas.map((v) => (
          <div className={styles.productsInfo} key={uuidv4()}>
            <div className={styles.countName}>제품</div>
            <div className={styles.productInfo}>{v.productInfo}</div>
            <div className={styles.countName}>수량</div>
            <div className={styles.count}>{v.count}</div>
            <div className={styles.countName}>무게</div>
            <div className={styles.weight}>{v.weight}</div>
          </div>
        ))}
        <div className={styles.totalInfo}>
          예상비용
          <div className={styles.totalInfoContent}>{value.totalPrice}</div>원
          입니다.
        </div>
        <div className={styles.deletBtn}>
          {currentUser === value.userEmail && (
            <MoveControl
              doNotMove={true}
              styleOption={[{ top: "0" }, { left: "80%" }]}
              buttonName={"삭제하기"}
              deleteHandler={deleteHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}
