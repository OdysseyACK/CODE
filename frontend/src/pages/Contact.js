import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";

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
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    showResult(true);

    setTimeout(() => {
      showResult(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Form
        style={{ backgroundColor: "none" }}
        onSubmit={sendEmail}
        ref={formRef}
      >
        <div className="contact-form">
          <h2 className="mb-4">Contact Us</h2>
          <p>
            Didnt see what you're looking for? Let us know!
            <br />
            Our team will be in contact to assist you with your event the
            soonest!
          </p>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Name*"
              name="fullName"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email*"
              name="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Contact Number"
              name="contact"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Subject*"
              name="subject"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              style={{ height: "120px" }}
              name="message"
              placeholder="Message"
            />
          </Form.Group>
          <MDBBtn type="submit" color="primary" block className="my-4">
            Send
          </MDBBtn>
          <div className="row">{result ? <Result /> : null}</div>
        </div>
      </Form>
    </div>
  );
}

export default Contact;
