"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useCart } from "@/data/carts/Cartcontext";
import useSWR from "swr";
import { fetchCategories } from "@/data/categories/fetcher";
import { fetchServices, servicesAPIendpoint } from "@/data/services/fetcher";
import Datatable from "@/components/custom/Datatable/Datatable";
import ServiceCard from "@/components/features/Services/ServiceCard";
import CartButton from "@/components/custom/Offcanvas/CartButton";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import Pagination from "@/components/custom/Pagination/Pagination";
import SearchInput from "@/components/custom/Inputs/SearchInput";
import { BsPersonFillGear } from "react-icons/bs";

const Services = () => {
  const { openModal } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [allCategories, setAllCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  // Fetch categories
  const { data: categories, isLoading: loadingCategories, error: categoryError } = 
    useSWR(`${servicesAPIendpoint}/categories/`, fetchCategories);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setAllCategories([
        { id: 0, category: "All", description: "All Categories" },
        ...categories,
      ]);
    }
  }, [categories]);

  // Fetch services
  const { data: services, isLoading: loadingServices, error } = 
    useSWR(
      `${servicesAPIendpoint}/services/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`,
      fetchServices
    );

  // Fetch trending services
  const { data: trendingservices, isLoading: loadingTrendingServices, error: trendingError } = 
    useSWR(
      `${servicesAPIendpoint}/trendingservices/${Organizationid}/?category=${currentCategory}&page=1&page_size=6`,
      fetchServices
    );

  // Handle category change
  const handleCategoryChange = (category) => {
    router.push(`?category=${category}&page=1&page_size=${pageSize}`, {
      scroll: false,
    });
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    router.push(`?category=${currentCategory}&page=${newPage}&page_size=${pageSize}`);
  };

  // Memoized filtered services based on search query
  const filteredServices = useMemo(() => {
    if (!services?.results) return [];
    if (!searchQuery) return services.results;

    return services.results.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between pe-3 mb-3 flex-wrap">
        <div>
          <h4 className="me-2">{currentCategory} Services</h4>
          <p className="mb-0 text-primary">
            {services?.count} Service{services?.count > 1 ? "s" : ""} in Total
          </p>
        </div>
        <CartButton />
      </div>

      {/* Categories and Search Input */}
      <div className="mb-4 ps-2 ps-md-0">
        <h5 className="mb-3 fw-bold">Categories</h5>
        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
          {loadingCategories ? (
            <div className="d-flex gap-2 align-items-center">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Fetching Service Categories
            </div>
          ) : (
            <CategoryTabs
              categories={allCategories}
              currentCategory={currentCategory}
              setCurrentCategory={handleCategoryChange}
            />
          )}

          <div className="ms-0 ms-md-auto mb-4 mb-md-0">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              itemlabel="service"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      {searchQuery && <h5>Search Results</h5>}
      <div className="row">
        {loadingServices ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredServices?.length > 0 ? (
          filteredServices?.map((service) => (
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
          <div className="mt-3 mb-3 text-center">
            <BsPersonFillGear
              className="mt-2"
              style={{ fontSize: "6rem", color: "var(--bgDarkerColor)" }}
            />
            <p className="mt-3 mb-3">No Service available at the moment</p>
          </div>
        )}

        {!loadingServices && services && Math.ceil(services.count / parseInt(pageSize)) > 1 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(services.count / parseInt(pageSize))}
            handlePageChange={handlePageChange}
          />
        )}
      </div>

      {/* Trending Services */}
      {!loadingTrendingServices && trendingservices?.results.length > 0 && (
        <>
          <hr />
          <div className="mb-3">
            <h5>Top Trending Services</h5>
          </div>
          <div className="row">
            {trendingservices.results.map((service) => (
              <div key={service.id} className="col-12 col-md-4">
                <ServiceCard
                  service={service}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cart={cart}
                  openModal={openModal}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
