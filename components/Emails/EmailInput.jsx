import React from "react";

const EmailInput = () => {
  return (
    <div>
      <textarea
        className="form-control"
        placeholder="Type your message here..."
        rows={2}
        style={{
          border: "1.5px solid var(--bgDarkerColor)",
          background: "var(--bgDarkColor)",
          color: "white",
        }}
        // value={message}
        // onChange={(e) => setMessage(e.target.value)}
      />
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary rounded">Send</button>
      </div>
    </div>
  );
};
// 

export default EmailInput;
