import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

function Calendar() {
  const calendarComponentRef = useRef(null);

  const [calendarEvents, setCalendarEvents] = useState([
    {
      title: "Task 1",
      start: new Date("2023-04-13 00:00"),
      id: "99999998",
    },
    {
      title: "Task 2",
      start: new Date("2023-04-25 00:00"),
      id: "99999999",
    },
  ]);

  const [events, setEvents] = useState([{ title: "Event 1", id: "1" }]);

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
  }, []);

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
              <h4> To-do List</h4>
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
          <div className="calendar" id="mycalendar">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              rerenderDelay={10}
              eventDurationEditable={false}
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
          href="/vcalculator"
          onClick={() =>
            window.confirm(
              "Are you sure? To-do List set for this event will not be saved."
            )
          }
        >
          Back
        </MDBBtn>
        <MDBBtn href="/itinerary">Next</MDBBtn>
      </div>
    </div>
  );
}

export default Calendar;
