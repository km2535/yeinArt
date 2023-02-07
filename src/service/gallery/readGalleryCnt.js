export const galleryCount = async (setTotalCnt) => {
  fetch(`${process.env.REACT_APP_API_GALLERY_URL}/galleryCount.php`, {
    method: "POST",
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
