export const removeGalleryItem = async (board) => {
  const { ID } = board;
  const formData = new FormData();
  formData.append("ID", ID);
  await fetch(
    `${process.env.REACT_APP_API_GALLERY_URL}/removeGalleryItem.php`,
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
