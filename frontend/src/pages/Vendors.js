import { Tab, Tabs, Col } from "react-bootstrap";
import Vendor from "../components/Vendor";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Vendors() {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    users: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/users");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILURE", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-slideshow">
          <div class="slide"></div>
          <div class="slide"></div>
        </div>
        <div className="hero-content text-center sliding-text-container"></div>
      </section>
      <div className="container mt-5">
        <section className="vendors">
          <h1 className="text-center">Vendors</h1>
          <Tabs defaultActiveKey="artistes" id="fill-tab" className="mb-3" fill>
            <Tab eventKey="artistes" title="Artistes"></Tab>
            <Tab eventKey="catering" title="Catering">
              <Col className="d-flex justify-content-center"></Col>
            </Tab>
            <Tab eventKey="decor" title="Decor"></Tab>
            <Row>
              {users.map((user) => (
                <Col key={users._id} sm={6} md={4} lg={3} className="mn-3">
                  <Vendor user={user}></Vendor>
                </Col>
              ))}
            </Row>

            <Tab eventKey="florists" title="Florists"></Tab>

            <Tab eventKey="photography" title="Photography"></Tab>

            <Tab eventKey="organisers" title="Organisers"></Tab>

            <Tab eventKey="venues" title="Venues"></Tab>

            <Tab eventKey="Others" title="Others"></Tab>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

export default Vendors;
