import React from "react";
import { HiOutlineDocument } from "react-icons/hi2";
import { PiImageBold } from "react-icons/pi";

const ChatAttachments = () => {
  return (
    <ul className="dropdown-menu">
      <li>
        <span className="dropdown-item" style={{ fontSize: "1.0rem" }}>
          <HiOutlineDocument className="me-2" /> Document
        </span>
      </li>
      <li>
        <span className="dropdown-item" style={{ fontSize: "1.0rem" }}>
          <PiImageBold className="me-2" /> Image & Photos
        </span>
      </li>
    </ul>
  );
};

export default ChatAttachments;
