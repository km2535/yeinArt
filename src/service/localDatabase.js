export const readDataRepeat = (setData, enquireNum) => {
  const formData = new FormData();
  formData.append("enquireNum", enquireNum);
  fetch("/service/repeat/selectRepeat.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => setData(data.result))
    .catch((err) => {
      console.log(err, "초기 화면 돌아가기");
    });
};
export const insertDataRepeat = (now, formElem, setData, enquireNum) => {
  const formData = new FormData(formElem);
  formData.append("date", now);
  fetch("/service/repeat/insertRepeat.php", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      setTimeout(() => {
        readDataRepeat(setData, enquireNum);
      }, 500);
    })
    .catch(() => {
      console.log("초기 화면 돌아가기");
    });
};

export const deleteDataRepeat = (repeatId, setData, enquireNum) => {
  const formData = new FormData();
  formData.append("repeatId", repeatId);
  fetch("/service/repeat/deleteRepeat.php", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      setTimeout(() => {
        readDataRepeat(setData, enquireNum);
      }, 1000);
    })
    .catch(() => {
      console.log("초기 화면 돌아가기");
    });
};
