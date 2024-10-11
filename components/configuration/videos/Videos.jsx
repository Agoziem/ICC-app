"use client";
import { useAdminContext } from "@/data/users/Admincontextdata";
import { useCategoriesContext } from "@/data/categories/Categoriescontext";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import { useVideoContext } from "@/data/videos/Videoscontext";
import React, { useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
import VideoCard from "./VideoCard";
import VideoForm from "./VideoForm";
import CategoryTabs from "@/components/Categories/Categoriestab";
import CategoriesForm from "@/components/Categories/Categories";
import SubCategoriesForm from "@/components/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import { FaVideo } from "react-icons/fa6";
import Pagination from "@/components/Pagination/Pagination";

const Videos = () => {
  const { openModal } = useAdminContext();
  const {
    videos,
    createVideo,
    updateVideo,
    deleteVideo,
    loading,
    totalPages,
    fetchVideos,
    fetchVideosByCategory,
  } = useVideoContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { videoCategories: categories, setVideoCategories: setCategories } =
    useCategoriesContext();
  const { fetchVideoSubCategories } = useSubCategoriesContext();
  const initialVideoState = {
    id: null,
    organization: OrganizationData.id,
    thumbnail: null,
    video: null,
    video_url: null,
    video_name: null,
    img_url: null,
    img_name: null,
    category: null,
    subcategory: null,
    title: "",
    description: "",
    price: "",
    video_token: "",
    free: false,
    userIDs_that_bought_this_video: [],
  };
  const [video, setVideo] = useState(initialVideoState);
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

  // ------------------------------------------------------
  // Fetch all videos and paginate them
  // ------------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setVideo(initialVideoState);
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
    if (addorupdate.mode === "add") {
      const result = await createVideo(video);
      if (result.type && result.type === "success") {
        handleAlert(result.message, result.type);
        closeModal();
      } else {
        handleAlert(result.message, result.type);
        closeModal();
      }
    } else {
      const result = await updateVideo(video.id, video);
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
    await deleteVideo(id);
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
            setItems={setCategories}
            itemName="category"
            itemLabel="Category"
            addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/add_category/`}
            updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/update_category`}
            deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/delete_category`}
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

      <div className="d-flex flex-wrap align-items-center mb-4">
        <CategoryTabs
          categories={filteredCategories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          services={videos}
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
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add Video
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
        {!loading && videos.length > 0 ? (
          videos.map((video) => (
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
          <h5 className="text-center mb-4">{video.name}</h5>
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
