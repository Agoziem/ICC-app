"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useCart } from "@/data/carts/Cartcontext";
import { useUserContext } from "@/data/payments/usercontextdata";
import Datatable from "@/components/custom/Datatable/Datatable";
import OrderTableItems from "@/components/features/orders/OrderTableItems";
import CartButton from "@/components/custom/Offcanvas/CartButton";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import VideoCard from "@/components/features/Videos/VideoCard";
import { FaVideo } from "react-icons/fa6";
import Pagination from "@/components/custom/Pagination/Pagination";
import { fetchCategories } from "@/data/categories/fetcher";
import useSWR from "swr";
import { fetchVideos, vidoesapiAPIendpoint } from "@/data/videos/fetcher";

const Videos = () => {
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
  } = useSWR(`${vidoesapiAPIendpoint}/categories/`, fetchCategories);

  useEffect(() => {
    if (!categories) return;
    if (categories.length > 0)
      setAllCategories([
        { id: 0, category: "All", description: "All Categories" },
        ...categories,
      ]);
  }, [categories]);

  // ---------------------------------------
  // set items in the order table
  // ---------------------------------------
  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  // ----------------------------------------
  // Fetch Videos based on category
  // ----------------------------------------
  const {
    data: videos,
    isLoading: loadingVideos,
    error: error,
  } = useSWR(
    `${vidoesapiAPIendpoint}/videos/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`,
    fetchVideos
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
          <h4 className="mb-1 me-2">{currentCategory} Videos</h4>
          <p className="mb-0 text-primary">
            {videos?.count} Service{videos?.count > 1 ? "s" : ""}
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
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            fetching Service Categories
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
          loadingVideos && !error && (
            <div className="d-flex justify-content-center">
              {/* spinner */}
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        }
        {!loadingVideos && videos?.results.length > 0 ? (
          videos?.results.map((video) => (
            <div key={video.id} className="col-12 col-md-4 mb-3">
              <VideoCard
                video={video}
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
            <FaVideo
              className="mt-2"
              style={{
                fontSize: "6rem",
                color: "var(--bgDarkerColor)",
              }}
            />
            <p className="mt-3 mb-3">No video available at the moment</p>
          </div>
        )}

        {!loadingVideos &&
          videos &&
          Math.ceil(videos.count / parseInt(pageSize)) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(videos.count / parseInt(pageSize))}
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

export default Videos;
