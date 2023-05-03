import axios from "axios";
import { useState, useEffect } from "react";
import { MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { EventStore } from "../EventStore";

export default function Vendor(props) {
  const { user } = props;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((response) => {
        // Filter users with isVendor set to true
        const vendorUsers = response.data.filter((user) => user.isVendor);
        setUserData(vendorUsers);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div key={user._id}>
        <Link to={`/profilepage/${user.userId}`}>
          <img src={user.profilePic} alt="" />
        </Link>
      </div>
    </div>
  );
}
