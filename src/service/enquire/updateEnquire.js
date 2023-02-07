export const updateEnquire = async (board) => {
  const {
    ID,
    TITLE,
    WORK_DATE,
    DESCRIPTION,
    IMAGE_URLS,
    FILE_URLS,
    ARRIVAL_ADDRESS,
    DEPART_ADDRESS,
  } = board;

  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("TITLE", TITLE);
  formData.append("WORK_DATE", WORK_DATE);
  formData.append("DESCRIPTION", DESCRIPTION);
  formData.append("DEPART_ADDRESS", DEPART_ADDRESS);
  formData.append("ARRIVAL_ADDRESS", ARRIVAL_ADDRESS);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  formData.append("FILE_URLS", FILE_URLS);
  await fetch(`${process.env.REACT_APP_API_ENQUIRE_URL}/updateEnquire.php`, {
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
