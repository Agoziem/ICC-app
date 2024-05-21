"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import Alert from "@/components/Alert/Alert";
import { OrganizationContext } from "@/data/Organizationalcontextdata";

const FooterSection = () => {
  const { OrganizationData} = useContext(OrganizationContext);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [submitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    show: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setIsSubmitting(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/subscription/add/${OrganizationData.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          setIsSubmitting(false);
          setFormData({
            email: "",
          });
          setAlert({
            type: "success",
            message: "You have successfully subscribed to our newsletter",
            show: true,
          });
          setTimeout(() => {
            setAlert({
              type: "",
              message: "",
              show: false,
            });
          }, 5000);
        } else {
          throw new Error("Something went wrong. Please try again later");
        }
      } catch (error) {
        setIsSubmitting(false);
        setAlert({
          type: "danger",
          message: error.message,
          show: true,
        });
        setTimeout(() => {
          setAlert({
            type: "",
            message: "",
            show: false,
          });
        }, 3000);
      }
      }
    }


  return (
    <section className="footer">
      <div className="p-5 p-md-5">
        <div className="row px-0 px-md-5">
          <div className="col-12 col-md-6">
            <div className="footer-info pe-0 pe-md-5 mb-4 mb-md-0">
              <h5>ICC app</h5>
              <p className="small mb-1">
                connect with us on our social media platforms
              </p>
              <div className="social-links">
                <Link
                  href="https://www.facebook.com/innovationscybercafe?mibextid=ZbWKwL"
                  target="_blank"
                >
                  <FaFacebook
                    className="me-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <Link href="https://wa.me/+234813 635 8370" target="_blank">
                  <IoLogoWhatsapp
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/innovationscybercafe?igsh=ZTBsMzVkaDBhZ29y"
                  target="_blank"
                >
                  <FaInstagram
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Link>
                <Link
                  href="https://x.com/innovationscafe?t=W6oditlAiCOBx_0x32TQsw&s=09"
                  target="_blank"
                >
                  <FaXTwitter
                    className="mx-2"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </div>
              <div className="mt-3">
                <p className="small">
                  subscribe to our newsletter to get updates on our latest
                  products and services
                </p>
                {alert.show && (
                  <Alert type={alert.type} className="mb-2">
                    {alert.message}
                  </Alert>
                )}
                {formErrors.email && (
                  <div className="text-danger mb-2">{formErrors.email}</div>
                )}
                <div className="subscribe-input d-md-flex">
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />

                  <button
                    className="btn btn-primary ms-0 ms-md-3 mt-3 mt-md-0"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {
                      submitting ? "Subscribing..." : "Subscribe"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 d-flex justify-content-center ">
            <div className="footer-links">
              <h6>Quick Links</h6>
              <ul className=" list-unstyled ">
                <li>
                  <a className="small" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    Services
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    staff
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-md-3 d-flex justify-content-center ">
            <div className="footer-links">
              <h6>features</h6>
              <ul className="list-unstyled">
                <li>
                  <a className="small" href="#">
                    CBT practice
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    Chatroom
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    Jamb
                  </a>
                </li>
                <li>
                  <a className="small" href="#">
                    Post Utme
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* subfooter */}
      <div className="subfooter py-3 d-flex justify-content-center align-items-center">
        <p className="text-center small mb-0">
          &copy; 2021 Innovation Cyber Cafe. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default FooterSection;
