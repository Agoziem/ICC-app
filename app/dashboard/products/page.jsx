"use client";
import React, { useEffect, useState } from "react";
import { PiEmptyBold } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import CartButton from "@/components/Offcanvas/CartButton";
import CategoryTabs from "@/components/Categories/Categoriestab";
import { useCategoriesContext } from "@/data/Categoriescontext";
import { useProductContext } from "@/data/Productcontext";
import ProductCard from "@/components/Products/ProductCard";

const ProductsPage = () => {
  const { openModal } = useAdminContext();
  const { products } = useProductContext();
  const { productcategories: categories } = useCategoriesContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    } else if (categories?.length > 0) {
      const firstCategoryWithServices = categories?.find((cat) =>
        products.some((service) => service.category.id === cat.id)
      );
      setCurrentCategory(
        firstCategoryWithServices?.category || categories[0].category
      );
    }
  }, [categories, products, searchParams]);
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
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={products}
          />
        </div>

        {/* Services cards */}
        <div className="row">
          {products && products.length > 0 ? (
            // Filter products by the current category
            products.filter(
              (product) => currentCategory === product.category.category
            ).length > 0 ? (
              products
                .filter(
                  (product) => currentCategory === product.category.category
                )
                .map((product) => (
                  <div key={product.id} className="col-12 col-md-4">
                    <ProductCard
                      product={product}
                      openModal={openModal}
                      cart={cart}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  </div>
                ))
            ) : (
              // Show "no services available" message if no services in the category
              <div className="mt-3 mb-3 text-center">
                <PiEmptyBold
                  className="mt-2"
                  style={{
                    fontSize: "6rem",
                    color: "var(--bgDarkerColor)",
                  }}
                />
                <p className="mt-3 mb-3">
                  no services available for the {currentCategory} category
                </p>
              </div>
            )
          ) : (
            // Show "no services available" message if no services at all
            <div className="mt-3 mb-3 text-center">
              <PiEmptyBold
                className="mt-2"
                style={{
                  fontSize: "6rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
              <p className="mt-3 mb-3">no services available at the moment</p>
            </div>
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
