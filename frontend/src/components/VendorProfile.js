import React, { useState, useEffect } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import axios from "axios";
import ImageUploadButton from "./ImageUploadButton";

export default function VendorProfile({ userId }) {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [vendorDesc, setVendorDesc] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;

    if (!token) {
      return;
    }

    axios
      .get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVendorDesc(response.data.vendorDesc);
        setVendorName(response.data.name);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Failed to fetch user data", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="vendor-profile"
      style={{
        height: "100vh",
        backgroundColor: "#278b7b",
        marginBottom: "-100px",
      }}
    >
      <MDBTabs justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            About the Co.
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Gallery
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className="vendor-desc">
        <MDBTabsPane
          style={{
            margin: "50px",
            display: "justify",
            color: "white",
            fontFamily: "lato",
            textAlign: "center",
          }}
          show={justifyActive === "tab1"}
        >
          <h3 style={{ textAlign: "center" }}>{vendorName}</h3>
          {vendorDesc}
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <ImageUploadButton />
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
