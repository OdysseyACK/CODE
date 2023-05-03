import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { EventStore } from "../EventStore";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(EventStore);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/login" />;
}
