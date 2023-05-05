import React, { useEffect, useState, useReducer, useContext } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getError } from "../utils";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { EventStore } from "../EventStore";
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

function AgendaList({ addAgendaToCalendar }) {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [event, setEvent] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [agendaDate, setAgendaDate] = useState("");
  const [agendaName, setAgendaName] = useState("");
  const [agendaStartTime, setAgendaStartTime] = useState("Start Time");
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
        setAgendaDate(response.data.startDate); // setAgendaDate as event.startDate
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, [eventId, userInfo]);

  useEffect(() => {
    const fetchAgenda = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get(`/api/agenda/itinerary/${eventId}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        setAgenda(response.data);
        dispatch({ type: "FETCH_SUCCESS" }); // dispatch FETCH_SUCCESS when tasks are fetched successfully
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchAgenda();
  }, [eventId, userInfo]);

  const handleAddAgenda = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.post(
        `/api/agenda/itinerary/${eventId}`,
        {
          name: agendaName,
          date: agendaDate,
          startTime: agendaStartTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setAgenda((prevAgenda) => [...prevAgenda, response.data]);
      addAgendaToCalendar({
        name: response.data.name,
        date: response.data.date,
        startTime: response.data.startTime,
      });
      setAgendaName(""); // reset taskName state
      setAgendaStartTime(""); // reset StartTime state
      Alert.fire({
        icon: "success",
        title: "Success!",
        text: "Task successfully added.",
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleRemoveAgenda = async (agendaItem) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`/api/agenda/${agendaItem._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setAgenda(agenda.filter((item) => item._id !== agendaItem._id));
      Alert.fire({
        icon: "error",
        title: "Deleted!",
        text: "Task successfully deleted.",
      });
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    }
  };

  return (
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
      <h4 className="text-center"> Programme Rundown</h4>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div>
          {agenda.map((agenda) => (
            <div
              className="fc-event todo-list"
              title={agenda.name}
              key={agenda._id}
            >
              <p
                style={{
                  fontFamily: "lato",
                }}
              >
                {agenda.name}
              </p>
              <button
                onClick={() => handleRemoveAgenda(agenda)}
                className="noselect"
              >
                <span>Delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
      <Form onSubmit={handleAddAgenda}>
        <div className="mt-5 mb-3 add-input">
          <MDBInput
            type="text"
            name="task"
            label="Enter new event"
            value={agendaName}
            onChange={(e) => setAgendaName(e.target.value)}
          />
          <Form.Control
            type="time"
            className="m-1"
            name="time"
            value={agendaStartTime}
            placeholder="Start Time"
            onChange={(e) => setAgendaStartTime(e.target.value)}
          />
        </div>
        <MDBBtn
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#481449",
          }}
        >
          Add
        </MDBBtn>
      </Form>
    </div>
  );
}

export default AgendaList;
