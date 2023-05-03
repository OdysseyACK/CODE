import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "../components/UserProfile";
import VendorProfile from "../components/VendorProfile";
import { useParams } from "react-router-dom";
import EditProfileButton from "../components/EditProfileButton";

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsVendor(response.data.isVendor);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user data");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user && (
        <div className="profile-container">
          <img
            className="profile-pic"
            src={user.profilePic}
            alt="Profile pic"
          />
          <h1 style={{ marginTop: "10rem" }}>{user.name}</h1>
          <EditProfileButton />
        </div>
      )}
      {isVendor ? <VendorProfile /> : <UserProfile />}
    </div>
  );
}

export default ProfilePage;
