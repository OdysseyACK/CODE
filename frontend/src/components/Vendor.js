import axios from "axios";
import { useState, useEffect } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { EventStore } from "../EventStore";

export default function Vendor(props) {
  const { user } = props;

  return (
    <div>
      <div key={user._id}>
        <Link to={`/profilepage/${user._id}`}>
          <img src={user.profilePic} alt="" />
        </Link>
      </div>
    </div>
  );
}
