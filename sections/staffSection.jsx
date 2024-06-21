"use client";
import React, { useContext } from "react";
import "./section.css";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { BsPersonFillExclamation } from "react-icons/bs";

const StaffSection = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  return (
    <>
      <section
        id="staffs"
        className="text-center staff-section py-5 px-3 p-md-5"
      >
        <div className="d-md-flex flex-column align-items-center mb-3">
          <h2>Our Staffs</h2>
          <p>
            Our staffs are professionals who are dedicated to providing you with
            the best services and products that concerns Admission process, jamb
            and POST UTME
          </p>
        </div>

        <div className="row px-0 px-md-5">
          {OrganizationData && OrganizationData.staffs?.length > 0 ? (
            OrganizationData.staffs.map((staff) => (
              <div key={staff.id} className="col-12 col-md-6 col-lg-4">
                <div className="card mx-auto">
                  <div
                    className="staff-image"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "250px",
                    }}
                  >
                    {
                      staff.img ? (
                        <img
                          src={staff.img_url}
                          alt={staff.img_name}
                          className="img-fluid"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "0.5rem 0.5rem 0 0",
                            objectPosition: "top center",
                          }}
                        />
                      ) : (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "var(--bgDarkColor)",
                            borderRadius: "0.5rem 0.5rem 0 0",
                            color: "var(--bgDarkerColor)",
                            fontSize: "5rem",
                          }}
                        >
                          <BsPersonFillExclamation />
                        </div>
                      )
                    }
                  </div>

                  <div className="px-4 pt-3 pb-5">
                    <div className="text-center">
                      <h6 className="text-primary mb-0">{staff.first_name}{staff.last_name}</h6>
                      <p className="mb-1 small">{staff.role}</p>
                    </div>
                    <div
                      className="d-flex justify-content-center mt-3 text-primary"
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      <FaFacebook
                        className="mx-2"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (staff.facebooklink !== "#")
                            window.open(staff.facebooklink);
                        }}
                      />
                      <FaInstagram
                        className="mx-2"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (staff.instagramlink !== "#")
                            window.open(staff.instagramlink);
                        }}
                      />
                      <FaXTwitter
                        className="mx-2"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (staff.twitterlink !== "#")
                            window.open(staff.twitterlink);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No staffs available</h5>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StaffSection;
