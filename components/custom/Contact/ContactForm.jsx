"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Alert from "@/components/custom/Alert/Alert";

const ContactForm = ({ setMessages, messages, OrganizationData }) => {
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
    if (!formData.message) errors.message = "Your message is required";
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
          setMessages([data, ...messages]);
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
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group my-4">
        <input
          type="text"
          className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
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
          className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
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
          className={`form-control ${formErrors.subject ? "is-invalid" : ""}`}
          name="subject"
          placeholder="Subject"
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
          className={`form-control ${formErrors.message ? "is-invalid" : ""}`}
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
  );
};

export default ContactForm;
