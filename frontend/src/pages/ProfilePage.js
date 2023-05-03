import { React, useContext } from "react";
import { Image } from "react-bootstrap";
import Event from "./Event";
import { EventStore } from "../EventStore";
import EditProfileButton from "../components/EditProfileButton";

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(EventStore);
  const { userInfo } = state;

  return (
    <div>
      <div className="text-center">
        <img src={userInfo.profilePic} alt="" />
      </div>

      <p style={{ fontSize: "1rem", width: "100%", textAlign: "left" }}>
        Name: {userInfo.name}
      </p>

      <EditProfileButton />
    </div>
  );
}
