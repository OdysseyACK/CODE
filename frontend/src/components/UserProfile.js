import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";
import Countdown from "./Countdown";
import EditEventButton from "../components/EditEventButton";

export default function UserProfile({ userId }) {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [events, setEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // Add a new state variable to track event updates
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;

    if (!token) {
      return;
    }

    axios
      .get(`/api/events/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
        filterEvents(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user events", error);
      });
  }, [userId, updated]); // Add updated as a dependency

  const filterEvents = (events) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const upcoming = events.filter((event) => {
      const eventDate = new Date(event.startDate);
      const eventDay = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
      );
      return eventDay > today;
    });

    const past = events.filter((event) => {
      const eventDate = new Date(event.startDate);
      const eventDay = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
      );
      return eventDay < today;
    });

    const ongoing = events.filter((event) => {
      const startDate = new Date(event.startDate);
      const eventStartDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      return (
        eventStartDay.getTime() === today.getTime() &&
        !upcoming.includes(event) &&
        !past.includes(event)
      );
    });

    setOngoingEvents(ongoing);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    filterEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setUpdated(!updated); // Toggle the updated state variable to trigger a re-fetch of the event data
  };

  return (
    <div>
      <MDBTabs justify classname="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Upcoming Events
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Ongoing Events
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab3")}
            active={justifyActive === "tab3"}
          >
            Past Events
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      {/* =====================Upcoming Events============ */}
      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBRow>
            {upcomingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <div className="event-container">
                  <div className="box mb-1">
                    <span className="event-title">{event.name}</span>
                    <p>Start Time: {event.startTime}H</p>
                    <p>
                      Start Date:
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                      <Countdown eventStartDate={event.startDate} />
                    </p>
                  </div>
                </div>
                <div className="event-btn-wrapper">
                  {" "}
                  <EditEventButton
                    eventID={event._id}
                    event={event}
                    onEventUpdated={handleEventUpdated}
                  />
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>
        {/* =====================Ongoing Events============ */}
        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBRow>
            {ongoingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <div className="event-container">
                  <div className="box mb-1">
                    <span className="event-title">{event.name}</span>
                    <p>Start Time: {event.startTime}H</p>
                    <p>
                      Start Date:
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                    </p>
                  </div>
                </div>
                <EditEventButton
                  eventID={event._id}
                  event={event}
                  onEventUpdated={handleEventUpdated}
                />
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>
        {/* ===================== Past Events============ */}
        <MDBTabsPane show={justifyActive === "tab3"}>
          <MDBRow>
            {pastEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <div className="event-container">
                  <div className="box mb-1">
                    <span className="event-title">{event.name}</span>
                    <p>
                      Start Date:
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                      <h4
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                      >
                        Event Ended
                      </h4>
                    </p>
                  </div>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
