export const removeEnquireFile = async (board) => {
  const { ID } = board;
  const formData = new FormData();
  formData.append("fileId", ID);
  await fetch(
    `${process.env.REACT_APP_API_ENQUIRE_URL}/removeEnquireFile.php`,
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
