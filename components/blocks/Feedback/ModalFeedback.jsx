"use client";
import React, { useContext, useState } from "react";
import Modal from "@/components/custom/Modal/modal";
import FeedbackButton from "./FeedbackBtn";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import TestimonialForm from "../../features/configuration/home/TestimonialForm";
import { converttoformData } from "@/utils/formutils";

const Feedback = () => {
  const [showModal, setShowModal] = useState(false);
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
        closeModal();
      });
  };

  // -------------------------------------------------------------
  // Function to close the modal
  // -------------------------------------------------------------

  const closeModal = () => {
    setShowModal(false);
    setAddOrUpdate({
      type: "add",
      state: false,
    });
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
  };

  return (
    <div>
      <FeedbackButton setShowModal={setShowModal} />

      <Modal showmodal={showModal} toggleModal={() => setShowModal(!showModal)}>
        <div className="modal-body">
          {addorupdate.state ? (
            <TestimonialForm
              addorupdate={addorupdate}
              testimonialData={testimonial}
              onSubmit={handleFormSubmit}
              onClose={closeModal}
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default Feedback;
