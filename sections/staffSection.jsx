import React from "react";
import "./section.css";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const StaffSection = () => {
  const staffs = [
    {
      name: "Ndukwe Chiagoziem",
      role: "CEO",
      img: "https://randomuser.me/api/portraits/med/men/76.jpg",
    },
    {
      name: "John Doe",
      role: "Graphic Designer",
      img: "https://randomuser.me/api/portraits/med/women/76.jpg",
    },
    {
      name: "Jane Doe",
      role: "Web Developer",
      img: "https://randomuser.me/api/portraits/med/men/77.jpg",
    },
  ];

  return (
    <>
      <section id="staffs" className="text-center staff-section py-5 px-3 p-md-5">
        <div className="d-md-flex flex-column align-items-center mb-3">
          <h2>Our Staffs</h2>
          <p>
            Our staffs are professionals who are dedicated to providing you with
            the best services and products that concerns Admission process, jamb
            and POST UTME
          </p>
        </div>
        <div className="row justify-content-center align-items-center px-3 px-md-5">
          {staffs.map((staff, index) => (
            <div
              key={index}
              className="col-12 col-md d-flex justify-content-center"
            >
              <div
                className="card p-4 pt-4"
                style={{ width: "100%", maxWidth: "350px", minHeight: "300px" }}
              >
                <div className="card-icon staff d-flex justify-content-center align-items-center align-self-center my-3">
                  <Image
                    src={staff.img}
                    alt={staff.name}
                    width={120}
                    height={120}
                    className="rounded-circle"
                  />
                </div>
                <div className="text-center">
                  <h6 className="text-primary mb-0">{staff.name}</h6>
                  <p className="mb-1 small">{staff.role}</p>
                </div>
                <div
                  className="d-flex justify-content-center mt-2 text-primary"
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  <FaFacebook
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <FaInstagram
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <FaXTwitter
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
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
