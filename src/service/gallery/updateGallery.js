export const updateGallery = async (board) => {
  const { ID, TITLE, DESCRIPTION, IMAGE_URLS, THUMBNAIL_IMG } = board;

  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("TITLE", TITLE);
  formData.append("DESCRIPTION", DESCRIPTION);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  formData.append("THUMBNAIL_IMG", THUMBNAIL_IMG);
  await fetch(`${process.env.REACT_APP_API_GALLERY_URL}/updateGallery.php`, {
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
