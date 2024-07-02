"use client";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import React, { useContext } from "react";

const TermsPage = () => {
  const { OrganizationData } = useContext(OrganizationContext)
  return (
    <div
      className="mx-auto mt-3"
      style={{
        maxWidth: "900px",
      }}
    >
      <h4>Terms of Use</h4>
      <hr />
      <div
        dangerouslySetInnerHTML={{
          __html: OrganizationData.terms_of_use,
        }}
       />
    </div>
  );
};

export default TermsPage;
