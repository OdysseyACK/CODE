import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { EventStore } from "../EventStore";

export default function VendorRoute({ children }) {
  const { state } = useContext(EventStore);
  const { userInfo } = state;
  return userInfo && userInfo.isVendor ? children : <Navigate to="/" />;
}
