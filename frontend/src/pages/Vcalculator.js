import React, { useState, useEffect, useReducer, useContext } from "react";
import { Form } from "react-bootstrap";
import {
  MDBBtn,
  MDBInput,
  MDBTabs,
  MDBTabsItem,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";
import { getError } from "../utils";
import { EventStore } from "../EventStore";
import { useNavigate, useParams } from "react-router-dom";
import VendorCard from "../components/VendorCard";

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
  const [event, setEvent] = useState([]);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const params = useParams();
  const { id: eventId } = params;

  useEffect(() => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;

    if (!token) {
      console.log("User not authenticated");
      return;
    }

    axios
      .get(`/api/users/vendors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setVendors(response.data);
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });

    axios
      .get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
        dispatch({ type: "FETCH_SUCCESS" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      });
  }, [eventId]);

  const navigate = useNavigate();

  const next = (event) => {
    navigate(`/calendar/${eventId}`);
  };

  const { state } = useContext(EventStore);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
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

  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("Artiste");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredVendors = vendors.filter(
    (vendor) => vendor.vendorType === activeTab
  );

  return (
    <div className="container vcalculator">
      <h2>Select the ideal partners that suit your event.</h2>
      <p>
        Our partners will be in contact with you within the next working day!
      </p>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div
        className="v-content"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {!loading && !error && (
          <section className="v-vendors">
            <MDBTabs justify className="mb-3">
              {[
                "Artiste",
                "Catering",
                "Decor",
                "Florist",
                "Photography",
                "Organiser",
                "Venue",
                "Others",
              ].map((tab) => (
                <MDBTabsItem
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  active={activeTab === tab}
                >
                  {tab}
                </MDBTabsItem>
              ))}
            </MDBTabs>
            <MDBTabsContent>
              <MDBTabsPane show={activeTab === "Artiste"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Catering"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Decor"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Florist"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Photography"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Organiser"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Venue"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
              <MDBTabsPane show={activeTab === "Others"}>
                <MDBRow>
                  {filteredVendors.map((vendor) => (
                    <MDBCol md="4" key={vendor._id}>
                      <VendorCard user={vendor} />
                    </MDBCol>
                  ))}
                </MDBRow>
              </MDBTabsPane>
            </MDBTabsContent>
          </section>
        )}
        {/* ===========================================Calculator and Filter====================================== */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="filter">
            <h5 style={{ textAlign: "center" }}>Filter</h5>
            <label htmlFor="sort">Sort by:</label>
            <Form.Select
              id="sort"
              value={sortOrder}
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
        <MDBBtn onClick={next}>Next</MDBBtn>
      </div>
    </div>
  );
}

export default Vcalculator;
