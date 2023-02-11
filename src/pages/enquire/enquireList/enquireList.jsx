import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import EnquireBtn from "../../../components/common/btns/enquireBtn/enquireBtn";
import Loading from "../../../components/common/loading/loading";
import styles from "./enquireList.module.css";
import crypto from "crypto-js";
import { useAuthContext } from "../../../components/context/AuthContext";
import { readEnquire } from "../../../service/enquire/readEnquire";
import ReactPaginate from "react-paginate";
import { readEnquireCnt } from "../../../service/enquire/readEnquireCnt";
import { useEnquireContext } from "../../../components/context/EnquireContext";
import { readReplyListCnt } from "../../../service/reply/readReplyListCnt";
import { BiMessageDetail } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function EnquireList() {
  const { fbuser } = useAuthContext();
  const { boards, setBoards } = useEnquireContext();
  const { isLoading } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [originPassword, setOriginPassword] = useState("");
  const [id, setId] = useState("");
  const [Item, setValue] = useState([]);
  const [alerts, setAlerts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    readEnquireCnt(setTotalCnt);
  }, [totalCnt]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const passwordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  const passwordCheck = () => {
    if (inputPassword !== originPassword) {
      setAlerts(true);
      navigate("/enquire");
    } else {
      navigate(`/enquire/${id}`, { state: { Item } });
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
              <th>번호</th>
              <th>제목</th>
              <th></th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <EnquireListItems
              totalCnt={totalCnt}
              page={currentPage}
              setIsModal={setIsModal}
              setOriginPassword={setOriginPassword}
              setValue={setValue}
              setId={setId}
              fbuser={fbuser}
              boards={boards}
              setBoards={setBoards}
            />
          </tbody>
          <tfoot className={styles.tfoot}>
            {/* <tr className={styles.search}>
              <td colSpan={6}>
                <Search totalData={boards} setPageDate={setBoards} />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
            <tr className={styles.editBtn}>
              <td colSpan={6}>
                <div className={styles.enquireBtn}>
                  <EnquireBtn />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={6}>
                <ReactPaginate
                  breakLabel={"..."}
                  previousLabel={"<"}
                  nextLabel={">"}
                  onPageChange={handlePageClick}
                  pageCount={Math.ceil(totalCnt / 10)}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  containerClassName={styles.pagination}
                  activeClassName={styles.current}
                  pageClassName={styles.item}
                  previousClassName={styles.prev}
                  nextClassName={styles.next}
                />
              </td>
              <td></td>
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

function EnquireListItems({
  page,
  setIsModal,
  setOriginPassword,
  setId,
  setValue,
  fbuser,
  setBoards,
  totalCnt,
  boards,
}) {
  useEffect(() => {
    const startPage = (page - 1) * 10;
    const endPage = 10;
    readEnquire(startPage, endPage, setBoards);
  }, [page, setBoards]);
  return (
    <>
      {boards?.map((Item, index) => (
        <List
          key={Item?.ID}
          Item={Item}
          page={page}
          totalCnt={totalCnt}
          index={index}
          setIsModal={setIsModal}
          setOriginPassword={setOriginPassword}
          setValue={setValue}
          setId={setId}
          fbuser={fbuser}
        />
      ))}
    </>
  );
}

function List({
  Item,
  setIsModal,
  setOriginPassword,
  setId,
  setValue,
  fbuser,
  page,
  index,
  totalCnt,
}) {
  const { ID, TITLE, WRITER, DATE, READ_CNT, PASSWORD } = Item;
  const [boardNum, setBoardNum] = useState(totalCnt);
  const navigate = useNavigate();
  const [isReply, setIsReply] = useState([]);
  const [enquireId, setEnquireId] = useState("");
  useEffect(() => {
    setEnquireId(ID);
    readReplyListCnt(ID, setIsReply);
  }, [ID]);
  const detailCheckHandler = (id) => {
    setIsModal(true);
    setOriginPassword(
      crypto.AES.decrypt(PASSWORD, ID).toString(crypto.enc.Utf8)
    );
    setId(ID);
    setValue(Item);
    if (fbuser?.isAdmin === true) {
      navigate(`/enquire/${id}`, { state: { enquireId } });
    }
  };
  useEffect(() => {
    const boardNumber = totalCnt - (page - 1) * 10 - index;
    if (boardNumber > 0) {
      setBoardNum(boardNumber);
    }
  }, [totalCnt, index, page]);
  return (
    <tr className={styles.trData}>
      <td className={styles.number}>{boardNum}</td>
      <td
        className={styles.title}
        id={ID}
        onClick={() => {
          detailCheckHandler(ID);
        }}
      >
        {TITLE}
      </td>
      <td className={styles.reply}>
        {isReply?.map(
          (v) =>
            v?.COUNT > 0 && (
              <div key={uuidv4()}>
                <BiMessageDetail />
              </div>
            )
        )}
      </td>
      <td className={styles.userName}>
        {WRITER && WRITER.slice(-WRITER.length, 2).padEnd(WRITER.length, "*")}
      </td>
      <td className={styles.date}>
        {moment(new Date(DATE)).format("YYYY-MM-DD")}
      </td>
      <td className={styles.workdate}>{READ_CNT}</td>
    </tr>
  );
}
