export const readEnquireDetail = async (data) => {
  const { enquireId, setEnquire } = data;
  const formData = new FormData();
  formData.append("ID", enquireId);
  fetch(`${process.env.REACT_APP_API_ENQUIRE_URL}/readEnquire.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setEnquire(res);
    });
};
