import React, { useEffect, useState, useReducer } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getError } from "../utils";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

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

function Todolist({ onTaskAdded }) {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
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
      onTaskAdded(response.data);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskName(""); // reset taskName state
      setTaskDate(""); // reset taskDate state
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
              <p>{task.name}</p>
              <p>{task.date}</p>
              <MDBBtn
                className="ms-2"
                tag="a"
                color="danger"
                outline
                floating
                onClick={() => handleRemove(task)}
                style={{ height: "30px", width: "30px" }}
              >
                <i
                  className="fa fa-close"
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginTop: "2px",
                  }}
                ></i>
              </MDBBtn>
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
            className=" m-1"
            name="date"
            placeholder="Start Date"
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
