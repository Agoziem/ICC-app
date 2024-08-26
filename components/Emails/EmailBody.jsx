import React from "react";
import ProfileimagePlaceholders from "../ImagePlaceholders/ProfileimagePlaceholders";
import EmailInput from "../Inputs/EmailInput";

const EmailBody = () => {
  return (
    <div
      className="rounded ps-0 ps-md-4"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* the details */}
      <div className="d-flex">
        <div className="flex-fill d-flex">
          <ProfileimagePlaceholders firstname="John" />
          <div className="ms-2">
            <h5>Meeting Tomorrow</h5>
            <p className="text-primary small my-0">From: John Doe</p>
            <p className="text-primary small my-0">
              reply to: Johndoe90@gmail.com
            </p>
          </div>
        </div>
        <div>
          <p className="text-primary">10:00 AM</p>
        </div>
      </div>

      {/* the message */}
      <div
        className="mt-3 p-3 rounded text-white"
        style={{
          backgroundColor: "var(--bgDarkerColor)",
          minHeight: "70vh",
        }}
      >
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
          sodales ligula in libero. Sed dignissim lacinia nunc.
        </p>
      </div>

      {/* the reply */}
      <div className="mt-3">
        <EmailInput />
      </div>
    </div>
  );
};

export default EmailBody;
