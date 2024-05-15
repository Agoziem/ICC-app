"use client";
import React from 'react';
import "./Header.css"


const Menu = ({ isOpen }) => {
  return (
    <nav className={`menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Menu;
