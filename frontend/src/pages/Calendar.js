import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useContext,
} from "react";
import { Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import { EventStore } from "../EventStore";
import Todolist from "../components/Todolist";
import Alert from "sweetalert2";

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

function Calendar() {
  const calendarComponentRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState(null);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const params = useParams();
  const { id: eventId } = params;
  const { state } = useContext(EventStore);
  const { userInfo } = state;

  useEffect(() => {
    axios
      .get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
        setDate(new Date(response.data.startDate)); // set the initialDate to the event's startDate
        console.log(response.data.startDate); //
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, [eventId, userInfo]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get(`/api/tasks/calendar/${eventId}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        setCalendarEvents(
          response.data.map((task) => ({
            name: task.name,
            date: task.date,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [eventId]);

  const next = (event) => {
    navigate(`/itinerary/${eventId}`);
  };

  const back = (event) => {
    navigate(`/vcalculator/${eventId}`);
  };

  // const handleTaskAdded = (newTask) => {
  //   setCalendarEvents([...calendarEvents, newTask]);
  // };

  function renderEventContent(taskInfo) {
    return (
      <>
        <h5
          style={{ textAlign: "center", fontStyle: "italic", color: "green" }}
        >
          {taskInfo.event.extendedProps.name}
        </h5>
      </>
    );
  }

  const handleTaskAdded = async (newTask) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(`/api/tasks/calendar/${eventId}`, newTask, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      setCalendarEvents([...calendarEvents, newTask]);
      Alert.fire({
        icon: "success",
        title: "Success!",
        text: "Task successfully added.",
      });
    } catch (error) {
      console.log(error);
      Alert.fire({
        icon: "error",
        title: "Failed to add task.",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={3} sm={3} md={3}>
          <Todolist onTaskAdded={handleTaskAdded} />
        </Col>
        <Col lg={9} sm={9} md={9}>
          <div className="calendar" id="mycalendar">
            {date && (
              <FullCalendar
                initialView="dayGridMonth"
                initialDate={date}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev today",
                  center: "title",
                  right: "next",
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                ref={calendarComponentRef}
                onTaskAdded={handleTaskAdded}
                events={calendarEvents}
                selectable={true}
                eventContent={renderEventContent}
              />
            )}
          </div>
        </Col>
      </Row>
      <div className="nextBack-btn">
        <MDBBtn
          onClick={() => {
            if (
              window.confirm(
                "Are you sure? To-do List set for this event will not be saved."
              )
            ) {
              back();
            }
          }}
        >
          Back
        </MDBBtn>
        <MDBBtn onClick={next}>Next</MDBBtn>
      </div>
    </div>
  );
}

export default Calendar;
