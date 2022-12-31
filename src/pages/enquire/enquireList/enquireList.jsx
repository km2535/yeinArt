import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import EnquireBtn from "../../../components/common/btns/enquireBtn/enquireBtn";
import Loading from "../../../components/common/loading/loading";
import Pagination from "../../../components/common/pagination/pagination";
import Search from "../../../components/common/search/search";
import styles from "./enquireList.module.css";
import crypto from "crypto-js";
import { useAuthContext } from "../../../components/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { readReplyCnt } from "../../../service/localDatabase";

export default function EnquireList() {
  const { fbuser } = useAuthContext();
  const { totalData, isLoading } = useOutletContext();
  const [pageData, setPageDate] = useState([]);
  const [reply, setReply] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [originPassword, setOriginPassword] = useState("");
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [alerts, setAlerts] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const firstData = totalData.slice(0, 10);
    setPageDate(firstData);
  }, [totalData]);
  useEffect(() => {
    pageData.map((v) => readReplyCnt(setReply, v.id));
  }, [pageData]);
  const detailCheckHandler = (id, v) => {
    setIsModal(true);
    setOriginPassword(
      crypto.AES.decrypt(v.value.password, "abcd").toString(crypto.enc.Utf8)
    );
    setId(id);
    setValue(v);
    if (fbuser?.isAdmin === true) {
      navigate(`/enquire/${id}`, { state: v });
    }
  };

  const passwordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const passwordCheck = () => {
    if (inputPassword !== originPassword) {
      setAlerts(true);
      navigate("/enquire");
    } else {
      console.log("환영합니다.");
      navigate(`/enquire/${id}`, { state: value });
      setIsModal(false);
    }
  };
  const cancleHandler = () => {
    setAlerts(false);
    setIsModal(false);
    navigate("/enquire");
  };
  return (
    <>
      {isModal && (
        <div className={styles.modalContainer}>
          <div className={styles.isModal}>
            <div className={styles.passwordTitle}>비밀번호를 입력하세요</div>
            {alerts && (
              <div className={styles.passwordWarnning}>
                비밀번호가 일치하지 않습니다.
              </div>
            )}
            <input
              type="password"
              onChange={passwordHandler}
              className={styles.passwordInput}
            />
            <div className={styles.passwordBtns}>
              <button onClick={passwordCheck} className={styles.passwordBtn}>
                확인
              </button>
              <button onClick={cancleHandler} className={styles.passwordBtn}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        {isLoading && <Loading />}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>제목</th>
              <th></th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>작업요청일</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pageData.map((v) => (
              <tr key={v.id}>
                <td
                  className={styles.title}
                  id={v.id}
                  key={uuidv4()}
                  onClick={() => {
                    detailCheckHandler(v.id, v);
                  }}
                >
                  {v.value.title}
                </td>
                <td>
                  {reply
                    .map((data) =>
                      data.result.filter((item) => item.enquireNum === v.id)
                    )
                    .filter((result) => result.length > 0).length > 0 ? (
                    <>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faCommentDots}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td className={styles.userName}>
                  {v.value.userName &&
                    v.value.userName
                      .slice(-v.value.userName.length, 2)
                      .padEnd(v.value.userName.length, "*")}
                </td>
                <td className={styles.date}>{v.value.date}</td>
                <td className={styles.workdate}>{v.value.workdate}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr className={styles.search}>
              <td colSpan={5}>
                <Search totalData={totalData} setPageDate={setPageDate} />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className={styles.editBtn}>
              <td colSpan={5}>
                <div className={styles.enquireBtn}>
                  <EnquireBtn />
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={5}>
                <Pagination
                  totalData={totalData}
                  setPageDate={setPageDate}
                  showCnt={10}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
