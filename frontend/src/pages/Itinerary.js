import React, { useEffect, useState, useRef, useReducer } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function Itinerary() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const calendarComponentRef = useRef(null);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [events, setEvents] = useState([
    { title: "Event 1", id: "1" },
    { title: "Event 2", id: "2" },
    { title: "Event 3", id: "3" },
    { title: "Event 4", id: "4" },
    { title: "Event 5", id: "5" },
  ]);

  const params = useParams();
  const { id: eventId } = params;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
        };
      },
    });

    axios
      .get(`/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, [eventId]);

  const eventClick = (eventClick) => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
          <table class="table">
          <tbody>
          <tr >
          <td>Title</td>
          <td><strong>` +
        eventClick.event.title +
        `</strong></td>
          </tr>
          <tr >
          <td>Start Time</td>
          <td><strong>
          ` +
        eventClick.event.start +
        `
          </strong></td>
          </tr>
          </tbody>
          </table>
          </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#lightgrey",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove();
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  const drop = (eventDrop) => {
    const newEvents = [...calendarEvents];
    const index = newEvents.findIndex(
      (event) => event.id === eventDrop.event.id
    );
    newEvents[index] = { ...newEvents[index], start: eventDrop.event.start };
    setCalendarEvents(newEvents);
  };

  const eventReceive = (eventReceive) => {
    setCalendarEvents([...calendarEvents, eventReceive.event]);
  };

  const [newTask, setNewTask] = useState("");
  const [strikedEvents, setStrikedEvents] = useState([]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newEvent = {
        title: newTask.trim(),
        id: events.length + 1,
      };
      setEvents([...events, newEvent]);
      setNewTask("");
    }
  };

  const handleStrike = (event) => {
    if (!strikedEvents.includes(event)) {
      setStrikedEvents([...strikedEvents, event]);
    } else {
      setStrikedEvents(strikedEvents.filter((e) => e !== event));
    }
  };

  const isStriked = (event) => {
    return strikedEvents.includes(event);
  };

  const handleRemove = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  const navigate = useNavigate();

  const back = (event) => {
    navigate(`/calendar/${eventId}`);
  };

  const save = (userInfo) => {
    navigate(`/profilepage/${userInfo?._id}`);
  };

  return (
    <div className="animated fadeIn p-4">
      <Row>
        <Col lg={3} sm={3} md={3}>
          <div
            id="external-events"
            style={{
              padding: "10%",
              marginTop: "50%",
              marginLeft: "10%",
              width: "auto",
              height: "auto",
              maxHeight: "-webkit-fill-available",
              backgroundColor: "white",
              borderRadius: "20px",
              borderStyle: "solid",
            }}
          >
            <p align="center">
              <h4> Programme Rundown</h4>
            </p>
            {events.map((event) => (
              <div
                className="fc-event todo-list"
                style={{
                  cursor: "move",
                  textDecoration: isStriked(event) ? "line-through" : "none",
                }}
                title={event.title}
                data={event.id}
                key={event.id}
              >
                {event.title}
                <div className="todo-btn">
                  <MDBBtn
                    className="ms-2"
                    tag="a"
                    color="success"
                    outline
                    floating
                    onClick={() => handleStrike(event)}
                    style={{ height: "30px", width: "30px" }}
                  >
                    <i
                      class="fa fa-check"
                      style={{
                        fontSize: "20px",
                        textAlign: "center",
                        marginTop: "2px",
                      }}
                    ></i>
                  </MDBBtn>
                  <MDBBtn
                    className="ms-2"
                    tag="a"
                    color="danger"
                    outline
                    floating
                    onClick={() => handleRemove(event)}
                    style={{ height: "30px", width: "30px" }}
                  >
                    <i
                      class="fa fa-close"
                      style={{
                        fontSize: "20px",
                        textAlign: "center",
                        marginTop: "2px",
                      }}
                    ></i>
                  </MDBBtn>
                </div>
              </div>
            ))}
            <div className="mt-5 mb-3 add-input">
              <MDBInput
                type="text"
                label="Enter new event"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              {""}
              <MDBBtn
                onClick={handleAddTask}
                style={{
                  width: "90px",
                  backgroundColor: "#481449",
                }}
              >
                Add
              </MDBBtn>
            </div>
          </div>
        </Col>
        <Col lg={9} sm={9} md={9}>
          <div className="itinerary mt-5" id="myitinerary">
            <FullCalendar
              initialView="timeGridDay"
              plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "timeGridDay",
              }}
              rerenderDelay={10}
              eventDurationEditable={true}
              editable={true}
              droppable={true}
              ref={calendarComponentRef}
              events={calendarEvents}
              eventDrop={drop}
              eventReceive={eventReceive}
              eventClick={eventClick}
              selectable={true}
            />
          </div>
        </Col>
      </Row>
      <div className="nextBack-btn">
        <MDBBtn
          onClick={() => {
            if (
              window.confirm(
                "Are you sure? Itinerary set for this event will not be saved."
              )
            ) {
              back();
            }
          }}
        >
          Back
        </MDBBtn>
        <MDBBtn onClick={() => save(userInfo)}>Save Event</MDBBtn>
      </div>
    </div>
  );
}

export default Itinerary;
