export const updateEnquireReadCnt = async (boardId) => {
  const { enquireId, READ_CNT } = boardId;
  const formData = new FormData();
  formData.append("ID", enquireId);
  formData.append("READ_CNT", READ_CNT);
  await fetch(
    `${process.env.REACT_APP_API_ENQUIRE_URL}/updateEnquireReadCnt.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
