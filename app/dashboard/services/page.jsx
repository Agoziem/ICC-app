"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { useServiceContext } from "@/data/Servicescontext";
import { useCategoriesContext } from "@/data/Categoriescontext";
import ServiceCard from "@/components/Services/ServiceCard";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { BsPersonFillGear } from "react-icons/bs";
import Pagination from "@/components/Pagination/Pagination";

const ServicesPage = () => {
  const { openModal } = useAdminContext();
  const {
    services,
    loading,
    totalPages,
    totalServices,
    fetchServicesByCategory,
    fetchServices,
  } = useServiceContext();
  const { servicecategories: categories } = useCategoriesContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // ------------------------------------------------------
  // set the items in the order table
  // ------------------------------------------------------
  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  // ------------------------------------------------------
  // set category from the url
  // ------------------------------------------------------
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    }
  }, [searchParams]);

  // ------------------------------------------------------
  // Filter categories
  // ------------------------------------------------------
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
        fetchServices(OrganizationData.id, 1);
      } else {
        fetchServicesByCategory(currentCategory, 1);
      }
    }
  }, [OrganizationData.id, currentCategory]);

  // ----------------------------------------------------
  // handle page change
  // ----------------------------------------------------
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (currentCategory === "All") {
      fetchServices(OrganizationData.id, page);
    } else {
      fetchServicesByCategory(currentCategory, page);
    }
  };

  return (
    <div>
      <PageTitle pathname="Services" />
      <div style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center pe-3 pb-3 flex-wrap">
          <div>
            <h4 className="my-3 me-2">{currentCategory} Services</h4>
          </div>
          <CartButton />
        </div>

        {/* Categories list */}
        <div className="mb-4">
          <CategoryTabs
            categories={filteredCategories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={services}
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
          {!loading && services && services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="col-12 col-md-4">
                <ServiceCard
                  service={service}
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
              <BsPersonFillGear
                className="mt-2"
                style={{
                  fontSize: "6rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
              <p className="mt-3 mb-3">No Service available at the moment</p>
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
          <h5>Services Ordered</h5>
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

export default ServicesPage;
