import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Result = () => {
  return (
    <p>
      Your message has been successfully sent. We will be in contact with you
      soon!
    </p>
  );
};

function Contact() {
  const formRef = useRef();

  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4k9y4zh",
        "template_9zd7v2b",
        formRef.current,
        "JNxjr8-f_HvdXdbAx"
      )
      .then((error) => {
        console.log(error.text);
      });
    e.target.reset();
    showResult(true);

    setTimeout(() => {
      showResult(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <form className="contact-form" onSubmit={sendEmail} ref={formRef}>
        <div className="mt-5">
          <h2 className="mb-4">Contact Us</h2>
          <p>
            Didn't find what you're looking for? Let us know!
            <br />
            Our team will be in contact to assist you with your event the
            soonest possible!
          </p>
          <div className="field mb-4">
            <input
              className="input-field"
              type="text"
              placeholder="Name*"
              name="fullName"
              required
              autoComplete="off"
            />
          </div>
          <div className="field mb-4">
            <input
              className="input-field"
              type="email"
              placeholder="Email*"
              name="email"
              required
              autoComplete="off"
            />
          </div>
          <div className="field mb-4">
            <input
              className="input-field"
              type="text"
              placeholder="Contact Number"
              name="contact"
              autoComplete="off"
            />
          </div>
          <div className="field mb-4">
            <input
              className="input-field"
              type="text"
              placeholder="Subject*"
              name="subject"
              required
              autoComplete="off"
            />
          </div>
          <div className="field mb-4">
            <textarea
              className="input-field"
              style={{ height: "120px" }}
              name="message"
              placeholder="Message"
            ></textarea>
          </div>
          <button className="send-button mb-3">
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
          </button>
          <div className="row">{result ? <Result /> : null}</div>
        </div>
      </form>
      <div className="contact-bottom"></div>
    </div>
  );
}

export default Contact;
