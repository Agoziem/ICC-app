"use client";
import React, { useContext, useEffect, useState } from "react";
import { useAdminContext } from "@/data/users/Admincontextdata";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import Modal from "@/components/custom/Modal/modal";
import Alert from "@/components/custom/Alert/Alert";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import CategoriesForm from "@/components/features/Categories/Categories";
import { useProductContext } from "@/data/product/Productcontext";
import { useCategoriesContext } from "@/data/categories/Categoriescontext";
import Pagination from "@/components/custom/Pagination/Pagination";
import { RiShoppingBasketFill } from "react-icons/ri";
import SubCategoriesForm from "@/components/features/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";

const Products = () => {
  const { openModal } = useAdminContext();
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    totalPages,
    totalProducts,
    fetchProducts,
    fetchProductsByCategory,
  } = useProductContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { productcategories: categories, setProductCategories: setCategories } =
    useCategoriesContext();
  const { fetchProductsSubCategories } = useSubCategoriesContext();
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
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // ----------------------------------------------------
  // Add a new category to the list of categories
  // ----------------------------------------------------
  useEffect(() => {
    if (categories.length > 0)
      setFilteredCategories([
        { id: 0, category: "All", description: "All Categories" },
        ...categories,
      ]);
  }, [categories]);

  // ----------------------------------------------------
  // Fetch Services on Page Change
  // ----------------------------------------------------
  useEffect(() => {
    if (OrganizationData.id) {
      setCurrentPage(1);
      if (currentCategory === "All") {
        fetchProducts(OrganizationData.id, 1);
      } else {
        fetchProductsByCategory(currentCategory, 1);
      }
    }
  }, [OrganizationData.id, currentCategory]);

  // ----------------------------------------------------
  // handle page change
  // ----------------------------------------------------
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (currentCategory === "All") {
      fetchProducts(OrganizationData.id, page);
    } else {
      fetchProductsByCategory(currentCategory, page);
    }
  };

  // ----------------------------------------------------
  // close modal
  // ----------------------------------------------------
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
      <div className="row">
        <div className="col-12 col-md-7">
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

        <div className="col-12 col-md-5">
          <SubCategoriesForm
            categories={categories}
            fetchSubCategories={fetchProductsSubCategories}
            addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/create_subcategory/`}
            updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/update_subcategory`}
            deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/delete_subcategory`}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center mb-4">
        <CategoryTabs
          categories={filteredCategories}
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
        {
          // loading
          loading && (
            <div className="d-flex justify-content-center">
              {/* spinner */}
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        }
        {!loading && products?.length > 0 ? (
          products.map((product) => (
            <ProductCard
              openModal={openModal}
              key={product.id}
              tab={currentCategory}
              item={product}
              onEdit={handleEdit}
              onDelete={handleDeleteConfirm}
            />
          ))
        ) : (
          <div className="mt-3 mb-3 text-center">
            <RiShoppingBasketFill
              className="mt-2"
              style={{
                fontSize: "6rem",
                color: "var(--bgDarkerColor)",
              }}
            />
            <p className="mt-3 mb-3">no Products available</p>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>

      <Modal
        showmodal={showModal}
        toggleModal={closeModal}
        overlayclose={false}
      >
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
