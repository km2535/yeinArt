export const sendingMail = async (setIsMail, setIsBtn, formElem) => {
  await fetch("/service/PHPMailer/mailer.php", {
    method: "POST",
    body: new FormData(formElem),
  })
    .then(() => {
      setIsMail(false);
      setIsBtn(true);
      alert("이메일을 성공적으로 보냈습니다.");
    })
    .catch((err) => {
      alert("잠시 후 다시 시도해주세요");
      console.log(err, "초기 화면 돌아가기");
    });
};

export const mailfromEnquire = async (enquireData) => {
  const { TITLE, DESCRIPTION, WRITER } = enquireData;
  const formData = new FormData();
  formData.append("subject", TITLE);
  formData.append("Message", DESCRIPTION);
  formData.append("Email", WRITER);
  await fetch("/service/PHPMailer/mailer.php", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      console.log("문의하기 등록완료");
    })
    .catch((err) => {
      alert("잠시 후 다시 시도해주세요");
      console.log(err, "초기 화면 돌아가기");
    });
};
