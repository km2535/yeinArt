export const deleteReply = async (id) => {
  const formData = new FormData();
  formData.append("ID", id);
  fetch(`${process.env.REACT_APP_API_REPLY_URL}/deleteReply.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => res);
};
