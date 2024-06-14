import StarRating from "@/components/StarRating/StarRating";
import React, { useState } from "react";
import Modal from "@/components/Modal/modal";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import Alert from "@/components/Alert/Alert";
import ImageUploader from "@/components/Imageuploader/ImageUploader";
import { converttoformData } from "@/utils/formutils";

const Testimonials = ({ testimonials, setTestimonials, OrganizationData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showdeleteModal, setShowDeleteModal] = useState(false);
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
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [addorupdate, setAddOrUpdate] = useState({
    type: "add",
    state: false,
  });

  const handleSubmit = (e, url) => {
    e.preventDefault();
    fetch(url, {
      method: addorupdate.type === "add" ? "POST" : "PUT",
      body: converttoformData(testimonial),
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

  const deleteTestimonial = (id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/testimonial/delete/${id}/`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setTestimonials(
          testimonials.filter((testimonial) => testimonial.id !== id)
        );
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
      })
      .catch((error) => {
        console.error("Error deleting testimonial data:", error);
      })
      .finally(() => {
        setTestimonial({
          id: "",
          name: "",
          content: "",
          role: "",
          rating: 0,
          img: null,
        });
        setShowDeleteModal(false);
      });
  };
  return (
    <div className="px-1 px-md-4">
      <div className="mb-5 mb-md-0">
        <button
          className="btn btn-primary border-0 rounded float-end"
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
        <h4>Testimonials</h4>
      </div>

      {/* set of horizontal Cards that are clickable */}
      <div className="mt-4">
        {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
        {testimonials.length === 0 ? (
          <p>No testimonials available</p>
        ) : (
          testimonials.map((testimonial) => (
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
                        setTestimonial({
                          id: testimonial.id,
                          name: testimonial.name,
                          content: testimonial.content,
                          role: testimonial.role,
                          rating: testimonial.rating,
                          img: testimonial.img || null,
                          img_url: testimonial.img_url,
                          img_name: testimonial.img_name,
                        });
                        setShowModal(true);
                      }}
                    >
                      edit review
                    </button>

                    <button
                      className="btn btn-sm btn-danger rounded px-3"
                      onClick={() => {
                        setTestimonial({
                          ...testimonial,
                          id: testimonial.id,
                        });
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
            <div className="mt-4">
              <h4>{addorupdate.type} Testimonial</h4>
              <hr />
              <form
                onSubmit={(e) => {
                  if (addorupdate.type === "add") {
                    handleSubmit(
                      e,
                      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/testimonial/add/${OrganizationData.id}/`
                    );
                  } else {
                    handleSubmit(
                      e,
                      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/testimonial/update/${testimonial.id}/`
                    );
                  }
                }}
              >
                <div className="form-group mb-3">
                  <ImageUploader
                    imagekey={"img"}
                    imageurlkey={"img_url"}
                    imagename={"img_name"}
                    formData={testimonial}
                    setFormData={setTestimonial}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={testimonial.name}
                    onChange={(e) =>
                      setTestimonial({ ...testimonial, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    placeholder="student or Aspirant etc"
                    value={testimonial.role}
                    onChange={(e) =>
                      setTestimonial({ ...testimonial, role: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="content">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    placeholder="Content"
                    value={testimonial.content}
                    onChange={(e) =>
                      setTestimonial({
                        ...testimonial,
                        content: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    placeholder="Rate from 1 to 5"
                    max={5}
                    min={1}
                    value={testimonial.rating}
                    onChange={(e) =>
                      setTestimonial({ ...testimonial, rating: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-accent-secondary border-0 text-secondary mt-3 rounded"
                >
                  {addorupdate.type === "add"
                    ? "Add Testimonial"
                    : "Update Testimonial"}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </Modal>
      <Modal
        showmodal={showdeleteModal}
        toggleModal={() => setShowDeleteModal(false)}
      >
        <div className="modal-body">
          <div className="mt-4">
            <h4>Delete Testimonial</h4>
            <p>Are you sure you want to delete this testimonial?</p>
            <button
              className="btn btn-accent-secondary border-0 text-secondary mt-3 rounded"
              onClick={() => {
                deleteTestimonial(testimonial.id);
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
