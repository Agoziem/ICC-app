import React, { useContext } from "react";
import { OrganizationContext } from "@/data/Organizationalcontextdata";

import Image from "next/image";
import Link from "next/link";

const MainHeaderLogo = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <div>
      <Link href="/" className="logo d-flex align-items-center mt-0 ">
        <Image
          src={
            OrganizationData.Organizationlogo
              ? OrganizationData.Organizationlogo
              : "/logo placeholder.jpg"
          }
          alt="logo"
          width={35}
          height={35}
          className="me-3"
        />
        <span>ICC app</span>
      </Link>
    </div>
  );
};

export default MainHeaderLogo;
