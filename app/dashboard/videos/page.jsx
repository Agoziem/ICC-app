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
import { useCategoriesContext } from "@/data/Categoriescontext";
import { useVideoContext } from "@/data/Videoscontext";
import VideoCard from "@/components/Videos/VideoCard";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { FaVideo } from "react-icons/fa6";
import Pagination from "@/components/Pagination/Pagination";

const VideosPage = () => {
  const { openModal } = useAdminContext();
  const { videos, totalPages, fetchVideos, fetchVideosByCategory, loading } =
    useVideoContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { videoCategories: categories } = useCategoriesContext();
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
  // Fetch videos on page load
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
        fetchVideos(OrganizationData.id, 1);
      } else {
        fetchVideosByCategory(currentCategory, 1);
      }
    }
  }, [OrganizationData.id, currentCategory]);

  // ----------------------------------------------------
  // handle page change
  // ----------------------------------------------------
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (currentCategory === "All") {
      fetchVideos(OrganizationData.id, page);
    } else {
      fetchVideosByCategory(currentCategory, page);
    }
  };

  return (
    <div>
      <PageTitle pathname="videos" />
      <div style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center pe-3 pb-3 flex-wrap">
          <div>
            <h4 className="my-3 me-2">{currentCategory} Videos</h4>
          </div>
          <CartButton />
        </div>

        {/* Categories list */}
        <div className="mb-4">
          <CategoryTabs
            categories={filteredCategories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={videos}
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
          {!loading && videos && videos.length > 0 ? (
            videos.map((video) => (
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

export default VideosPage;
