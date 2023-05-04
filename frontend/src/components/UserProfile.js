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
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
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

  const filterEvents = (events) => {
    const now = new Date();

    const upcoming = events.filter((event) => new Date(event.startDate) > now);
    const ongoing = events.filter(
      (event) =>
        new Date(event.startDate) <= now && new Date(event.endDate) >= now
    );

    const past = events.filter((event) => new Date(event.startDate) < now);

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

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBRow>
            {upcomingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{event.name}</MDBCardTitle>
                    <MDBCardText>
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                      {/* {new Date(event.startDate).toLocaleDateString()} */}
                      <Countdown eventStartDate={event.startDate} />
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBRow>
            {ongoingEvents.map((event) => (
              <MDBCol key={event._id} md="6" lg="4" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{event.name}</MDBCardTitle>
                    <MDBCardText>{event.description}</MDBCardText>
                    <MDBCardText>
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                      {/* {new Date(event.startDate).toLocaleDateString()} */}
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
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(event.startDate))}
                      {/* {new Date(event.startDate).toLocaleDateString()} */}
                      <h3 style={{ color: "red", fontWeight: "bold" }}>
                        Event Ended
                      </h3>
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
