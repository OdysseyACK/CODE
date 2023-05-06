import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useContext,
} from "react";
import { Col, Row } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { EventStore } from "../EventStore";
import AgendaList from "../components/AgendaList";
import Footer from "../components/Footer";

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
  const calendarComponentRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const [{ loading, error }, dispatch] = useReducer(reducer, {
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
        setDate(new Date(response.data.startDate)); // set the initialDate to the event's startDate
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, [eventId, userInfo]);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get(`/api/agenda/itinerary/${eventId}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        setCalendarEvents(
          response.data.map((agenda) => ({
            id: agenda._id,
            name: agenda.name,
            date: agenda.date,
            startTime: agenda.startTime,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAgenda();
  }, [eventId, calendarEvents]); // add calendarEvents as a dependency here

  const back = (event) => {
    navigate(`/calendar/${eventId}`);
  };

  const save = (userInfo) => {
    navigate(`/profilepage/${userInfo?._id}`);
  };

  function renderEventContent(taskInfo) {
    return (
      <>
        <h6 style={{ textAlign: "center", fontStyle: "italic" }}>
          {taskInfo.event.extendedProps.name}
        </h6>
      </>
    );
  }

  const removeAgendaFromCalendar = (agendaId) => {
    setCalendarEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== agendaId)
    );
  };

  return (
    <div className="animated fadeIn p-4">
      <Row>
        <Col lg={3} sm={3} md={3}>
          <AgendaList
            addAgendaToCalendar={(newAgenda) =>
              calendarComponentRef.current.getApi().addEvent(newAgenda)
            }
            removeAgendaFromCalendar={removeAgendaFromCalendar} // Add this line
          />
        </Col>
        <Col lg={9} sm={9} md={9}>
          <div className="itinerary mt-5" id="myitinerary">
            {error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}

            {date && (
              <FullCalendar
                initialView="timeGridDay"
                initialDate={date}
                plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "",
                  center: "title",
                  right: "",
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                ref={calendarComponentRef}
                events={calendarEvents}
                selectable={true}
                eventContent={renderEventContent}
              />
            )}
          </div>
        </Col>
      </Row>
      <div className="nextBack-btn mt-5">
        <MDBBtn
          onClick={() => {
            if (
              window.confirm(
                "Are you sure? Itinerary set for this event may not be saved."
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
      <Footer />
    </div>
  );
}

export default Itinerary;
