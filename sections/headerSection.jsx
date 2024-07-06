"use client";
import React from "react";
import MainHeader from "@/components/header/Mainheader/MainHeader";
import "./section.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HeaderSection = () => {
  const { data: session } = useSession();
  return (
    <div>
      <MainHeader />
      <section className="hero">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-md-6">
              <div className="header-content text-center text-md-start px-2 px-md-4 pt-md-5">
                <h1>Your Online Solution to admission related Issues </h1>
                <p>
                  platform that provides innovative solutions to all online and
                  Offline related educational problems to students across the
                  trans secondary to tertiary level.
                </p>
                <div className="header-btn">
                  <Link
                    className="btn btn-primary my-2 my-md-0"
                    style={{
                      padding: "10px 30px",
                      borderRadius: "25px",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px",
                    }}
                    href={"/dashboard"}
                  >
                    {
                      session ? "Go to Dashboard" : "Get Started now"
                    }
                   
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="header-image my-4 my-md-0">
                <img className="img-fluid" src={"/hero image.png"} width={573.42} height={444} alt="hero image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderSection;
