import React, { useState, useEffect, useReducer } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import VendorCard from "../components/VendorCard";
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

function Vcalculator() {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
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

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [budget, setBudget] = useState("");
  const [totalColor, setTotalColor] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [remainingAmount, setRemainingAmount] = useState(totalAmount);
  const [totalLeft, setTotalLeft] = useState(null);
  const [customItemName, setCustomItemName] = useState("");
  const [customItemPrice, setCustomItemPrice] = useState("");

  useEffect(() => {
    if (budget !== "" && totalAmount !== null) {
      setTotalLeft(budget - totalAmount);
    }
  }, [budget, totalAmount]);

  const addItem = (user) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === user._id
    );

    if (customItemName && customItemPrice) {
      const customItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === customItemName
      );

      if (customItemIndex !== -1) {
        cartItems[customItemIndex].quantity += 1;
        setTotalAmount(totalAmount + Number(customItemPrice));
        setRemainingAmount(remainingAmount + Number(customItemPrice));
      } else {
        setCartItems([
          ...cartItems,
          {
            name: customItemName,
            vendorPrice: Number(customItemPrice),
            quantity: 1,
          },
        ]);
        setTotalAmount(totalAmount + Number(customItemPrice));
        setRemainingAmount(remainingAmount + Number(customItemPrice));
      }

      setCustomItemName("");
      setCustomItemPrice("");
    } else {
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        setCartItems([...cartItems, { ...user, quantity: 1 }]);
      }
    }

    setTotalAmount(totalAmount + user.vendorPrice);
    setRemainingAmount(remainingAmount + user.vendorPrice);
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
    setRemainingAmount(
      remainingAmount - user.vendorPrice * existingItem.quantity
    );
  };
  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const handleSortChange = (event) => {
    sortUsers(event.target.value);
  };

  const sortUsers = (order) => {
    const sortedVendors = [...vendors];
    if (order === "asc") {
      sortedVendors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      sortedVendors.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "highest") {
      sortedVendors.sort((a, b) => b.vendorPrice - a.vendorPrice);
    } else if (order === "lowest") {
      sortedVendors.sort((a, b) => a.vendorPrice - b.vendorPrice);
    }
    setVendors(sortedVendors);
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
      <div className="v-content">
        <div className="vcalc-container">
          {!loading && !error && (
            <section className="v-vendors">
              <MDBTabs justify className="mb-3 vendor-tabs">
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
                    active={activeTab === tab ? "true" : "false"}
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
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Catering"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Decor"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Florist"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Photography"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Organiser"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Venue"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Others"}>
                  <MDBRow>
                    {filteredVendors.map((vendor) => (
                      <MDBCol md="4" key={vendor._id}>
                        <VendorCard user={vendor} addItem={addItem} />
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBTabsPane>
              </MDBTabsContent>
            </section>
          )}

          {/* ===========================================Calculator and Filter====================================== */}
          <div>
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
              <div className="custom-item">
                <MDBInput
                  label="Item name"
                  type="text"
                  id="custom-item-name"
                  name="custom-item-name"
                  value={customItemName}
                  onChange={(event) => setCustomItemName(event.target.value)}
                  className="mt-2 bg-white"
                />
                <MDBInput
                  label="Item price"
                  type="number"
                  id="custom-item-price"
                  name="custom-item-price"
                  value={customItemPrice}
                  onChange={(event) => setCustomItemPrice(event.target.value)}
                  className="mt-2 bg-white"
                />
                <MDBBtn
                  size="md"
                  color="secondary"
                  className="mt-2"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    if (customItemName && customItemPrice) {
                      setCartItems([
                        ...cartItems,
                        {
                          name: customItemName,
                          vendorPrice: Number(customItemPrice),
                          quantity: 1,
                        },
                      ]);
                      setTotalAmount(totalAmount + Number(customItemPrice));
                      setRemainingAmount(
                        remainingAmount + Number(customItemPrice)
                      );
                      setCustomItemName("");
                      setCustomItemPrice("");
                    }
                  }}
                >
                  Add
                </MDBBtn>
              </div>

              <ul>
                {cartItems.map((user) => (
                  <div key={user._id}>
                    <li>
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
                  </div>
                ))}
              </ul>
              <p>Budget: ${budget}</p>
              <p>Total Amount: ${totalAmount}</p>
              <p className={"text-" + totalColor}>
                Remaining Budget: {totalLeft === null ? "-" : `$${totalLeft}`}
              </p>

              <div style={{ textAlign: "center" }}>
                <MDBBtn onClick={clearCart} className="clearCart">
                  Clear Cart
                </MDBBtn>
              </div>
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

      <Footer />
    </div>
  );
}

export default Vcalculator;
