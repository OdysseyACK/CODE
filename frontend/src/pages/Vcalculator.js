import React, { useState, useEffect, useReducer, useContext } from "react";
import { Tab, Tabs, Col, Form, Table } from "react-bootstrap";
import {
  MDBBtn,
  MDBInputGroup,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import { getError } from "../utils";
import { EventStore } from "../EventStore";
import { useNavigate, useParams } from "react-router-dom";
import { Decimal } from "decimal.js";

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

function Vcalculator() {
  const [users, setUsers] = useState([]);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
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

  // const userItem = users.map((user) => ({
  //   name: user.name,
  //   price: user.vendorPrice,
  // }));
  console.log(users);

  const [shoppingList, setShoppingList] = useState([users]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("");
  const [budget, setBudget] = useState("");
  const [totalColor, setTotalColor] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const addItem = (user) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === user._id
    );
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...user, quantity: 1 }]);
    }
    setTotalAmount(totalAmount + user.vendorPrice);
  };

  const removeItem = (user) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === user._id
    );
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== user._id));
    }
    setTotalAmount(totalAmount - user.vendorPrice);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const handleSortChange = (event) => {
    sortUsers(event.target.value);
  };

  // let sortedItems = [...users];
  // if (sortCriteria === "high-to-low") {
  //   sortedItems.sort((a, b) => b.vendorPrice - a.vendorPrice);
  // } else if (sortCriteria === "low-to-high") {
  //   sortedItems.sort((a, b) => a.vendorPrice - b.vendorPrice);
  // } else if (sortCriteria === "a-to-z") {
  //   sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  // } else if (sortCriteria === "z-to-a") {
  //   sortedItems.sort((a, b) => b.name.localeCompare(a.name));
  // }

  const sortUsers = (order) => {
    const sortedUsers = [...users];
    if (order === "asc") {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "highest") {
      sortedUsers.sort((a, b) => b.vendorPrice - a.vendorPrice);
    } else if (order === "lowest") {
      sortedUsers.sort((a, b) => a.vendorPrice - b.vendorPrice);
    }
    setUsers(sortedUsers);
    setSortOrder(order);
  };

  const handleBudgetChange = (event) => {
    const newValue = event.target.value;
    setBudget(newValue);
  };

  useEffect(() => {
    if (budget === "") {
      setTotalColor("white");
    } else if (budget >= totalAmount) {
      setTotalColor("success");
    } else if (budget < totalAmount) {
      setTotalColor("danger");
    }
  }, [budget, totalAmount]);

  return (
    <div className="container vcalculator">
      <h2>Select the ideal partners that suit your event.</h2>
      <p>
        Our partners will be in contact with you within the next working day!
      </p>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <MDBInputGroup tag="form" className="d-flex w-50 p-3 mb-3">
        <MDBInput
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          type="Search"
        />
        <MDBBtn outline>Search</MDBBtn>
      </MDBInputGroup>
      <div
        className="v-content"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {!loading && !error && (
          <section className="v-vendors">
            <Tabs
              defaultActiveKey="artistes"
              id="fill-tab"
              className="mb-3"
              fill
            >
              <Tab eventKey="artistes" title="Artistes">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Artiste"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="catering" title="Catering">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Catering"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="decor" title="Decor">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) => user.isVendor && user.vendorType === "Decor"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="florists" title="Florists">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Florist"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="photography" title="Photography">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Photography"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="organisers" title="Organisers">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Organiser"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="venues" title="Venues">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) => user.isVendor && user.vendorType === "Venue"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
              <Tab eventKey="Others" title="Others">
                <Col className="d-flex justify-content-center">
                  <div className="gallery">
                    <div className="gallery-item" tabIndex={0}>
                      {users
                        .filter(
                          (user) =>
                            user.isVendor && user.vendorType === "Others"
                        )
                        .map((user) => (
                          <MDBCard
                            className="btn"
                            style={{ width: "250px", height: "365px" }}
                          >
                            <MDBCardImage
                              src={
                                user.profilePic
                                  ? user.profilePic
                                  : "./images/default.jpg"
                              }
                              position="top"
                              alt="..."
                            />
                            <MDBCardBody>
                              <MDBCardTitle style={{ fontSize: "15px" }}>
                                {user.name}
                              </MDBCardTitle>
                              <MDBCardText
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {user.vendorPrice ? (
                                  <span>{user.vendorPrice} SGD</span>
                                ) : (
                                  <span style={{ fontStyle: "italic" }}>
                                    Undefined
                                  </span>
                                )}
                              </MDBCardText>
                              <MDBBtn
                                color="info"
                                onClick={() => addItem(user)}
                              >
                                Add to Cart
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        ))}
                    </div>
                  </div>
                </Col>
              </Tab>
            </Tabs>
          </section>
        )}
        {/* ===========================================Calculator and Filter====================================== */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="filter">
            <h5 style={{ textAlign: "center" }}>Filter</h5>
            <label htmlFor="sort">Sort by:</label>
            <Form.Select
              id="sort"
              value={sortCriteria}
              onChange={handleSortChange}
              className="w-75"
              style={{ margin: "0 2vw" }}
            >
              <option value="">None</option>
              <option value="highest">Price (highest to lowest)</option>
              <option value="lowest">Price (lowest to highest)</option>
              <option value="asc">Name (A-Z)</option>
              <option value="desc">Name (Z-A)</option>
            </Form.Select>
          </div>
          <div className="calculator">
            <h5 style={{ textAlign: "center" }}>Cart</h5>
            <MDBInput
              label="Budget"
              type="number"
              id="budget"
              name="budget"
              value={budget}
              onChange={handleBudgetChange}
              className="bg-white"
            />
            <ul>
              {cartItems.map((user) => (
                <li key={user._id}>
                  <p className="vcal-name">{user.name}</p>
                  <p>${user.vendorPrice}</p>
                  <MDBBtn
                    size="sm"
                    color="secondary"
                    style={{ fontWeight: "bold" }}
                    onClick={() => removeItem(user)}
                  >
                    -
                  </MDBBtn>
                  {user.quantity}
                  <MDBBtn
                    size="sm"
                    color="secondary"
                    style={{ fontWeight: "bold" }}
                    onClick={() => addItem(user)}
                  >
                    +
                  </MDBBtn>
                </li>
              ))}
            </ul>
            <p className={"text-" + totalColor}>Total Amount: ${totalAmount}</p>
            <div style={{ textAlign: "center" }}>
              <MDBBtn onClick={clearCart} className="clearCart">
                Clear Cart
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>

      {/* =============================Buttons============================================================== */}
      <div className="nextBack-btn">
        <MDBBtn
          href="/"
          onClick={() =>
            window.confirm(
              "Are you sure? All settings for this event will not be saved."
            )
          }
        >
          Back
        </MDBBtn>
        <MDBBtn href="/calendar">Next</MDBBtn>
      </div>
    </div>
  );
}

export default Vcalculator;
