"use client";
import React, { useContext, useEffect, useState } from "react";
import FormWrapper from "@/components/auth/FormWrapper";
import Image from "next/image";
import Link from "next/link";
import styles from "../accounts.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Alert from "@/components/Alert/Alert";

const SignupPage = () => {
  const router = useRouter();
  const { OrganizationData } = useContext(OrganizationContext);
  const [formData, setFormData] = useState({
    organization_id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      organization_id: OrganizationData.id,
    }));
  }, [OrganizationData]);

  // ----------------------------------------
  // Handle form input changes
  // ----------------------------------------
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  // ----------------------------------------
  // Form validation
  // ----------------------------------------

  const validate = () => {
    const errors = {};
    if (!formData.firstname) errors.firstname = "firstname is required";
    if (!formData.lastname) errors.lastname = "lastname is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) errors.password = "your password is required";
    if (!formData.confirmPassword) {
      errors.confirmPassword = "password confirmation is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "passwords do not match";
    }
    return errors;
  };

  // ----------------------------------------
  // Handle form submission
  // ----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/register/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/dashboard");
        } else {
          const message =
            response.status === 400
              ? "a user with that email already exists"
              : "An error occurred, please try again";
          setAlert(
            {
              show: true,
              message: message,
              type: "danger",
            },
            setTimeout(() => {
              setAlert((prev) => ({ ...prev, show: false }));
            }, 3000)
          );
        }
      } catch (error) {
        console.error("error:", error);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`${styles.siguppage} d-flex justify-content-center align-items-center h-100 px-3 py-5`}
    >
      <div
        className="row justify-content-between"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "var(--bgColor)",
        }}
      >
        {/* The Image */}
        <div className="col-12 col-md-5 p-0 d-none d-md-block">
          <div
            className="p-0"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/sign up.png"
              alt="Authentication"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "15px 0 0 15px",
              }}
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* The Form */}
        <div className="col-12 col-md-7 p-3 py-5 px-md-5">
          <div className="px-3 px-md-5">
            <FormWrapper
              headerLabel="Create your Account."
              backButtonlabel="Already have an account?"
              backButtonHrefText="Sign in"
              backButtonHref="/accounts/signin"
            >
              <form noValidate onSubmit={handleSubmit}>
                <div className="form-group d-md-flex my-4">
                  {/* firstname */}
                  <div className=" mb-4 mb-md-0 me-md-2">
                    <input
                      type="text"
                      name="firstname"
                      className={`form-control  ${
                        formErrors.firstname ? "is-invalid" : ""
                      }`}
                      placeholder="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.firstname && (
                      <div className="text-danger invalid-feedback">
                        {formErrors.firstname}
                      </div>
                    )}
                  </div>

                  {/* lastname */}
                  <div>
                    <input
                      type="text"
                      name="lastname"
                      className={`form-control ${
                        formErrors.lastname ? "is-invalid" : ""
                      }`}
                      placeholder="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.lastname && (
                      <div className="text-danger invalid-feedback">
                        {formErrors.lastname}
                      </div>
                    )}
                  </div>
                </div>

                {/* email */}
                <div className="form-group my-4">
                  <input
                    name="email"
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <div className="text-danger invalid-feedback">
                      {formErrors.email}
                    </div>
                  )}
                </div>

                {/* password */}
                <div className="form-group my-4">
                  <input
                    name="password"
                    type="password"
                    className={`form-control ${
                      formErrors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.password && (
                    <div className="text-danger invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>

                {/* confirmPassword */}
                <div className="form-group my-4">
                  <input
                    name="confirmPassword"
                    type="password"
                    className={`form-control ${
                      formErrors.confirmPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.confirmPassword && (
                    <div className="text-danger invalid-feedback">
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>

                {alert.show && (
                  <div className="my-3">
                    <Alert type={alert.type}>{alert.message}</Alert>
                  </div>
                )}

                {/* submit button */}
                <div className="form-group my-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >
                    {submitting ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="text-end">
                <Link href="/" className="text-secondary me-2">
                  Home
                </Link>
              </div>
            </FormWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
