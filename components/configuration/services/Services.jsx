"use client";
import React, { useContext, useEffect, useState } from "react";
import { useAdminContext } from "@/data/Admincontextdata";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";
import CategoryTabs from "@/components/Categories/Categoriestab";
import CategoriesForm from "@/components/Categories/Categories";
import { useServiceContext } from "@/data/Servicescontext";
import { useCategoriesContext } from "@/data/Categoriescontext";
import SubCategoriesForm from "@/components/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/Subcategoriescontext";

// {
//   "id": 3,
//   "organization": {
//     "id": 1,
//     "name": "Innovations Cybercafe"
//   },
//   "preview": "/media/services/university_of_benin.png",
//   "img_url": "http://127.0.0.1:8000/media/services/university_of_benin.png",
//   "img_name": "university_of_benin.png",
//   "category": {
//     "id": 3,
//     "category": "PostUTME",
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur"
//   },
//   "name": "Uniben PostUtme Registration",
//   "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur",
//   "service_flow": null,
//   "price": "5500.00",
//   "number_of_times_bought": 0,
//   "created_at": "2024-05-28T15:06:41.369856Z",
//   "updated_at": "2024-07-10T14:48:22.921755Z",
//   "userIDs_that_bought_this_service": []
// },
const Services = () => {
  const { openModal } = useAdminContext();
  const {
    services,
    setServices,
    applications,
    setApplications,
    createService,
    updateService,
    deleteService,
  } = useServiceContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const { servicecategories: categories, setServiceCategories: setCategories } =
    useCategoriesContext();
  const { fetchServiceSubCategories } = useSubCategoriesContext();
  const initialServiceState = {
    id: null,
    preview: null,
    img_url: null,
    img_name: null,
    category: null,
    name: "",
    description: "",
    service_flow: "",
    price: "",
    number_of_times_bought: 0,
    userIDs_that_bought_this_service: [],
  };
  const [service, setService] = useState(initialServiceState);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [addorupdate, setAddorupdate] = useState({ mode: "", state: false });
  const [currentCategory, setCurrentCategory] = useState("application");

  useEffect(() => {
    if (categories.length > 0) setCurrentCategory(categories[0].category);
  }, [categories]);

  // ----------------------------------------------------
  // Close the modal
  // ----------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setAddorupdate({ mode: "", state: false });
    setService(initialServiceState);
  };

  // ----------------------------------------------------
  // Show an alert
  // ----------------------------------------------------
  const handleAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  //----------------------------------------------------
  // Create a new service or update an existing service
  //----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addorupdate.mode === "add") {
      const result = await createService(service);
      if (result.type && result.type === "success") {
        handleAlert(result.message, result.type);
        closeModal();
      } else {
        handleAlert(result.message, result.type);
        closeModal();
      }
    } else {
      const result = await updateService(service.id, service);
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
  // Delete a service
  //----------------------------------------------------
  const handleDelete = async (id) => {
    const result = await deleteService(id);
    if (result.type && result.type === "success") {
      handleAlert(result.message, result.type);
      closeModal();
    } else {
      handleAlert(result.message, result.type);
      closeModal();
    }
  };

  // ----------------------------------------------------
  // Edit a service
  // ----------------------------------------------------
  const handleEdit = (service) => {
    setService(service);
    setAddorupdate({ mode: "update", state: true });
    setShowModal(true);
  };

  // ----------------------------------------------------
  // Delete a service
  // ----------------------------------------------------
  const handleDeleteConfirm = (service) => {
    setService(service);
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
            addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/add_category/`}
            updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/update_category`}
            deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/delete_category`}
          />
        </div>

        <div className="col-12 col-md-5">
          <SubCategoriesForm
            categories={categories}
            fetchSubCategories={fetchServiceSubCategories}
            addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/create_subcategory/`}
            updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/update_subcategory`}
            deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/delete_subcategory`}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center mb-4">
        {/* other tabs */}
        <CategoryTabs
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          services={services}
        />

        {/* Application tab */}
        <div
          className={`badge rounded-5 px-4 py-2 me-2 mb-2 mb-md-0`}
          style={{
            color:
              currentCategory === "application"
                ? "var(--secondary)"
                : "var(--primary)",
            backgroundColor:
              currentCategory === "application" ? "var(--secondary-300)" : " ",
            border:
              currentCategory === "application"
                ? "1.5px solid var(--secondary)"
                : "1.5px solid var(--bgDarkerColor)",
            cursor: "pointer",
          }}
          onClick={() => setCurrentCategory("application")}
        >
          Applications
        </div>
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
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add{" "}
          {currentCategory !== "application" ? "Service" : "Application"}
        </button>
      </div>

      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="row">
        {currentCategory !== "application"
          ? services
              .filter(
                (service) => currentCategory === service.category.category
              )
              .map((service) => (
                <ServiceCard
                  openModal={openModal}
                  key={service.id}
                  tab={currentCategory}
                  item={service}
                  onEdit={handleEdit}
                  onDelete={handleDeleteConfirm}
                />
              ))
          : applications.map((application) => (
              <ServiceCard
                openModal={openModal}
                key={application.id}
                item={application}
                tab={currentCategory}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            ))}
      </div>

      <Modal showmodal={showModal} toggleModal={closeModal}>
        <ServiceForm
          service={service}
          setService={setService}
          handleSubmit={handleSubmit}
          addorupdate={addorupdate}
          OrganizationData={OrganizationData}
          tab={currentCategory}
          categories={categories}
        />
      </Modal>

      <Modal showmodal={showModal2} toggleModal={closeModal}>
        <div className="p-3">
          <p className="text-center">
            Delete{" "}
            {currentCategory !== "application" ? "Service" : "Application"}
          </p>
          <hr />
          <h5 className="text-center mb-4">{service.name}</h5>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger border-0 rounded me-2"
              onClick={() => handleDelete(service.id)}
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

export default Services;
