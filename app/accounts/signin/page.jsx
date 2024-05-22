"use client";
import FormWrapper from "@/components/auth/FormWrapper";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loggingIn, setLoggingIn] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoggingIn(true);
    const result = await signIn('credentials', {
      redirect: false, 
      email,
      password,
    });
    if (result.error) {
      console.log(result.error)
    } else {
      console.log(result)
      router.push('/dashboard')
    }
    setLoggingIn(false);
    setFormData({ email: "", password: "" });
  }

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <FormWrapper
          headerLabel="Sign In"
          backButtonlabel="Don't have an account? Sign up"
          backButtonHref="/accounts/signup"
        >
          <p>
            Welcome back! Sign in to your account to access all your features.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group my-4">
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 my-3"
              disabled={loggingIn}
            >
              {
                loggingIn ? "Logging in..." : "Sign In"
              }
            </button>
          </form>
        </FormWrapper>
      </div>
    </section>
  );
};

export default SigninPage;
