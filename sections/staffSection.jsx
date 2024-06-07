"use client";
import React from "react";
import "./section.css";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const StaffSection = () => {
  const staffs = [
    {
      id: 1,
      name: "Ndukwe Chiagoziem",
      role: "CEO",
      img: "https://randomuser.me/api/portraits/med/men/76.jpg",
      instagramlink: "#",
      facebooklink: "#",
      twitterlink: "#",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Graphic Designer",
      img: "https://randomuser.me/api/portraits/med/women/76.jpg",
      instagramlink: "#",
      facebooklink: "#",
      twitterlink: "#",
    },
    {
      id: 3,
      name: "Jane Doe",
      role: "Web Developer",
      img: "https://randomuser.me/api/portraits/med/men/77.jpg",
      instagramlink: "#",
      facebooklink: "#",
      twitterlink: "#",
    },
  ];

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
          {staffs.map((staff) => (
            <div
              key={staff.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <div className="card mx-auto">
                <div
                  className="staff-image"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <img
                    src={staff.img}
                    alt={staff.name}
                    style={{
                      borderRadius: "10px 10px 0px 0px",
                      objectFit: "cover",
                      objectPosition: "top center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                <div className="px-4 pt-3 pb-5">
                  <div className="text-center">
                    <h6 className="text-primary mb-0">{staff.name}</h6>
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
                      onClick={() =>{
                        if (staff.twitterlink !== "#")
                        window.open(staff.twitterlink);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default StaffSection;
