import Image from "next/image";
import React from "react";
import { LuCheckCircle } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <section id="services" className="features p-2 py-5 p-md-5">
      <div className="row align-items-center px-5 px-md-4 pb-2">
        <div className="col-12 col-md-6 feature-image d-flex justify-content-center ">
          <img
            className="img-fluid mb-4 mb-md-0"
            src="/features image.png"
            alt="feature"
            width={500}
            height={500}
            style={{ minWidth: "288px" }}
          />
        </div>
        <div className="col-12 col-md-6 px-0 px-md-5">
          <h6>
            <span className="text-primary">what we do </span>
          </h6>
          <h3
            style={{
              lineHeight: "1.4",
            }}
          >
            <span className="text-primary">
              We offer a wide range of services
            </span>{" "}
            to help you with your Admission process.
          </h3>
          <ul className="list-unstyled text-primary mt-3">
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" />
              Sales of JAMB/Post UTME forms
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" />
              Sales of Checker cards
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Printing of
              WAEC Certificate
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Printing of
              Neck Certificate and E Verification
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" /> Processing of
              Affidavits
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" /> All Documents
              Processing for School Clearance
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" /> Tutorials and
              Skill Acquisition for Students Productivity.
            </li>
          </ul>

          <Link href={"/dashboard/services"} className="btn btn-primary mt-2">
            get started now <FaLongArrowAltRight className="ms-2" />
          </Link>
        </div>
      </div>

      <hr className="text-primary pt-3" />
      {/* CBT advert */}
      <div className="row align-items-center px-4 px-md-5 mt-5 mt-md-3">
        <div className="col-12 col-md-6">
          <h6>
            <span className="text-primary">CBT Practice </span>
          </h6>
          <h4
            style={{
              lineHeight: "1.4",
            }}
          >
            <span className="text-primary">
              Prepare for your Favourite Exams such as jamb, Neco and Weac etc
            </span>{" "}
            with our CBT platform.
          </h4>
          <ul className="list-unstyled text-primary mt-3">
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" /> Complete Exam
              feel for your Upcoming Exam
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> automatic
              result generation with Corrections
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Practice with
              over 1000+ Questions
            </li>
          </ul>
          <Link href={"/dashboard/cbt"} className="btn btn-primary mt-2">
            practice now <FaLongArrowAltRight className="ms-2" />
          </Link>
        </div>
        <div className="col-12 col-md-6 feature-image d-flex justify-content-center">
          <img
            className="img-fluid mt-4 mt-md-0"
            src="/CBT image.png"
            alt="feature"
            width={700}
            height={700}
            style={{ minWidth: "298px" }}
          />
        </div>
      </div>

      <hr className="text-primary pt-4" />
      {/* built in Chat Community */}
      <div className="row align-items-center px-5 px-md-4 pb-2 mt-4 mt-md-3">
        <div className="col-12 col-md-6 feature-image d-flex justify-content-center">
          <img
            className="img-fluid mb-4 mb-md-0"
            src="/Chat room.png"
            alt="feature"
            width={650}
            height={650}
            style={{ minWidth: "269px" }}
          />
        </div>
        <div className="col-12 col-md-6 px-0 px-md-5">
          <h6>
            <span className="text-primary">built in Chat Community</span>
          </h6>
          <h3
            style={{
              lineHeight: "1.4",
            }}
          >
            <span className="text-primary">
              explore and start conversations with the Admins
            </span>{" "}
            and other users.
          </h3>
          <ul className="list-unstyled text-primary mt-3">
            <li className="py-1">
              <LuCheckCircle className="text-secondary me-2" />
              you recieve responses and your documents as soon as possible
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" />
              your questions are answered by the Admins and other users
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" />
              Online Orientations and guidance to Jamb and Postutme Processes
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" />
              and lots more
            </li>
          </ul>

          <Link href={"/dashboard/chat"} className="btn btn-primary mt-2">
            get started now <FaLongArrowAltRight className="ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
