export const uploadGallery = async (gallery) => {
  const { ID, WRITER, TITLE, DESCRIPTION, IMAGE_URLS, THUMBNAIL_IMG } = gallery;
  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("WRITER", WRITER);
  formData.append("TITLE", TITLE);
  formData.append("DESCRIPTION", DESCRIPTION);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  formData.append("THUMBNAIL_IMG", THUMBNAIL_IMG);
  await fetch(`${process.env.REACT_APP_API_GALLERY_URL}/uploadGallery.php`, {
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
