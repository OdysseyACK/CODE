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

export default function UserProfile({ userId }) {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [events, setEvents] = useState([]);
  const [ongoingEvents, setUpcomingEvents] = useState([]);
  const [upcomingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

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
  }, [userId]);

  const filterEvents = (event) => {
    const today = new Date();
    const eventDate = new Date(event.startDate);

    const filterEvents = (events) => {
      const now = new Date();
  
      const  = events.filter(
        (event) =>
          new Date(event.startDate) <= now &&
          (!event.endDate || new Date(event.endDate) >= now)
      );
      const ongoingupcoming = events.filter((event) => new Date(event.startDate) > now);
      const past = events.filter(
        (event) =>
          new Date(event.startDate) < now &&
          event.endDate &&
          new Date(event.endDate) < now
      );
  
      setOngoingEvents(ongoing);
      setUpcomingEvents(
        upcoming.map((event) => ({
          ...event,
          startDate: new Date(event.startDate).toISOString(),
        }))
      );
      setPastEvents(past);
    };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <div>
      <MDBTabs justify classname="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Ongoing Events
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Upcoming Events
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

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBRow>
            {ongoingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{event.name}</MDBCardTitle>
                    <MDBCardText>{event.description}</MDBCardText>
                    <MDBCardText>
                      <small className="text-muted">
                        {new Date(event.startDate).toLocaleDateString()}
                      </small>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBRow>
            {upcomingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{event.name}</MDBCardTitle>
                    <MDBCardText>{event.description}</MDBCardText>
                    <MDBCardText>
                      <small className="text-muted">
                        {new Date(event.startDate).toLocaleDateString()}
                      </small>
                      <Countdown eventStartDate={event.startDate} />
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab3"}>
          <MDBRow>
            {pastEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{event.name}</MDBCardTitle>
                    <MDBCardText>{event.description}</MDBCardText>
                    <MDBCardText>
                      <small className="text-muted">
                        {new Date(event.startDate).toLocaleDateString()}
                      </small>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
