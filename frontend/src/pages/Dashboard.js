import { useState, useContext, useEffect, useReducer } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { EventStore } from "../EventStore";

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

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    loadingUpdate: "",
  });

  useEffect(() => {
    axios
      .get("/api/users/dashboard")
      .then((response) => {
        setUsers(response.data);
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, []);

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const { state } = useContext(EventStore);
  const { userInfo } = state;

  const makeAdmin = async (e, user) => {
    e.preventDefault();
    try {
      if (!user._id) {
        throw new Error("User ID is missing");
      }
      const updatedUser = { ...user, isAdmin: !user.isAdmin };
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/users/${user._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success(
        `User ${
          updatedUser.isAdmin ? "made admin" : "removed admin"
        } successfully`
      );
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser._id === updatedUser._id ? updatedUser : prevUser
        )
      );
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const makeVendor = async (e, user) => {
    e.preventDefault();
    try {
      if (!user._id) {
        throw new Error("User ID is missing");
      }
      const updatedUser = { ...user, isVendor: !user.isVendor };
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/users/${user._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success(
        `User ${
          updatedUser.isVendor ? "made vendor" : "removed vendor"
        } successfully`
      );
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser._id === updatedUser._id ? updatedUser : prevUser
        )
      );
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const notActive = async (e, user) => {
    e.preventDefault();
    try {
      if (!user._id) {
        throw new Error("User ID is missing");
      }
      const updatedUser = { ...user, isActive: !user.isActive };
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/users/${user._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success(
        `User ${updatedUser.isActive ? "made active" : "disabled"} successfully`
      );
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser._id === updatedUser._id ? updatedUser : prevUser
        )
      );
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const deleteUser = async (e, user) => {
    e.preventDefault();
    try {
      if (!user._id) {
        throw new Error("User ID is missing");
      }
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${user.name}?`
      );
      if (confirmDelete) {
        dispatch({ type: "UPDATE_REQUEST" });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: "UPDATE_SUCCESS",
        });
        toast.success(`User deleted successfully`);
        setUsers((prevUsers) =>
          prevUsers.filter((prevUser) => prevUser._id !== user._id)
        );
      }
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-center dashboard-title" style={{ marginTop: "10%" }}>
        Manage Users
      </h1>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {!loading && !error && (
        <Table bordered hover className="mt-3 text-center dashboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Admin Rights</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isVendor ? "Vendor" : "User"}</td>
                <td>{user.isAdmin ? "Admin" : "Not Admin"}</td>
                <td>{user.isActive ? "Active" : "Disabled"}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <MDBDropdown style={{ marginRight: "10px" }}>
                    {user.email !== "admin@example.com" && (
                      <MDBDropdownToggle color="info">Edit</MDBDropdownToggle>
                    )}
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        link
                        onClick={async (e) => {
                          await makeAdmin(e, user);
                          // Update users state after making admin
                          const updatedUsers = users.map((u) =>
                            u._id === user._id
                              ? { ...user, isAdmin: !user.isAdmin }
                              : u
                          );
                          setUsers(updatedUsers);
                        }}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={async (e) => {
                          await makeVendor(e, user);
                          // Update users state after making vendor
                          const updatedUsers = users.map((u) =>
                            u._id === user._id
                              ? { ...user, isVendor: !user.isVendor }
                              : u
                          );
                          setUsers(updatedUsers);
                        }}
                      >
                        {user.isVendor ? "Remove Vendor" : "Make Vendor"}
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  {user.email !== "admin@example.com" && (
                    <MDBBtn
                      style={{ marginRight: "10px" }}
                      color="warning"
                      onClick={async (e) => {
                        await notActive(e, user);
                        const updatedUsers = users.map((u) =>
                          u._id === user._id
                            ? { ...user, isActive: !user.isActive }
                            : u
                        );
                        setUsers(updatedUsers);
                      }}
                    >
                      {user.isActive ? "Disable" : "Reinstate"}
                    </MDBBtn>
                  )}
                  {user.email !== "admin@example.com" && (
                    <MDBBtn color="danger" onClick={(e) => deleteUser(e, user)}>
                      <MDBIcon fas icon="trash" size="lg" />
                    </MDBBtn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Dashboard;
