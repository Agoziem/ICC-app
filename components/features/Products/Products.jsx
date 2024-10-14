"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useCart } from "@/data/carts/Cartcontext";
import { useUserContext } from "@/data/payments/usercontextdata";
import Datatable from "@/components/custom/Datatable/Datatable";
import OrderTableItems from "@/components/features/orders/OrderTableItems";
import CartButton from "@/components/custom/Offcanvas/CartButton";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import ProductCard from "@/components/features/Products/ProductCard";
import { RiShoppingBasketFill } from "react-icons/ri";
import Pagination from "@/components/custom/Pagination/Pagination";
import { fetchCategories } from "@/data/categories/fetcher";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetchProducts, productsAPIendpoint } from "@/data/product/fetcher";

const Products = () => {
  const { openModal } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [allCategories, setAllCategories] = useState([]);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoryError,
    mutate: categoriesmutate,
  } = useSWR(`${productsAPIendpoint}/categories/`, fetchCategories);

  // ---------------------------------------
  // set items in the order table
  // ---------------------------------------
  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center pe-3 mb-3 flex-wrap">
        <div>
          <h4 className="me-2">{currentCategory} Products</h4>
          <p className="mb-0 text-primary">
            {products?.count} Product{products?.count > 1 ? "s" : ""}
          </p>
        </div>
        <CartButton />
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

      {/* Services cards */}
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
        {!loadingProducts && products?.results.length > 0 ? (
          products?.results.map((product) => (
            <div key={product.id} className="col-12 col-md-4">
              <ProductCard
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
                openModal={openModal}
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

      {/* Order table */}
      <div className="mt-2">
        <h5>items Ordered</h5>
        <Datatable
          items={items}
          setItems={setItems}
          label={"Orders"}
          filteritemlabel={"reference"}
        >
          <OrderTableItems currentItems={items} />
        </Datatable>
      </div>
    </div>
  );
};

export default Products;
