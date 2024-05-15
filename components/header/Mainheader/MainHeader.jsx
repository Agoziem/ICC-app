"use client";
import React, { useEffect,useState } from 'react';
import Hambuger from './Hambuger';
import Menu from './HambugerMenu';
import "./Header.css"
import '.././logo.css';
import Link from "next/link";
import Image from "next/image";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { data: session } = useSession();

    // const [providers, setProviders] = useState(null);
    // const [toggleDropdown, setToggleDropdown] = useState(false);

    // useEffect(() => {
    //   (async () => {
    //     const res = await getProviders();
    //     setProviders(res);
    //   })();
    // }, []);

  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className='d-flex justify-content-between px-5 align-items-center '>
        
        <Link href="/" className="logo d-flex align-items-center">
          <Image src="/images/GDD Impact.jpg" alt="logo" width={35} height={35} className='me-3' />
          <span className="d-none d-lg-block">Teachers Portal</span>
        </Link>
        
        
        <div>
          <ul className='d-flex list-unstyled '>
            <li className='mx-3'><Link href={"/"}>Home</Link></li>
            <li className='mx-3'><Link href={"/students-portal"}>Students Portal</Link></li>
            <li className='mx-3'><Link href={"/teachers-portal"}>Teachers Portal</Link></li>
            <li className='mx-3'><Link href={"/admin-portal"}>Admin Portal</Link></li>
            <li className='mx-3'><Link href={"/"}>Contact</Link></li>
          </ul>
        </div>

        <div className='flex'>
          <div className='font-bold mx-2 px-5 py-2'>
            <Link href={"/"}>
              Sign Up
            </Link>
          </div> 
          <Link href={"/"}>
            <div className='btn text-white font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 px-5 py-2 rounded-lg'>
              Sign In 
            </div>
          </Link>
        </div>
        
        <>
          <Hambuger isOpen={isOpen} toggle={toggleMenu} />
          <Menu isOpen={isOpen} />
        </>
      </nav>
    );
  };
  
  export default MainHeader;
  