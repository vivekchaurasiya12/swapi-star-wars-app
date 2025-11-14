import React from "react";

const Notification = ({ message, onClose }) => (
  <div className="notification">
    <span>{message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);

export default Notification;
