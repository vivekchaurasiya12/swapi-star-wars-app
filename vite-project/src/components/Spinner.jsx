import React from "react";

const Spinner = ({ overlay }) => (
  <div className={overlay ? "spinner-overlay-full" : "spinner-overlay"}>
    <div className="spinner"></div>
  </div>
);

export default Spinner;
