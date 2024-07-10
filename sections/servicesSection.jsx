"use client";
import React, { useContext } from "react";
import { LuCheckCircle } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import ReusableSwiper from "@/components/Swiper/ReusableSwiper";
import { useCart } from "@/data/Cartcontext";

const ServicesSection = () => {
  const { services, categories, openModal } = useContext(OrganizationContext);
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <section id="services" className="features p-2 py-5 p-md-5">
      <div className="row align-items-center px-5 px-md-4 pb-2 mb-5">
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
              <LuCheckCircle className="text-secondary  me-2" /> Sales of
              Checker cards
            </li>

            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Printing of
              WAEC Certificate, Neco Certificate and E Verification
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Academic
              Consultation
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Processing of
              Affidavits and All Documents for School Clearance
            </li>

            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Tutorials and
              Skill Acquisition for Students Productivity.
            </li>
            <li className="py-1">
              <LuCheckCircle className="text-secondary  me-2" /> Hostel bookings
              Campus & Off-campus
            </li>
          </ul>

          <Link href={"/dashboard/services"} className="btn btn-primary mt-2">
            get started now <FaLongArrowAltRight className="ms-2" />
          </Link>
        </div>
      </div>

      <hr className="text-primary pt-4" />

      {categories && categories.length > 0 && (
        <>
          {/* Handle Other Categories */}
          {categories
            .filter((category) => category.category !== "application")
            .filter((category) =>
              services.some((service) => service.category.id === category.id)
            )
            .map((category) => (
              <React.Fragment key={category.id}>
                <div className="p-3 py-5 p-md-5">
                  <h4 className="mb-4">{category.category} Services</h4>
                  <ReusableSwiper noItemsMessage="No Service yet">
                    {services &&
                      services
                        .filter(
                          (service) => service.category.id === category.id
                        )
                        .map((service) => (
                          <div key={service.id} className="card p-4" style={{}}>
                            <div className="d-flex justify-content-center align-items-center">
                              {service.preview ? (
                                <img
                                  src={service.img_url}
                                  alt="services"
                                  width={80}
                                  height={80}
                                  className="me-3 rounded-circle object-fit-cover"
                                  style={{ objectPosition: "center" }}
                                />
                              ) : (
                                <div
                                  className="me-3 d-flex justify-content-center align-items-center"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--bgDarkColor)",
                                    color: "var(--bgDarkerColor)",
                                  }}
                                >
                                  <i className="bi bi-person-fill-gear h2 mb-0"></i>
                                </div>
                              )}
                            </div>
                            <div className="my-2 mt-3 text-center">
                              <h6>
                                {service.name.length > 30
                                  ? service.name.slice(0, 30) + "..."
                                  : service.name}
                              </h6>
                              <p className="text-primary mb-1">
                                {service.description.length > 100 ? (
                                  <span>
                                    {service.description.substring(0, 100)}...{" "}
                                    <span
                                      className="text-secondary fw-bold"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => openModal(service)}
                                    >
                                      view more
                                    </span>
                                  </span>
                                ) : (
                                  service.description
                                )}
                              </p>
                              <hr />
                              <div className="d-flex justify-content-around mt-4">
                                <span className="fw-bold text-primary me-2">
                                  &#8358;{parseFloat(service.price)}
                                </span>

                                {cart.find((item) => item.id === service.id) ? (
                                  <span
                                    className="badge bg-secondary-light text-secondary p-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeFromCart(service.id)}
                                  >
                                    remove Service {"  "}
                                    <i className="bi bi-cart-dash"></i>
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-success-light text-success p-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => addToCart(service)}
                                  >
                                    Add Service {"  "}
                                    <i className="bi bi-cart-plus"></i>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                  </ReusableSwiper>
                </div>
                <hr className="text-primary" />
              </React.Fragment>
            ))}

          {/* Handle Application Category Separately */}
          {categories
            .filter((category) => category.category === "application")
            .map((category) => {
              const applicationServices = services.filter(
                (service) => service.category.id === category.id
              );

              return applicationServices.length > 0 ? (
                <React.Fragment key={category.id}>
                  <div className="p-3 py-5 p-md-5">
                    <h4 className="mb-4">{category.category} Services</h4>
                    <ReusableSwiper noItemsMessage="No Application yet">
                      {applicationServices.map((service) => (
                        <div key={service.id} className="card p-4" style={{}}>
                          <div className="d-flex justify-content-center align-items-center">
                            {service.preview ? (
                              <img
                                src={service.img_url}
                                alt="services"
                                width={80}
                                height={80}
                                className="me-3 rounded-circle object-fit-cover"
                                style={{ objectPosition: "center" }}
                              />
                            ) : (
                              <div
                                className="me-3 d-flex justify-content-center align-items-center"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  backgroundColor: "var(--bgDarkColor)",
                                  color: "var(--bgDarkerColor)",
                                }}
                              >
                                <i className="bi bi-google-play h2 mb-0"></i>
                              </div>
                            )}
                          </div>
                          <div className="my-2 mt-3 text-center">
                            <h6>
                              {service.name.length > 30
                                ? service.name.slice(0, 30) + "..."
                                : service.name}
                            </h6>
                            <p className="text-primary mb-1">
                              {service.description.length > 100 ? (
                                <span>
                                  {service.description.substring(0, 100)}...{" "}
                                  <span
                                    className="text-secondary fw-bold"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openModal(service)}
                                  >
                                    view more
                                  </span>
                                </span>
                              ) : (
                                service.description
                              )}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-around mt-4">
                              <span className="fw-bold text-primary me-2">
                                &#8358;{parseFloat(service.price)}
                              </span>

                              {cart.find((item) => item.id === service.id) ? (
                                <span
                                  className="badge bg-secondary-light text-secondary p-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => removeFromCart(service.id)}
                                >
                                  remove application {"  "}
                                  <i className="bi bi-cart-dash"></i>
                                </span>
                              ) : (
                                <span
                                  className="badge bg-success-light text-success p-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => addToCart(service)}
                                >
                                  Add application {"  "}
                                  <i className="bi bi-cart-plus"></i>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </ReusableSwiper>
                  </div>
                  <hr className="text-primary" />
                </React.Fragment>
              ) : null;
            })}
        </>
      )}

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
