export const readDataRepeat = (setData, enquireNum) => {
  const formData = new FormData();
  formData.append("enquireNum", enquireNum);
  fetch(`${process.env.REACT_APP_API_REPEAT_URL}/selectRepeat.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => setData(data.result))
    .catch((err) => {
      console.log(err, "초기 화면 돌아가기");
    });
};
export const readReplyCnt = async (setReply, enquireNum) => {
  const formData = new FormData();
  formData.append("enquireNum", enquireNum);
  await fetch(`${process.env.REACT_APP_API_REPEAT_URL}/selectRepeat.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => setReply((prev) => [...prev, data]))
    .catch((err) => {
      console.log(err, "초기 화면 돌아가기");
    });
};
export const insertDataRepeat = (now, formElem, setData, enquireNum) => {
  const formData = new FormData(formElem);
  formData.append("date", now);
  fetch(`${process.env.REACT_APP_API_REPEAT_URL}/insertRepeat.php`, {
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
  fetch(`${process.env.REACT_APP_API_REPEAT_URL}/deleteRepeat.php`, {
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
