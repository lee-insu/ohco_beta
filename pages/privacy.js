import React from "react";
import { privacyConsent } from "../components/Privacy";

const privacy = () => {
  return (
    <textarea
      style={{ width: "100%", height: "95vh", border: "none", resize: "none" }}
      value={privacyConsent}
    ></textarea>
  );
};

export default privacy;
