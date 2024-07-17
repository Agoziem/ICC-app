"use client";
import React, { useContext, useEffect, useState } from "react";
import { useAdminContext } from "@/data/Admincontextdata";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import CategoryTabs from "@/components/Categories/Categoriestab";
import CategoriesForm from "@/components/Categories/Categories";
import { useProductContext } from "@/data/Productcontext";
import { useCategoriesContext } from "@/data/Categoriescontext";

const Products = () => {
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
  const { openModal } = useAdminContext();
  const { products, createProduct, updateProduct, deleteProduct, loading } = useProductContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { productcategories: categories, setProductCategories: setCategories } =
    useCategoriesContext();
  const initialProductState = {
    id: null,
    organization: OrganizationData.id,
    preview: null,
    img_url: null,
    img_name: null,
    category: null,
    product: null,
    product_url: null,
    product_name: null,
    name: "",
    description: "",
    price: "",
    rating: 0,
    product_token: "",
    digital: true,
    free: false,
    userIDs_that_bought_this_product: [],
  };
  const [product, setProduct] = useState(initialProductState);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [addorupdate, setAddorupdate] = useState({ mode: "add", state: false });
  const [currentCategory, setCurrentCategory] = useState('');


  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setProduct(initialProductState);
    setAddorupdate({ mode: "", state: false });
  };

  const handleAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  //----------------------------------------------------
  // Create a new product or update an existing product
  //----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addorupdate.mode === "add") {
      const result = await createProduct(product);
      if (result.type && result.type === "success") {
        handleAlert(result.message, result.type);
        closeModal();
      } else {
        handleAlert(result.message, result.type);
        closeModal();
      }
    } else {
      const result = await updateProduct(product.id, product);
      if (result.type && result.type === "success") {
        handleAlert(result.message, result.type);
        closeModal();
      } else {
        handleAlert(result.message, result.type);
        closeModal();
      }
    }
  };

  //----------------------------------------------------
  // Delete a product
  //----------------------------------------------------
  const handleDelete = async (id) => {
    await deleteProduct(id);
    if (result.type && result.type === "success") {
      handleAlert(result.message, result.type);
      closeModal();
    } else {
      handleAlert(result.message, result.type);
      closeModal();
    }
  };

  //   ------------------------------------------------------
  //   // Create a new service
  //   // ------------------------------------------------------
  const handleEdit = (product) => {
    setProduct(product);
    setAddorupdate({ mode: "update", state: true });
    setShowModal(true);
  };

  //   ------------------------------------------------------
  //   // Delete a service
  //   // ------------------------------------------------------
  const handleDeleteConfirm = (product) => {
    setProduct(product);
    setShowModal2(true);
  };

  return (
    <div>
      <hr />
      <div style={{ maxWidth: "650px" }}>
        <CategoriesForm
          items={categories}
          setItems={setCategories}
          itemName="category"
          itemLabel="Category"
          addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/add_category/`}
          updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/update_category`}
          deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/delete_category`}
        />
      </div>

      <div className="d-flex flex-wrap align-items-center mb-4">
        <CategoryTabs
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          services={products}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-between pe-3 pb-3 mb-3">
        <button
          className="btn btn-primary border-0 rounded mb-2 mt-4 mt-md-0 mb-md-0"
          style={{ backgroundColor: "var(--bgDarkerColor)" }}
          onClick={() => {
            setAddorupdate({ mode: "add", state: true });
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add Product
        </button>
      </div>

      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="row">
        {products.length > 0 &&
          products
            .filter((product) => currentCategory === product.category.category)
            .map((product) => (
              <ProductCard
                openModal={openModal}
                key={product.id}
                tab={currentCategory}
                item={product}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            ))}
      </div>

      <Modal showmodal={showModal} toggleModal={closeModal}>
        <ProductForm
          product={product}
          setProduct={setProduct}
          handleSubmit={handleSubmit}
          addorupdate={addorupdate}
          categories={categories}
        />
      </Modal>

      <Modal showmodal={showModal2} toggleModal={closeModal}>
        <div className="p-3">
          <p className="text-center">Delete Product</p>
          <hr />
          <h5 className="text-center mb-4">{product.name}</h5>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger border-0 rounded me-2"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-accent-secondary border-0 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
