"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminContext } from "@/data/users/Admincontextdata";
import { useCart } from "@/data/carts/Cartcontext";
import { useUserContext } from "@/data/users/usercontextdata";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import CartButton from "@/components/Offcanvas/CartButton";
import CategoryTabs from "@/components/Categories/Categoriestab";
import { useCategoriesContext } from "@/data/categories/Categoriescontext";
import { useProductContext } from "@/data/product/Productcontext";
import ProductCard from "@/components/Products/ProductCard";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import { RiShoppingBasketFill } from "react-icons/ri";
import Pagination from "@/components/Pagination/Pagination";

const ProductsPage = () => {
  const { openModal } = useAdminContext();
  const {
    products,
    loading,
    totalPages,
    totalProducts,
    fetchProductsByCategory,
    fetchProducts,
  } = useProductContext();
  const { productcategories: categories } = useCategoriesContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------------------------------
  // set items in the order table
  // ---------------------------------------
  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  // ---------------------------------------
  // Fetch products on page load
  // ---------------------------------------
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    }
  }, [searchParams]);

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
      setCurrentPage(1)
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

  return (
    <div>
      <PageTitle pathname="Products" />
      <div style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center pe-3 pb-3 flex-wrap">
          <div>
            <h4 className="my-3 me-2">{currentCategory} Products</h4>
          </div>
          <CartButton />
        </div>

        {/* Categories list */}
        <div className="mb-4">
          <CategoryTabs
            categories={filteredCategories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={products}
          />
        </div>

        {/* Services cards */}
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
          {!loading && products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-12 col-md-4">
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cart={cart}
                />
              </div>
            ))
          ) : (
            // Show "no services available" message if no services at all
            <div className="mt-3 mb-3 text-center">
              <RiShoppingBasketFill
                className="mt-2"
                style={{
                  fontSize: "6rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
              <p className="mt-3 mb-3">No Product available at the moment</p>
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

        {/* Order table */}
        <div className="mt-2">
          <h5>items Ordered</h5>
          <Datatable
            items={items}
            setItems={setItems}
            label={"Orders"}
            filteritemlabel={"reference"}
          >
            <OrderTableItems />
          </Datatable>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
