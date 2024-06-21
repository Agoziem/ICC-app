"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosMailOpen } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import Alert from "@/components/Alert/Alert";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { useSession } from "next-auth/react";

const ContactSection = () => {
  const { OrganizationData,setMessages,messages } = useContext(OrganizationContext);
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    show: false,
  });

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.message) errors.message = "your message is required";
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

  useEffect(() => {
    if (session) {
      setFormData({
        ...formData,
        name: session.user.name || session.user.username,
        email: session.user.email,
      });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/emailsapi/add_email/${OrganizationData.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsSubmitting(false);
          setMessages([ data,...messages]);
          setFormData({
            name: "",
            email: "",
            message: "",
            subject: "",
          });
          setAlert({
            type: "success",
            message: "Message sent successfully",
            show: true,
          });
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setIsSubmitting(false);
        setAlert({
          type: "danger",
          message: "Something went wrong",
          show: true,
        });
      } finally {
        setTimeout(() => {
          setAlert({
            type: "",
            message: "",
            show: false,
          });
        }, 3000);
      }
    } 
  };

  return (
    <>
      <hr className="text-primary pt-4 mx-5" />
      <section
        id="contact"
        className="contact-section px-3 py-2 px-md-5 py-md-5 mb-3"
      >
        <div className="row px-2 px-md-5 align-items-center ">
          <div className="col-12 col-md-7 mb-4 mb-md-0">
            <div className="contact-info px-2 px-md-4">
              <h2>Contact Us</h2>
              <p>
                Feel free to reach out to us at any time. We are always here to
                help you with any questions or concerns you may have.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="text-primary fw-bold">
                    <IoLocationSharp className="text-secondary me-2 h5" />
                    location
                  </span>
                  <p>{OrganizationData?.address}</p>
                </div>
                <div className="contact-item">
                  <span className="text-primary fw-bold">
                    <IoIosMailOpen className="text-secondary me-2 h5" />
                    Email
                  </span>
                  <p>
                    <a
                      href="mailto:innovationcybercafe@gmail.com"
                      className="text-primary"
                    >
                     {OrganizationData?.email}
                    </a>
                  </p>
                </div>
                <div className="contact-item">
                  <span className="text-primary fw-bold">
                    <FaPhoneVolume className="text-secondary me-2 h6" />
                    Phone
                  </span>
                  <p>{OrganizationData?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* contact */}
          <div className="col-12 col-md-4">
            <div className="contact-form">
              <h6>Send us a message</h6>
              <form noValidate onSubmit={handleSubmit}>
                <div className="form-group my-4">
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
                <div className="form-group my-4">
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>

                <div className="form-group my-4">
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.subject ? "is-invalid" : ""
                    }`}
                    name="subject"
                    placeholder="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.subject && (
                    <div className="invalid-feedback">{formErrors.subject}</div>
                  )}
                </div>
                <div className="form-group my-4">
                  <textarea
                    className={`form-control ${
                      formErrors.message ? "is-invalid" : ""
                    }`}
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {formErrors.message && (
                    <div className="invalid-feedback">{formErrors.message}</div>
                  )}
                </div>
                {alert.show && (
                  <Alert type={alert.type} className="mb-2">
                    {alert.message}
                  </Alert>
                )}
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded"
                  disabled={submitting}
                >
                  {submitting ? "Sending message..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
