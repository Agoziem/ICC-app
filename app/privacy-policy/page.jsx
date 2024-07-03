"use client";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import React, { useContext } from "react";

const PrivacyPage = () => {
  const { OrganizationData } = useContext(OrganizationContext)

  return (
    <div
      className="mx-auto px-4 px-md-0 py-2"
      style={{
        maxWidth: "800px",
      }}
    >
      <h4>Privacy Policy</h4>
      <hr />
      <div 
        dangerouslySetInnerHTML={{
          __html: OrganizationData.privacy_policy,
        }}
      />
    </div>
  );
};

export default PrivacyPage;
