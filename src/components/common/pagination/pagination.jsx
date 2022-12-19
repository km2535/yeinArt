import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
export default function Pagination({ totalData, setPageDate, showCnt }) {
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    setTotalPage(Math.ceil(totalData.length / showCnt));
  }, [totalData.length, showCnt]);

  const pageHandler = (e) => {
    const first = e.selected * showCnt;
    const last = first + showCnt;
    const newData = totalData.slice(first, last);
    setPageDate(newData);
  };

  return (
    <>
      <ReactPaginate
        nextLabel="&raquo;"
        previousLabel="&laquo;"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageRangeDisplayed={4}
        marginPagesDisplayed={3}
        pageCount={totalPage}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        onPageChange={pageHandler}
      />
    </>
  );
}
