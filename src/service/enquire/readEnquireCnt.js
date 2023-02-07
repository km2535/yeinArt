export const readEnquireCnt = async (setTotalCnt) => {
  fetch(`${process.env.REACT_APP_API_ENQUIRE_URL}/enquireCount.php`, {
    method: "POST",
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
