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
        console.log("User data from client:", response.data); // Log the fetched user data on the client-side
        setVendorDesc(response.data.vendorDesc);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Failed to fetch user data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>{vendorDesc}</MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <ImageUploadButton />
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
