import React, { useState, useEffect } from "react";
import ImageUploader from "@/components/custom/Imageuploader/ImageUploader";

const TestimonialForm = ({ addorupdate, testimonialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    content: "",
    role: "",
    rating: 0,
    img: null,
    img_url: "",
    img_name: "",
  });

  useEffect(() => {
    if (testimonialData) {
      setFormData(testimonialData);
    }
  }, [testimonialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mt-4">
      <h4>{addorupdate.type} Feedback</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <ImageUploader
            imagekey={"img"}
            imageurlkey={"img_url"}
            imagename={"img_name"}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            placeholder="student or Aspirant etc"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            placeholder="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            placeholder="Rate from 1 to 5"
            name="rating"
            max={5}
            min={1}
            value={formData.rating}
            onChange={handleChange}
            required
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
  );
};

export default TestimonialForm;
