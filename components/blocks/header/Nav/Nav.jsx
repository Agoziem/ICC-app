"use client";
import React from 'react';
import './nav.css';
// import Navlinks from './Navlinks'
import NavSearch from './NavSearch';
import NavNotice from './NavNotice';
import NavMessage from './NavMessage';
import NavAvatar from './NavAvatar';

function Nav() {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        {/* <Navlinks /> */}
        <NavSearch />
        <NavNotice />
        <NavMessage />
        <NavAvatar />
      </ul>
    </nav>
  );
}

export default Nav;
