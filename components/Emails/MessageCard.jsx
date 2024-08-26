import React from "react";
import "./Email.css";

const MessageCard = () => {
  return (
    <div className="EmailCard card p-3 pt-4">
      {/* message details */}
      <div className="d-flex">
        <div className="flex-fill">
          <h6 className="mb-0">John Doe</h6>
          <p className="fw-bold my-1">Meeting Tomorrow</p>
        </div>
        <div>
          <p className="text-muted mt-1">10:00 AM</p>
        </div>
      </div>
      {/* shortened message */}
      <div>
        <p className="text-muted mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi...
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
