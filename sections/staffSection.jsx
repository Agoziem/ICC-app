"use client";
import React, { useContext } from "react";
import "./section.css";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { PiGearBold, PiGraduationCapBold } from "react-icons/pi";
import { TbBooks } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import Link from "next/link";

const StaffSection = () => {
  const { depts, staffs } = useContext(OrganizationContext);
  const dept_icons = [
    {
      id: 1,
      icon: <MdOutlineQuestionAnswer />,
    },
    {
      id: 2,
      icon: <PiGraduationCapBold />,
    },
    {
      id: 3,
      icon: <TbBooks />,
    },
    {
      id: 4,
      icon: <RiCustomerService2Line />,
    },
    {
      id: 5,
      icon: <PiGearBold />,
    },
    
  ];
  return (
    <>
      <section
        id="staffs"
        className="text-center staff-section py-5 px-3 p-md-5"
      >
        <div className="d-md-flex flex-column align-items-center mb-3">
          <h2>Our Departments</h2>
          <p>
            our departments are well structured to meet your needs and provide
            you with the best services
          </p>
        </div>

        <div className="row px-4 px-md-5">
          {depts && depts.length > 0 ? (
            depts.map((dept, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card py-3 mx-auto">
                  <div className="card-body">
                    <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                      <span className="dept-icon h1 mb-3 text-secondary">
                        {dept_icons.find((icon) => icon.id === dept.id)?.icon || <PiGearBold />}
                      </span>
                      <h4 className="mb-0">{dept.name}</h4>
                    </div>
                    <p>{dept.description.substring(0, 100) + " ..."}</p>
                    <div>
                      <Link
                        href={`/department/${dept.id}`}
                        className="btn btn-sm btn-accent-secondary rounded"
                      >
                        view Department
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 d-flex justify-content-center">
              <p className="p-3 text-primary text-center bg-primary-light mt-1 mb-3 rounded" style={{ minWidth: "300px" }}>
                No Department yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StaffSection;
