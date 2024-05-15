"use client";
import React, { useContext } from 'react';
import './footer.css';
import { SchoolContext } from '@/data/Organizationalcontextdata';

function Footer() {
  const {schoolData} = useContext(SchoolContext)
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>{schoolData && schoolData.Schoolname}</span>
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
