import React from "react";
import ImageUploader from "@/components/Imageuploader/ImageUploader";

const ServiceForm = ({
  service,
  setService,
  handleSubmit,
  addorupdate,
  OrganizationData,
  tab,
  categories,
}) => (
  <div className="p-3">
    <h5 className="text-center mb-4">
      {addorupdate.mode === "add"
        ? `Add ${tab !== "application" ? "service" : "application"}`
        : `Edit ${tab !== "application" ? "service" : "application"}`}
    </h5>
    <hr />
    <form
      onSubmit={(e) => {
        handleSubmit(
          e,
          addorupdate.mode === "add"
            ? `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/add_service/${OrganizationData.id}/`
            : `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/update_service/${service.id}/`
        );
      }}
    >
      <div className="mb-2">
        <ImageUploader
          imagekey={"preview"}
          imageurlkey={"img_url"}
          imagename={"img_name"}
          formData={service}
          setFormData={setService}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={service.description}
          onChange={(e) =>
            setService({ ...service, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          name="category"
          value={service.category}
          onChange={(e) => setService({ ...service, category: e.target.value })}
          required
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary rounded px-5 mt-3">
        {addorupdate.mode === "add" ? "Add" : "Update"}
      </button>
    </form>
  </div>
);

export default ServiceForm;
