"use client";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import React, { useContext } from "react";

const TermsPage = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <div
      className="mx-auto mt-3 px-4 px-md-0"
      style={{
        maxWidth: "900px",
      }}
    >
      <h4>Terms of Use</h4>
      <hr />
      {OrganizationData?.termsOfUse ? (
        <div style={{ width: "100%" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: OrganizationData.termsOfUse,
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
            No Terms of Use yet
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsPage;
