"use client";
import React from 'react';
import "./Header.css"


const Hambuger = ({ isOpen, toggle }) => {
  return (
    <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggle}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </button>
  );
};

export default Hambuger;