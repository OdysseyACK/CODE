import { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";

export default function GetStartedButton() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setstartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.post(
        "/api/events",
        {
          name: eventName,
          type: eventType,
          startDate: startDate,
          startTime: startTime,
          createdBy: userInfo._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      navigate(`/vcalculator/${response.data._id}`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="modal-button">
      <button onClick={toggleShow} className="get-started slide-in-left">
        Get Started!
        <span className="icon-right"></span>
        <span className="icon-right after"></span>
      </button>

      <MDBModal
        staticBackdrop
        show={basicModal}
        setShow={setBasicModal}
        tabIndex="-1"
      >
        <MDBModalDialog className="modal-fullscreen-lg-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Your Own Event</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                className="mb-2 form-control-lg"
                label="Name of Event"
                id="form1"
                type="text"
                required
                onChange={(e) => setEventName(e.target.value)}
              />
              <Form.Group controlId="eventpicker">
                <Form.Select
                  required
                  aria-label="Default select example"
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option>Type of Event</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Party">Party</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Others">Others</option>
                </Form.Select>
                <div className="d-flex" style={{ justifyContent: "center" }}>
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label mt-2"
                  >
                    {" "}
                    Start Date:
                  </label>
                  <Form.Control
                    type="date"
                    className="w-30 m-2"
                    name="startdate"
                    placeholder="Start Date"
                    required
                    onChange={(e) => setstartDate(e.target.value)}
                  />
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label mt-2"
                  >
                    {" "}
                    Start Time:
                  </label>
                  <Form.Control
                    type="time"
                    className="w-30 m-2"
                    name="starttime"
                    placeholder="Start Time"
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </Form.Group>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={createHandler}>Create</MDBBtn>

              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
