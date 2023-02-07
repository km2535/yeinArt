export const uploadRely = async (reply) => {
  const { ID, FK_ID, WRITER, DESCRIPTION, IMAGE_URLS, FILE_URLS } = reply;
  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("FK_ID", FK_ID);
  formData.append("WRITER", WRITER);
  formData.append("DESCRIPTION", DESCRIPTION);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  formData.append("FILE_URLS", FILE_URLS);

  await fetch(`${process.env.REACT_APP_API_REPLY_URL}/addReply.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
