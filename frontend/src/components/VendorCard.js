import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function VendorCard(props) {
  const { user, addItem } = props;

  return (
    <MDBCard className="btn" style={{ width: "250px", height: "365px" }}>
      <MDBCardImage
        src={user.profilePic ? user.profilePic : "./images/default.jpg"}
        position="top"
        alt="..."
      />
      <MDBCardBody>
        <MDBCardTitle style={{ fontSize: "15px" }}>{user.name}</MDBCardTitle>
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
            <span style={{ fontStyle: "italic" }}>Undefined</span>
          )}
        </MDBCardText>
        <MDBBtn color="info" onClick={() => addItem(user)}>
          Add to Cart
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default VendorCard;
