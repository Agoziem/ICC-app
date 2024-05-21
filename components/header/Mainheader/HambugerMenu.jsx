"use client";
import React, { useState } from "react";
import "./Header.css";
import Link from "next/link";
import MainHeaderLogo from "./Logo";
import { FaTimes } from "react-icons/fa";
import navlist from "./navitem";
import { useRouter } from "next/navigation";

const Menu = ({ isOpen, toggle }) => {
  const [activeLink, setActiveLink] = useState("/");
  const router = useRouter();
  return (
    <nav className={`menu ${isOpen ? "open" : ""}`}>
      <div className="d-flex justify-content-between px-3 pt-3">
        <MainHeaderLogo />
        <FaTimes
          onClick={toggle}
          style={{ cursor: "pointer", fontSize: "25px" }}
        />
      </div>

      <ul className="pt-4 px-3">
        {navlist.map((item) => {
          return (
            <li className="mx-3 py-2" key={item.id}>
              <Link
                href={item.link}
                className={activeLink === item.link ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(item.link);
                  router.push(`${item.link}`);
                  toggle();
                }}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="d-flex justify-content-center mt-2 px-3">
        <div className="btn btn-primary text-white font-bold w-100">
          Get Started now
        </div>
      </div>
    </nav>
  );
};

export default Menu;
