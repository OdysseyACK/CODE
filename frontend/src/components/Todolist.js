import React, { useEffect, useState, useReducer } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getError } from "../utils";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Alert from "sweetalert2";

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

function Todolist({
  addEventToCalendar,
  removeEventFromCalendar,
  updateCalendarEvents,
}) {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [tasks, setTasks] = useState([]);
  const params = useParams();
  const { id: eventId } = params;

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await axios.get(`/api/tasks/calendar/${eventId}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        setTasks(response.data);
        dispatch({ type: "FETCH_SUCCESS" }); // dispatch FETCH_SUCCESS when tasks are fetched successfully
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchTasks();
  }, [eventId]);

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.post(
        `/api/tasks/calendar/${eventId}`,
        {
          name: taskName,
          date: taskDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      // Update the tasks state with the new task
      setTasks((prevTasks) => [...prevTasks, response.data]);
      addEventToCalendar({
        name: response.data.name,
        date: response.data.date,
      });
      setTaskName(""); // reset taskName state
      setTaskDate(""); // reset taskDate state
      Alert.fire({
        icon: "success",
        title: "Success!",
        text: "Task successfully added.",
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleRemove = async (task) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTasks(tasks.filter((t) => t._id !== task._id));
      removeEventFromCalendar(task._id);
      const response = await axios.get(`/api/tasks/calendar/${eventId}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });
      const newEvents = response.data.map((task) => ({
        name: task.name,
        date: task.date,
      }));
      updateCalendarEvents(newEvents); // Update the calendar events state
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    }
  };

  const handleStrike = async (event, task) => {
    event.preventDefault();
    try {
      const updatedTask = { ...task, isDone: !task.isDone };
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/tasks/${task._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      // Update the local state with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
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
      <h4 className="text-center"> To-do List</h4>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div>
          {tasks.map((task) => (
            <div
              className="fc-event todo-list"
              title={task.name}
              key={task._id}
            >
              <div
                style={{
                  textDecoration: task.isDone ? "line-through" : "none",
                  fontFamily: "lato",
                }}
              >
                <p>{task.name}</p>
              </div>
              <div className="todo-btn">
                <label
                  className="td-container"
                  htmlFor={`checkbox-${task._id}`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${task._id}`}
                    checked={task.isDone}
                    onChange={(event) => handleStrike(event, task)}
                  />
                  <div className="checkmark"></div>
                </label>

                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleRemove(task)}
                  className="noselect"
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Form onSubmit={handleAddTask}>
        <div className="mt-5 mb-3 add-input">
          <MDBInput
            type="text"
            name="task"
            label="Enter new event"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {""}
          <Form.Control
            type="date"
            className="m-1"
            name="date"
            placeholder="Start Date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
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

export default Todolist;
