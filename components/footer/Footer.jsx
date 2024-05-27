"use client";
import React, { useContext } from 'react';
import './footer.css';
import { OrganizationContext } from '@/data/Organizationalcontextdata';

function Footer() {
  const {OrganizationData } = useContext(OrganizationContext)
  return (
    <footer id="footer" className="dashboardfooter">
      <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>
            {OrganizationData?.name}
          </span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="#">GDD Impact</a>
      </div>
    </footer>
  );
}

export default Footer;
