"use client";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import React, { useContext } from "react";

const PrivacyPage = () => {
  /** * @type {{OrganizationData:Organization}}*/
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <div
      className="mx-auto my-5 px-4 px-md-0 py-2"
      style={{
        maxWidth: "800px",
      }}
    >
      {OrganizationData?.privacy_policy ? (
        <div style={{ width: "100%" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: OrganizationData.privacy_policy,
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
