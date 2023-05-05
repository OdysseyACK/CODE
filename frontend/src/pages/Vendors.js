import { useState, useEffect } from "react";
import axios from "axios";
import Vendor from "../components/Vendor";
import { getError } from "../utils";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredVendors = vendors.filter(
    (vendor) => vendor.vendorType === activeTab
  );

  return (
    <div>
      <div className="container">
        <section className="vendors">
          <MDBTabs justify className="mb-3 ">
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
                <div className=" qwe123">{tab}</div>
              </MDBTabsItem>
            ))}
          </MDBTabs>
          <MDBTabsContent>
            <MDBTabsPane show={activeTab === "Artiste"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Catering"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Decor"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Florist"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Photography"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Organiser"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Venue"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === "Others"}>
              <MDBRow>
                {filteredVendors.map((vendor) => (
                  <MDBCol sm="6" md="4" lg="3" key={vendor._id}>
                    <Vendor user={vendor} />
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBTabsPane>
          </MDBTabsContent>
        </section>
      </div>
    </div>
  );
}

export default Vendors;
