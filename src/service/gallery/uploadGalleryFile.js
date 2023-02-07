export const uploadGalleryFile = async (imgFiles, gallery) => {
  const { ID } = gallery;
  for (let i = 0; i < imgFiles.length; i++) {
    const formData = new FormData();
    formData.append("fileId", ID);
    formData.append("path", "images");
    formData.append("filename", imgFiles[i]?.name);
    formData.append("userfile", imgFiles[i]);
    await fetch(
      `${process.env.REACT_APP_API_GALLERY_URL}/uploadGalleryFile.php`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.text());
  }
};
