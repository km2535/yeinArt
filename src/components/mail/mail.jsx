import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import "./mail.css";
import EmailLoading from "../common/emailLoading/emailLoading";
export default function Mail({ setIsMail }) {
  const [isBtn, setIsBtn] = useState(true);
  const form = useRef();
  const closeHandler = () => {
    setIsMail(false);
  };
  const sendMail = (e) => {
    e.preventDefault();
    setIsBtn(false);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICEC_KEY,
        "template_hj89gv4",
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLICK_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setIsMail(false);
        setIsBtn(true);
      });
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
            <label htmlFor="Name" className="fcf-label">
              이름
            </label>
            <div className="fcf-input-group">
              <input
                type="text"
                id="Name"
                name="Name"
                className="fcf-form-control"
                required
              />
            </div>
          </div>

          <div className="fcf-form-group">
            <label htmlFor="Email" className="fcf-label">
              이메일
            </label>
            <div className="fcf-input-group">
              <input
                type="email"
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
