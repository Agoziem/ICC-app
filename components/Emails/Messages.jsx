import React from "react";
import MessageCard from "./MessageCard";
import SearchInput from "../Inputs/SearchInput";
import "./Email.css";

const Messages = () => {
  return (
    <div>
      <div className="d-flex">
        <h4 className="flex-fill">Inbox</h4>
        <div className="d-flex bg-primary-light">
          <button className="btn btn-sm btn-primary rounded me-2">
            All mail
          </button>
          <button
            className="btn btn-sm btn-primary rounded"
            style={{
              backgroundColor: "var(--bgDarkerColor)",
              borderColor: "var(--bgDarkerColor)",
            }}
          >
            Unread
          </button>
        </div>
      </div>
      <hr />
      <div className="mb-4">
        <SearchInput />
      </div>
      <div className="messageslist d-flex flex-column g-1 pe-2">
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </div>
    </div>
  );
};

export default Messages;
