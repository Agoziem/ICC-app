"use client";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import Modal from "@/components/custom/Modal/modal";
import Alert from "@/components/custom/Alert/Alert";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import CategoriesForm from "@/components/features/Categories/Categories";
import Pagination from "@/components/custom/Pagination/Pagination";
import { RiShoppingBasketFill } from "react-icons/ri";
import SubCategoriesForm from "@/components/features/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import { fetchCategories } from "@/data/categories/fetcher";
import useSWR from "swr";
import { defaultProduct } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  productsAPIendpoint,
  updateProduct,
} from "@/data/product/fetcher";
import SearchInput from "@/components/custom/Inputs/SearchInput";
import { PulseLoader } from "react-spinners";

// /...
const Products = () => {
  const { openModal } = useAdminContext();
  const { fetchProductsSubCategories } = useSubCategoriesContext();
  const [product, setProduct] = useState(defaultProduct);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [addorupdate, setAddorupdate] = useState({ mode: "add", state: false });

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [allCategories, setAllCategories] = useState([]);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isPending, startTransition] = useTransition();
  const [isdeleting, startDeletion] = useTransition();

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoryError,
    mutate: categoriesmutate,
  } = useSWR(`${productsAPIendpoint}/categories/`, fetchCategories);

  // ----------------------------------------------------
  // Add a new category to the list of categories
  // ----------------------------------------------------
  useEffect(() => {
    if (!categories) return;
    if (categories.length > 0)
      setAllCategories([
        { id: 0, category: "All", description: "All Categories" },
        ...categories,
      ]);
  }, [categories]);

  // ----------------------------------------
  // Fetch Products based on category
  // ----------------------------------------
  const {
    data: products,
    isLoading: loadingProducts,
    error: error,
    mutate,
  } = useSWR(
    `${productsAPIendpoint}/products/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`,
    fetchProducts
  );

  // -----------------------------------------
  // Handle page change
  // -----------------------------------------
  /**  @param {string} newPage */
  const handlePageChange = (newPage) => {
    router.push(
      `?category=${currentCategory}&page=${newPage}&page_size=${pageSize}`,
      {
        scroll: false,
      }
    );
  };

  // -------------------------------
  // Handle category change
  // -------------------------------
  /**  @param {string} category */
  const handleCategoryChange = (category) => {
    router.push(`?category=${category}&page=${page}&page_size=${pageSize}`, {
      scroll: false,
    });
  };

  // Memoized filtered Products based on search query
  const filteredProducts = useMemo(() => {
    if (!products?.results) return [];
    if (!searchQuery) return products.results;

    return products.results.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // ----------------------------------------------------
  // close modal
  // ----------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setProduct(defaultProduct);
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
    startTransition(async () => {
      const { organization, category, subcategory, ...restData } = product;
      const producttosubmit = {
        ...restData,
        organization: Organizationid,
        category: category || "",
        subcategory: subcategory
          ? {
              ...subcategory,
              category: category.id,
            }
          : "",
      };
      try {
        if (addorupdate.mode !== "add") {
          const updatedProduct = await updateProduct(producttosubmit);
          await mutate(
            (Products) => {
              /** * @type {Products} */
              const otherProducts = (Products?.results || []).map((o) =>
                o.id === updatedProduct.id ? updatedProduct : o
              );
              return {
                ...Products,
                results: otherProducts.sort(
                  (a, b) =>
                    new Date(b.last_updated_date).getTime() -
                    new Date(a.last_updated_date).getTime()
                ),
              };
            },
            {
              populateCache: true,
            }
          );
        } else {
          const newProduct = await createProduct(producttosubmit);
          await mutate(
            (Products) => {
              /** * @type {Products} */
              const newProducts = [newProduct, ...(Products?.results || [])];
              return {
                ...Products,
                results: newProducts.sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                ),
              };
            },
            {
              populateCache: true,
            }
          );
        }
        handleAlert(
          `your Service have been ${
            addorupdate.mode === "add" ? "added" : "updated"
          } successfully `,
          "success"
        );
      } catch (error) {
        handleAlert("An error have occurred, please try again", "danger");
      } finally {
        closeModal();
      }
    });
  };

  //----------------------------------------------------
  // Delete a product
  //----------------------------------------------------
  /**
   * @async
   * @param {number} id
   */
  const handleDelete = async (id) => {
    startDeletion(async () => {
      try {
        const productid = await deleteProduct(id);
        await mutate(
          (Products) => {
            const otherProducts = Products.results.filter(
              (product) => product.id !== productid
            );
            Products.results = otherProducts;
            return { ...Products };
          },
          {
            populateCache: true,
          }
        );
        handleAlert("Service deleted Successfully", "success");
      } catch (error) {
        console.log(error.message);
        handleAlert("Error deleting Service", "danger");
      } finally {
        closeModal();
      }
    });
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
            mutate={categoriesmutate}
            addUrl={`${productsAPIendpoint}/add_category/`}
            updateUrl={`${productsAPIendpoint}/update_category`}
            deleteUrl={`${productsAPIendpoint}/delete_category`}
          />
        </div>

        <div className="col-12 col-md-5">
          <SubCategoriesForm
            categories={categories}
            apiendpoint={productsAPIendpoint}
            addUrl={`${productsAPIendpoint}/create_subcategory/`}
            updateUrl={`${productsAPIendpoint}/update_subcategory`}
            deleteUrl={`${productsAPIendpoint}/delete_subcategory`}
          />
        </div>
      </div>

      {/* categories */}
      <div className="mb-3 ps-2 ps-md-0">
        {/* Categories */}
        <h5 className="mb-3 fw-bold">categories</h5>
        {loadingCategories && !categoryError ? (
          <div className="d-flex gap-2 align-items-center">
            {/* spinner */}
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            fetching Products Categories
          </div>
        ) : (
          <CategoryTabs
            categories={allCategories}
            currentCategory={currentCategory}
            setCurrentCategory={handleCategoryChange}
          />
        )}
      </div>

      <div className="d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center gap-3 pe-3 pb-3 mb-3">
        <button
          className="btn btn-primary border-0 rounded mb-2 mt-4 mt-md-0 mb-md-0"
          style={{ backgroundColor: "var(--bgDarkerColor)" }}
          onClick={() => {
            setAddorupdate({ mode: "add", state: true });
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add{" "}
          {currentCategory} Product
        </button>
        <div>
          <h5 className="mb-1">{currentCategory} Products</h5>
          <p className="mb-0 text-primary">
            {products?.count} Product{products?.count > 1 ? "s" : ""} in Total
          </p>
        </div>
        <div className="ms-0 ms-md-auto mb-4 mb-md-0">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            itemlabel="product"
          />
        </div>
      </div>

      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {searchQuery && <h5>Search Results</h5>}
      <div className="row">
        {
          // loading
          loadingProducts && !error && (
            <div className="d-flex justify-content-center">
              {/* spinner */}
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        }
        {!loadingProducts && filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => (
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

        {!loadingProducts &&
          products &&
          Math.ceil(products.count / parseInt(pageSize)) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(products.count / parseInt(pageSize))}
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
          isSubmitting={isPending}
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
              disabled={isdeleting}
            >
              {isdeleting ? (
                <div className="d-inline-flex align-items-center justify-content-center gap-2">
                  <div>deleting Service</div>
                  <PulseLoader size={8} color={"#ffffff"} loading={true} />
                </div>
              ) : (
                "Delete"
              )}
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
