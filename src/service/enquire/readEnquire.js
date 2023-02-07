export const readEnquire = async (startPage, endPage, setBoards) => {
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  fetch(`${process.env.REACT_APP_API_ENQUIRE_URL}/readEnquireList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setBoards(res);
    });
};
