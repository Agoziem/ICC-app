"use client";
import TestimonialForm from "@/components/features/configuration/home/TestimonialForm";
import React, { useContext, useState } from "react";
import { converttoformData } from "@/utils/formutils";
import Alert from "@/components/custom/Alert/Alert";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";

const FeedbackPage = () => {
  const { OrganizationData, testimonials, setTestimonials } =
    useContext(OrganizationContext);
  const [testimonial, setTestimonial] = useState({
    id: "",
    name: "",
    content: "",
    role: "",
    rating: 0,
    img: null,
    img_url: "",
    img_name: "",
  });
  const [addorupdate, setAddOrUpdate] = useState({
    type: "add",
    state: true,
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleFormSubmit = (formData) => {
    const url =
      addorupdate.type === "add"
        ? `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/testimonial/add/${OrganizationData.id}/`
        : `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/testimonial/update/${formData.id}/`;

    fetch(url, {
      method: addorupdate.type === "add" ? "POST" : "PUT",
      body: converttoformData(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (addorupdate.type === "add") {
          setTestimonials([data, ...testimonials]);
        } else {
          setTestimonials(
            testimonials.map((testimonial) =>
              testimonial.id === data.id ? data : testimonial
            )
          );
        }
        setAlert({
          show: true,
          message: `Testimonial ${addorupdate.type}ed successfully`,
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            type: "",
          });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding testimonial data:", error);
      })
      .finally(() => {
        resetForm();
      });
  };

  const resetForm = () => {
    setTestimonial({
      id: "",
      name: "",
      content: "",
      role: "",
      rating: 0,
      img: null,
      img_url: "",
      img_name: "",
    });
    setAddOrUpdate({
      type: "add",
      state: true,
    });
  };

  return (
    <div className="container">
      <div
        className="card p-3 mx-auto my-5 px-3 px-md-5 py-3 pb-5"
        style={{
          maxWidth: "600px",
        }}
      >
        {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
        <TestimonialForm
          addorupdate={addorupdate}
          testimonialData={testimonial}
          onSubmit={handleFormSubmit}
          onClose={resetForm}
        />
      </div>
    </div>
  );
};

export default FeedbackPage;
