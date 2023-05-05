import { React, useContext, useReducer, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { EventStore } from "../EventStore";
import { getError } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import EditTodolist from "../components/Todolist";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function EditEventButton({ eventID, onEventUpdated }) {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: false,
      error: "",
    });

  const onSaveChanges = () => {
    setSrc(preview);
    toggleShow();
  };

  // const [event, setEvent] = useState("");
  const [event, setEvent] = useState({
    name: "",
    type: "",
    startDate: "",
    startTime: "",
  });

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;
    if (!token) {
      return;
    }
    axios
      .get(`/api/events/${eventID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
        setEventName(response.data.name);
        setEventType(response.data.type);
        setStartDate(response.data.startDate);
        setStartTime(response.data.startTime);
      })
      .catch((error) => {
        console.error("Failed to fetch event", error);
      });
  }, [eventID]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        eventName,
        eventType,
        startDate,
        startTime,
      };
      const { data: resData } = await axios.put(
        `/api/events/${eventID}`,
        data,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "UPDATE_SUCCESS", payload: resData });
      toast.success("Event updated successfully");

      // Call the onEventUpdated callback after the event has been updated
      onEventUpdated(resData);
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      toast.error(getError(err));
    }
  };

  const editTodoList = (event) => {
    navigate(`/calendar/${eventID}`);
  };

  const editAgendaList = (event) => {
    navigate(`/itinerary/${eventID}`);
  };

  return (
    <div>
      <MDBModal
        staticBackdrop
        show={basicModal}
        setShow={setBasicModal}
        tabIndex="-1"
      >
        {" "}
        <MDBModalDialog className="modal-fullscreen-lg-down" size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Event</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <Form onSubmit={submitHandler}>
              <MDBModalBody>
                <Form.Group controlId="eventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="eventType">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option>Type of Event</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Party">Party</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Others">Others</option>
                  </Form.Control>
                </Form.Group>
              </MDBModalBody>
              <MDBModalFooter style={{ justifyContent: "space-between" }}>
                <div>
                  <MDBBtn className="mx-2" onClick={editTodoList}>
                    Edit To-Do List
                  </MDBBtn>
                  <MDBBtn onClick={editAgendaList}>Edit Agenda List</MDBBtn>
                </div>
                <MDBBtn type="submit" onClick={onSaveChanges}>
                  Update
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <button className="edit-button" onClick={toggleShow}>
        Edit{" "}
        <svg class="edit-svg" viewBox="0 0 512 512">
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
      </button>
    </div>
  );
}
