"use client";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import React, { useContext } from "react";

const PrivacyPage = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <div
      className="mx-auto mt-3 px-4 px-md-0 py-2"
      style={{
        maxWidth: "800px",
      }}
    >
    
      <h4>Privacy Policy</h4>
      <hr />
      {OrganizationData?.privacyPolicy ? (
        <div style={{ width: "100%" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: OrganizationData.privacyPolicy,
            }}
            style={{
              fontSize: "1.1rem",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p
            className="p-3 text-primary text-center bg-primary-light mt-1 mb-3 rounded"
            style={{ minWidth: "300px" }}
          >
            No Privacy Policy Found
          </p>
        </div>
      )}
    </div>
  );
};

export default PrivacyPage;
