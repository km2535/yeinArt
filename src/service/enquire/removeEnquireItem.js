export const removeEnquireItem = async (board) => {
  const { ID } = board;
  const formData = new FormData();
  formData.append("ID", ID);
  await fetch(
    `${process.env.REACT_APP_API_ENQUIRE_URL}/removeEnquireItem.php`,
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
