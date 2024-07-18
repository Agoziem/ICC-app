import React from "react";
import ImageUploader from "@/components/Imageuploader/ImageUploader";
import { useCategoriesContext } from "@/data/Categoriescontext";
import FileUploader from "@/components/Fileuploader/FileUploader";


// [
  // //     //     {
  //   "id": 3,
  //   "organization": {
  //     "id": 1,
  //     "name": "Innovations Cybercafe"
  //   },
  //   "preview": null,
  //   "img_url": null,
  //   "img_name": null,
  //   "product": null,
  //   "product_url": null,
  //   "product_name": null,
  //   "category": {
  //     "id": 1,
  //     "category": "Jamb",
  //     "description": null
  //   },
  //   "name": "AI Tutor for Exam Preparations",
  //   "description": "No description available",
  //   "price": "2500.00",
  //   "rating": 0,
  //   "product_token": "eddc95530ca84141bafb2a3bdd0d695d",
  //   "digital": true,
  //   "created_at": "2024-05-29T10:03:26.614597Z",
  //   "last_updated_date": "2024-07-16T04:50:08.986147Z",
  //   "free": false,
  //   "userIDs_that_bought_this_product": []
  // },
  //   ]
  
const ProductForm = ({
  product,
  setProduct,
  handleSubmit,
  addorupdate,
  categories,
}) => {
  const { productcategories } = useCategoriesContext();

  const handleCategoryChange = (e) => {
    const selectedCategory = productcategories.find(
      (category) => category.category === e.target.value
    );
    setProduct({ ...product, category: selectedCategory });
  };

  return (
    <div className="p-3">
      <h5 className="text-center mb-4">
        {addorupdate.mode === "add" ? "Add Product" : `Edit ${product.name}`}
      </h5>
      <hr />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-2">
          <label htmlFor="preview" className="form-label">
             Product Preview image
          </label>
          <ImageUploader
            imagekey={"preview"}
            imageurlkey={"img_url"}
            imagename={"img_name"}
            formData={product}
            setFormData={setProduct}
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
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            rows="4"
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
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
            value={product.category?.category}
            onChange={handleCategoryChange}
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

        {/* digital */}
        <div className="mb-3">
          <label htmlFor="digital" className="form-label me-2">
            Digital
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="digital"
            name="digital"
            checked={product.digital}
            onChange={(e) =>
              setProduct({ ...product, digital: e.target.checked })
            }
          />
        </div>

        {/* free */}
        <div className="mb-2">
          <label htmlFor="free" className="form-label me-2">
            Free
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="free"
            name="free"
            checked={product.free}
            onChange={(e) => setProduct({ ...product, free: e.target.checked })}
          />
        </div>

        {/* fileinput */}
        {product.digital && (
          <div className="mb-3">
            <FileUploader 
              filekey={"product"}
              fileurlkey={"product_url"}
              filename={"product_name"}
              formData={product}
              setFormData={setProduct}
            />
          </div>
        )}


        <button type="submit" className="btn btn-primary rounded px-5 mt-3">
          {addorupdate.mode === "add" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
