import React, { useEffect, useState } from "react";
import ImageUploader from "@/components/custom/Imageuploader/ImageUploader";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import Tiptap from "@/components/custom/Richtexteditor/Tiptap";

/**
 * @param {{ service: Service; setService: (value:Service) => void; handleSubmit: any; addorupdate: any; OrganizationData: any; tab: any; categories: any; }} param0
 */
const ServiceForm = ({
  service,
  setService,
  handleSubmit,
  addorupdate,
  tab,
  categories: servicecategories,
}) => {
  const { fetchServiceSubCategories } = useSubCategoriesContext();
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch subcategories when the service's category changes or on initial load if there's already a category
  useEffect(() => {
    const fetchInitialSubCategories = async () => {
      if (service.category) {
        setLoading(true);
        const data = await fetchServiceSubCategories(service.category.id);
        setSubCategories(data);
        setLoading(false);
      }
    };
    fetchInitialSubCategories();
  }, [service.category]);

  // Handle category change
  const handleCategoryChange = async (e) => {
    const selectedCategory = servicecategories?.find(
      (category) => category.category === e.target.value
    );
    setService({ ...service, category: selectedCategory, subcategory: null });
    setLoading(true);
    const data = await fetchServiceSubCategories(selectedCategory.id);
    setSubCategories(data);
    setLoading(false);
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = subcategories?.find(
      (subcategory) => subcategory.subcategory === e.target.value
    );
    setService({ ...service, subcategory: selectedSubCategory });
  };

  return (
    <div className="p-3">
      <h5 className="text-center mb-4">
        {addorupdate.mode === "add"
          ? `Add ${tab !== "application" ? "service" : "application"}`
          : `Edit ${tab !== "application" ? "service" : "application"}`}
      </h5>
      <hr />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* Preview */}
        <div className="mb-2">
          <ImageUploader
            imagekey={"preview"}
            imageurlkey={"img_url"}
            imagename={"img_name"}
            formData={service}
            setFormData={setService}
          />
        </div>

        {/* Name */}
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
            required
          />
        </div>

        {/* Description */}
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
            rows={4}
            required
          ></textarea>
        </div>

        {/* Price */}
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

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={service.category?.category || ""}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select category</option>
            {servicecategories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">
            Sub-Category
          </label>
          <select
            className="form-select"
            id="subcategory"
            name="subcategory"
            value={service.subcategory?.subcategory || ""}
            onChange={handleSubCategoryChange}
            // required
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Select subcategory</option>
                {subcategories?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.subcategory}>
                    {subcategory.subcategory}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Service Flow */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Service flow
          </label>
          <Tiptap
            item={service}
            setItem={setService}
            keylabel={"service_flow"}
          />
        </div>

        <button type="submit" className="btn btn-primary rounded px-5 mt-3">
          {addorupdate.mode === "add" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
