import React, { useContext } from "react";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Link from "next/link";

const MainHeaderLogo = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <div>
      <Link href="/" className="logo d-flex align-items-center mt-0 ">
        <img
          src={
            OrganizationData.Organizationlogo
              ? OrganizationData.Organizationlogo
              : "/logo placeholder.jpg"
          }
          alt="logo"
          width={50}
          height={35}
          className="me-3"
          style={{
            height: "auto",
          }}
        />
        <span>ICC app</span>
      </Link>
    </div>
  );
};

export default MainHeaderLogo;
