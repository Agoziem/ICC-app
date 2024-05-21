"use client";
import React, { useState } from "react";
import Menu from "./HambugerMenu";
import "./Header.css";
import ".././logo.css";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import MainHeaderLogo from "./Logo";
import navlist from "./navitem";

// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  // const { data: session } = useSession();

  // const [providers, setProviders] = useState(null);
  // const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  const handleActive = (link) => {
    setActiveLink(link);
  };
  
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', function() {
      var header = document.getElementById('header');
      var scrollPosition = window.scrollY;
    
      // Change background color based on scroll position
      if (scrollPosition > 0) {
        header.style.backgroundColor = '#FFF2FC';
      } else {
        header.style.backgroundColor = 'transparent';
      }
    });
  }
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="header" className="header fixed-top d-flex align-items-center justify-content-between py-3 px-2 px-md-5">
      <MainHeaderLogo toggle={toggleMenu} />

      <div className="d-none d-lg-block">
        <ul className="d-flex list-unstyled align-items-center mb-0">
          {navlist.map((item) => {
            return (
              <li className="mx-3" key={item.id}>
                <Link href={item.link}
                 className={activeLink === item.link ? "active" : ""}
                 onClick={() => handleActive(item.link)}
                >{item.title}</Link>
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
        <Link href={"/"}>
          <button
            className="btn btn-primary text-white font-bold"
            style={{
              padding: "7px 22px",
              borderRadius: "25px",
            }}
          >
            Get Started now
          </button>
        </Link>
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
