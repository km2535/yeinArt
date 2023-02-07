export const uploadReplyFile = async (file, imgFiles, board) => {
  const { ID } = board;
  for (let i = 0; i < file.length; i++) {
    const formData = new FormData();
    formData.append("fileId", ID);
    formData.append("path", "files");
    formData.append("filename", file[i]?.name);
    formData.append("userfile", file[i]);
    await fetch(`${process.env.REACT_APP_API_REPLY_URL}/addReplyFile.php`, {
      method: "POST",
      body: formData,
    }).then((res) => res.text());
  }
  for (let i = 0; i < imgFiles.length; i++) {
    const formData = new FormData();
    formData.append("fileId", ID);
    formData.append("path", "images");
    formData.append("filename", imgFiles[i]?.name);
    formData.append("userfile", imgFiles[i]);
    await fetch(`${process.env.REACT_APP_API_REPLY_URL}/addReplyFile.php`, {
      method: "POST",
      body: formData,
    }).then((res) => res.text());
  }
};
