"use client";
import React, { useEffect, useState } from "react";
import Menu from "./HambugerMenu";
import "./Header.css";
import ".././logo.css";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { FaSearch, FaUser } from "react-icons/fa";
import MainHeaderLogo from "./Logo";
import navlist from "./navitem";

import { useSession } from "next-auth/react";
import Image from "next/image";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { data: session } = useSession();
  // const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleActive = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const header = document.getElementById("header");
        const scrollPosition = window.scrollY;

        if (header) {
          if (scrollPosition > 0) {
            header.style.backgroundColor = "#FFF2FC";
          } else {
            header.style.backgroundColor = "transparent";
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      id="header"
      className="header fixed-top d-flex align-items-center justify-content-between py-3 px-2 px-md-5"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <MainHeaderLogo toggle={toggleMenu} />

      <div className="d-none d-lg-block">
        <ul className="d-flex list-unstyled align-items-center mb-0">
          {navlist.map((item) => {
            return (
              <li className="mx-3" key={item.id}>
                <Link
                  href={item.link}
                  className={activeLink === item.link ? "active" : ""}
                  onClick={() => handleActive(item.link)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mainnav-link d-none d-lg-flex align-items-center">
        <div className="font-bold me-4">
          <FaSearch
            className="text-primary"
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        </div>
        <div className="d-flex">
          <Link href={"/dashboard"}>
            <button
              className="btn btn-primary text-white font-bold me-2"
              style={{
                padding: "7px 22px",
                borderRadius: "25px",
              }}
            >
              {session ? "Dashboard" : "Get Started now"}
            </button>
          </Link>
          {session && (
            <>
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={38}
                  height={38}
                  className="rounded-circle object-fit-cover"
                  style={{ objectPosition: "top center" }}
                />
              ) : (
                <div
                  className="rounded-circle text-white d-flex justify-content-center align-items-center"
                  style={{ width: 40, height: 40, fontSize: 20, backgroundColor: "var(--secondary)" }}
                >
                  {session?.user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <>
        <div className="d-block d-lg-none">
          <FaSearch
            className="me-3 text-primary"
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
          <IoMenu
            className="text-primary"
            onClick={toggleMenu}
            style={{ cursor: "pointer", fontSize: "30px" }}
          />
        </div>

        <Menu isOpen={isOpen} toggle={toggleMenu} />
      </>
    </nav>
  );
};

export default MainHeader;
