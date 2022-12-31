import React, { useRef, useState } from "react";
//import emailjs from "@emailjs/browser";
import "./mail.css";
import EmailLoading from "../common/emailLoading/emailLoading";
import { sendingMail } from "../../service/sendMail";

export default function Mail({ setIsMail }) {
  const [isBtn, setIsBtn] = useState(true);
  const form = useRef();
  const closeHandler = () => {
    setIsMail(false);
  };
  const sendMail = (e) => {
    e.preventDefault();
    setIsBtn(false);
    let formElem = document.getElementById("fcf-form-id");
    sendingMail(setIsMail, setIsBtn, formElem);
  };
  return (
    <>
      <div className="fcf-container">
        <div className="fcf-closeBtn" onClick={closeHandler}>
          X
        </div>
        <form
          id="fcf-form-id"
          ref={form}
          className="fcf-form-className"
          onSubmit={sendMail}
        >
          <div className="fcf-form-group">
            <label htmlFor="subject" className="fcf-label">
              제목
            </label>
            <div className="fcf-input-group">
              <input
                type="text"
                id="subject"
                name="subject"
                className="fcf-form-control"
                required
              />
            </div>
          </div>

          <div className="fcf-form-group">
            <label htmlFor="Email" className="fcf-label">
              상담받을 이메일이나 전화번호
            </label>
            <div className="fcf-input-group">
              <input
                type="text"
                id="Email"
                name="Email"
                className="fcf-form-control"
                required
              />
            </div>
          </div>

          <div className="fcf-form-group">
            <label htmlFor="Message" className="fcf-label">
              상담내용
            </label>
            <div className="fcf-input-group">
              <textarea
                id="Message"
                name="Message"
                className="fcf-form-control"
                rows="6"
                required
              ></textarea>
            </div>
          </div>

          <div className="fcf-form-group">
            {isBtn ? (
              <button
                type="submit"
                id="fcf-button"
                className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block"
              >
                상담메일 보내기
              </button>
            ) : (
              <EmailLoading />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
