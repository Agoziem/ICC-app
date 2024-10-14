import StarRating from "@/components/custom/StarRating/StarRating";
import React, { useState } from "react";
import Modal from "@/components/custom/Modal/modal";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import Alert from "@/components/custom/Alert/Alert";
import TestimonialForm from "./TestimonialForm";
import { converttoformData } from "@/utils/formutils";
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  MainAPIendpoint,
  updateTestimonial,
} from "@/data/organization/fetcher";
import { testimonialDefault } from "@/constants";
import useSWR from "swr";

const Testimonials = () => {
  const OrganizationID = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonial, setTestimonial] = useState(testimonialDefault);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [addorupdate, setAddOrUpdate] = useState({
    type: "add",
    state: false,
  });

  // for fetching
  const { data: testimonials } = useSWR(
    `${MainAPIendpoint}/testimonial/${OrganizationID}/`,
    fetchTestimonials
  );

  // for mutation
  const { mutate } = useSWR(
    `${MainAPIendpoint}/testimonial/${OrganizationID}/`
  );
  // -------------------------------------------------------------
  // Function to handle form submission
  // -------------------------------------------------------------

  const handleFormSubmit = async (formData) => {
    // convert image to formData
    try {
      if (addorupdate.type === "add") {
        await mutate(createTestimonial(formData), {
          populateCache: true,
        });
      } else {
        await mutate(updateTestimonial(formData), {
          populateCache: true,
        });
      }
      setAlert({
        show: true,
        message: `Testimonial ${addorupdate.type}ed successfully`,
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      setAlert({
        show: true,
        message: "an error just occured",
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
    }
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
    setTestimonial(testimonialDefault);
  };

  // -------------------------------------------------------------
  // Function to delete a testimonial
  // -------------------------------------------------------------
  /**
   * @async
   * @param {number} id
   */
  const deletetestimonial = async (id) => {
    try {
      await mutate(deleteTestimonial(id), {
        populateCache: true,
      });
      setAlert({
        show: true,
        message: "Testimonial deleted successfully",
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error deleting testimonial data:", error);
    } finally {
      setTestimonial(testimonialDefault);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="px-1 px-md-4">
      <div className="mb-5 mb-md-0">
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-primary border-0 rounded"
            style={{ backgroundColor: "var(--bgDarkerColor)" }}
            onClick={() => {
              setAddOrUpdate({
                type: "add",
                state: true,
              });
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add Testimonial
          </button>
        </div>
        <h4>Testimonials</h4>
      </div>

      {/* set of horizontal Cards that are clickable */}
      <div className="mt-4">
        {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
        {testimonials?.results.length === 0 ? (
          <p>No testimonials available</p>
        ) : (
          testimonials?.results.map((testimonial) => (
            <div key={testimonial.id} className="card my-3 p-3">
              <div className="card-body">
                <div>
                  <BiSolidQuoteAltRight
                    className="float-end text-primary"
                    style={{ fontSize: "35px" }}
                  />
                </div>
                <p className="card-text">{testimonial.content}</p>
                <div className="d-flex align-items-center">
                  {testimonial.img_url ? (
                    <img
                      src={testimonial.img_url}
                      alt="testimonial"
                      className="rounded-circle object-fit-cover"
                      height={75}
                      width={75}
                      style={{ objectPosition: "top center" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: 75,
                        height: 75,
                        fontSize: "30px",
                        backgroundColor: "var(--bgDarkerColor)",
                      }}
                    >
                      {testimonial.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="ms-3">
                    <h6 className="mb-1">{testimonial.name}</h6>
                    <p className="my-0 small">{testimonial.role}</p>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                  <div className="text-primary small">
                    {new Date(testimonial.created_at).toDateString()}
                  </div>
                  <div className="mt-3 mt-md-0">
                    <button
                      className="btn btn-accent-secondary rounded small mx-0 me-2 mx-md-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAddOrUpdate({
                          type: "update",
                          state: true,
                        });
                        setTestimonial(testimonial);
                        setShowModal(true);
                      }}
                    >
                      edit review
                    </button>

                    <button
                      className="btn btn-sm btn-danger rounded px-3"
                      onClick={() => {
                        setTestimonial(testimonial);
                        setShowDeleteModal(true);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for adding a new testimonial */}
      <Modal showmodal={showModal} toggleModal={() => closeModal()}>
        <div className="modal-body">
          {addorupdate.state ? (
            <TestimonialForm
              addorupdate={addorupdate}
              testimonial={testimonial}
              setTestimonial={setTestimonial}
              onSubmit={handleFormSubmit}
              onClose={closeModal}
            />
          ) : null}
        </div>
      </Modal>
      <Modal
        showmodal={showDeleteModal}
        toggleModal={() => setShowDeleteModal(false)}
      >
        <div className="modal-body">
          <div className="mt-4">
            <h4>Delete Testimonial</h4>
            <p>Are you sure you want to delete this testimonial?</p>
            <button
              className="btn btn-accent-secondary border-0 text-secondary mt-3 rounded"
              onClick={() => {
                deletetestimonial(testimonial.id);
              }}
            >
              Delete Testimonial
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Testimonials;
