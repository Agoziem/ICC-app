import React from "react";
import EmailBody from "./EmailBody";
import Messages from "./Messages";

const Email = () => {
  return (
    <div className="row justify-content-between" style={{
        minHeight: "100vh",
    }}>
      <div className="col-5">
        <Messages />
      </div>
      <div className="col-7">
        <EmailBody />
      </div>
    </div>
  );
};

export default Email;
