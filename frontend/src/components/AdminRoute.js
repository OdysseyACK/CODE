import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { EventStore } from "../EventStore";

export default function AdminRoute({ children }) {
  const { state } = useContext(EventStore);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/login" />;
}
