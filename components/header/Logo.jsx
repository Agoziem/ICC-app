"use client";
import React, { useContext } from 'react';
import './logo.css';
import Link from 'next/link';

import { RefContext } from '../sidebar/sideBarTogglerContext';
import { OrganizationContext } from '@/data/Organizationalcontextdata';

function Logo({portalname,portallink}) {
  const { OrganizationData } = useContext(OrganizationContext);
  const sidebartoggleref = useContext(RefContext);

  const handleToggleSideBar = () => {
    if (typeof document !== "undefined" ) {
      document.body.classList.toggle("toggle-sidebar");
    }
  };


  
  return (
    <div className="d-flex align-items-center justify-content-between">
      <Link href={`/${portallink}`} className="logo d-flex align-items-center">
        {
          OrganizationData && OrganizationData.Organizationlogo &&
          <img src={OrganizationData.Organizationlogo} alt="logo" width={50} className='me-3' />
        }
        <span className="d-none d-lg-block">{portalname}</span>
      </Link>
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
        ref={sidebartoggleref}
       
      ></i>
    </div>
  );
}

export default Logo;
