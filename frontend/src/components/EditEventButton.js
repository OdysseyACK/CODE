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

      <MDBBtn onClick={toggleShow}>Edit</MDBBtn>
    </div>
  );
}
