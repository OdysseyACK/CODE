import { useState, useEffect } from "react";
import axios from "axios";
import Vendor from "../components/Vendor";
import { getError } from "../utils";
import Footer from "../components/Footer";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("Artiste");

  useEffect(() => {
    axios
      .get(`/api/users/vendors`)
      .then((response) => {
        setVendors(response.data.filter((vendor) => vendor.isActive));
      })
      .catch((error) => {
        console.log(error);
        console.log(getError(error));
      });
  }, []);

  const handleTabClick = (vendorType) => {
    setActiveTab(vendorType);
  };

  const filteredVendors = vendors.filter(
    (vendor) => vendor.vendorType === activeTab
  );

  return (
    <div>
      <section className="vendors">
        <div className="vendors-tab-container">
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
            <div
              key={tab}
              className={`vendor-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              <div className="tools">
                <div className="circle">
                  <span className="red box"></span>
                </div>
                <div className="circle">
                  <span className="yellow box"></span>
                </div>
                <div className="circle">
                  <span className="green box"></span>
                </div>
              </div>
              <span className="tab-text">{tab}</span>
            </div>
          ))}
        </div>

        <div className="vendors-content-container">
          {filteredVendors.map((vendor) => (
            <Vendor key={vendor._id} user={vendor} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Vendors;
