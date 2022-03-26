import React from "react";
import { serviceScent } from "../components/Privacy";

const agreement = () => {
  return (
    <textarea
      style={{ width: "100%", height: "95vh", border: "none", resize: "none" }}
      value={serviceScent}
    ></textarea>
  );
};

export default agreement;
