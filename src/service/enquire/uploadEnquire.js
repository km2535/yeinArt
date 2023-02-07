export const uploadEnquire = async (gallery) => {
  const {
    ID,
    PASSWORD,
    WRITER,
    TITLE,
    DESCRIPTION,
    WORK_DATE,
    DEPART_ADDRESS,
    ARRIVAL_ADDRESS,
    FILE_URLS,
    IMAGE_URLS,
  } = gallery;
  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("PASSWORD", PASSWORD);
  formData.append("WRITER", WRITER);
  formData.append("TITLE", TITLE);
  formData.append("DESCRIPTION", DESCRIPTION);
  formData.append("WORK_DATE", WORK_DATE);
  formData.append("DEPART_ADDRESS", DEPART_ADDRESS);
  formData.append("ARRIVAL_ADDRESS", ARRIVAL_ADDRESS);
  formData.append("FILE_URLS", FILE_URLS);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  await fetch(`${process.env.REACT_APP_API_ENQUIRE_URL}/uploadEnquire.php`, {
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
