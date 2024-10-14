"use client";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import React, { useEffect, useState } from "react";
import Modal from "@/components/custom/Modal/modal";
import Alert from "@/components/custom/Alert/Alert";
import VideoCard from "./VideoCard";
import VideoForm from "./VideoForm";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import CategoriesForm from "@/components/features/Categories/Categories";
import SubCategoriesForm from "@/components/features/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import { FaVideo } from "react-icons/fa6";
import Pagination from "@/components/custom/Pagination/Pagination";
import useSWR from "swr";
import { fetchCategories } from "@/data/categories/fetcher";
import { VideoDefault } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  createVideo,
  deleteVideo,
  fetchVideos,
  updateVideo,
  vidoesapiAPIendpoint,
} from "@/data/videos/fetcher";

const Videos = () => {
  const { openModal } = useAdminContext();
  const { fetchVideoSubCategories } = useSubCategoriesContext();
  const [video, setVideo] = useState(VideoDefault);
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

  const { mutate } = useSWR(
    `${vidoesapiAPIendpoint}/videos/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`
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

  // ------------------------------------------------------
  // Fetch all videos and paginate them
  // ------------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setVideo(VideoDefault);
    setAddorupdate({ mode: "", state: false });
  };

  const handleAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  //----------------------------------------------------
  // Create a new video or update an existing video
  //----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addorupdate.mode === "add") {
        await mutate(createVideo(video), {
          populateCache: true,
        });
      } else {
        await mutate(updateVideo(video), {
          populateCache: true,
        });
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
  };

  //----------------------------------------------------
  // Delete a Video
  //----------------------------------------------------
  /**
   * @async
   * @param {number} id
   */
  const handleDelete = async (id) => {
    try {
      await mutate(deleteVideo(id), {
        populateCache: true,
      });
      handleAlert("Service deleted Successfully", "success");
    } catch (error) {
      console.log(error.message);
      handleAlert("Error deleting Service", "danger");
    } finally {
      closeModal();
    }
  };

  //   ------------------------------------------------------
  //   // Create a new service
  //   // ------------------------------------------------------
  const handleEdit = (video) => {
    setVideo(video);
    setAddorupdate({ mode: "update", state: true });
    setShowModal(true);
  };

  //   ------------------------------------------------------
  //   // Delete a service
  //   // ------------------------------------------------------
  const handleDeleteConfirm = (video) => {
    setVideo(video);
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
            addUrl={`${vidoesapiAPIendpoint}/add_category/`}
            updateUrl={`${vidoesapiAPIendpoint}/update_category`}
            deleteUrl={`${vidoesapiAPIendpoint}/delete_category`}
          />
        </div>
        <div className="col-12 col-md-5">
          <SubCategoriesForm
            categories={categories}
            fetchSubCategories={fetchVideoSubCategories}
            addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/create_subcategory/`}
            updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/update_subcategory`}
            deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/delete_subcategory`}
          />
        </div>
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
          {currentCategory} Video
        </button>
        <div>
          <h5 className="mb-1">{currentCategory} Videos</h5>
          <p className="mb-0 text-primary">
            {videos?.count} Video{videos?.count > 1 ? "s" : ""} in Total
          </p>
        </div>
      </div>

      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
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
            <VideoCard
              openModal={openModal}
              key={video.id}
              tab={currentCategory}
              item={video}
              onEdit={handleEdit}
              onDelete={handleDeleteConfirm}
            />
          ))
        ) : (
          <div className="mt-3 mb-3 text-center">
            <FaVideo
              className="mt-2"
              style={{
                fontSize: "6rem",
                color: "var(--bgDarkerColor)",
              }}
            />
            <p className="mt-3 mb-3">No Videos available</p>
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

      <Modal
        showmodal={showModal}
        toggleModal={closeModal}
        overlayclose={false}
      >
        <VideoForm
          video={video}
          setVideo={setVideo}
          handleSubmit={handleSubmit}
          addorupdate={addorupdate}
          categories={categories}
        />
      </Modal>

      <Modal showmodal={showModal2} toggleModal={closeModal}>
        <div className="p-3">
          <p className="text-center">Delete Product</p>
          <hr />
          <h5 className="text-center mb-4">{video.title}</h5>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger border-0 rounded me-2"
              onClick={() => handleDelete(video.id)}
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

export default Videos;
