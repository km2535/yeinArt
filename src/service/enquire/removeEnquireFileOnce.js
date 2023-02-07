export const removeEnquireFileOnce = async (board) => {
  const { id, fileName } = board;
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("fileName", fileName);
  await fetch(
    `${process.env.REACT_APP_API_ENQUIRE_URL}/removeEnquireFileOnce.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return console.log(res);
    })
    .catch((err) => {
      return err;
    });
};
