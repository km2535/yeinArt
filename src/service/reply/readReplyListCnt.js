export const readReplyListCnt = async (id, setReply) => {
  const formData = new FormData();
  formData.append("FK_ID", id);
  fetch(`${process.env.REACT_APP_API_REPLY_URL}/readReplyListCnt.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setReply(res);
    });
};
