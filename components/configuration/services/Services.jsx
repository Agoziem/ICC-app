"use client";
import { useAdminContext } from "@/data/Admincontextdata";
import React, { useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
import { converttoformData } from "@/utils/formutils";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";
import CategoryTabs from "@/components/Categories/Categoriestab";
import CategoriesForm from "@/components/Categories/Categories";

const Services = () => {
  const { services, setServices } = useAdminContext();
  const { applications, setApplications } = useAdminContext();
  const { OrganizationData, categories, setCategories } =
    useContext(OrganizationContext);
  const [service, setService] = useState({
    name: "",
    description: "",
    price: 0,
    number_of_times_bought: 0,
    preview: null,
    img_url: null,
    img_name: "",
    category: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [addorupdate, setAddorupdate] = useState({ mode: "", state: false });
  const [currentCategory, setCurrentCategory] = useState("service");

  useEffect(() => {
    setCurrentCategory(categories[0]?.category);
  }, [categories]);

  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setAddorupdate({ mode: "", state: false });
    setService({
      name: "",
      description: "",
      price: 0,
      number_of_times_bought: 0,
      preview: null,
      img_url: null,
      img_name: "",
      category: "",
    });
  };

  const handleSubmit = async (e, url) => {
    e.preventDefault();
    const formData = converttoformData(service);
    try {
      const res = await fetch(url, {
        method: addorupdate.mode === "add" ? "POST" : "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        if (addorupdate.mode === "add") {
          data.category !== "application"
            ? setServices([...services, data])
            : setApplications([...applications, data]);
          setAlert({
            show: true,
            message: `${
              currentCategory !== "application" ? "service" : "application"
            } added successfully`,
            type: "success",
          });
        } else {
          data.category !== "application"
            ? setServices(
                services.map((service) =>
                  service.id === data.id ? { ...service, ...data } : service
                )
              )
            : setApplications(
                applications.map((application) =>
                  application.id === data.id
                    ? { ...application, ...data }
                    : application
                )
              );
          setAlert({
            show: true,
            message: `${
              currentCategory !== "application" ? "service" : "application"
            } updated successfully`,
            type: "success",
          });
        }
      } else {
        setAlert({
          show: true,
          message: "An error just occurred",
          type: "danger",
        });
      }
      closeModal();
    } catch (error) {
      setAlert({
        show: true,
        message: error.message,
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/delete_service/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        currentCategory !== "application"
          ? setServices(services.filter((service) => service.id !== id))
          : setApplications(
              applications.filter((application) => application.id !== id)
            );
        setAlert({
          show: true,
          message: "service deleted successfully",
          type: "success",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "An error just occurred",
        type: "danger",
      });
    } finally {
      closeModal();
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  const handleEdit = (service) => {
    setService(service);
    setAddorupdate({ mode: "update", state: true });
    setShowModal(true);
  };

  const handleDeleteConfirm = (service) => {
    setService(service);
    setShowModal2(true);
  };

  return (
    <div>
      <hr />
      <div
        style={{
          maxWidth: "650px",
        }}
      >
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

      <div className="d-flex flex-wrap align-items-center mb-4">
        <CategoryTabs
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          services={services}
        />
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
          application
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
          {currentCategory !== "application" ? "service" : "application"}
        </button>
      </div>

      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="row">
        {currentCategory !== "application"
          ? services &&
            services.length > 0 &&
            services
              .filter(
                (service) => currentCategory === service.category.category
              )
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  tab={currentCategory}
                  item={service}
                  onEdit={handleEdit}
                  onDelete={handleDeleteConfirm}
                />
              ))
          : applications &&
            applications.length > 0 &&
            applications.map((application) => (
              <ServiceCard
                key={application.id}
                item={application}
                tab={currentCategory}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            ))}
      </div>

      <Modal
        showmodal={showModal}
        toggleModal={() => {
          closeModal();
        }}
      >
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

      <Modal
        showmodal={showModal2}
        toggleModal={() => {
          closeModal();
        }}
      >
        <div className="p-3">
          <p className="text-center">
            Delete{" "}
            {currentCategory !== "application" ? "service" : "application"}
          </p>
          <hr />
          <h5 className="text-center mb-4">{service.name}</h5>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger border-0 rounded me-2"
              onClick={() => {
                handleDelete(service.id);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-accent-secondary border-0 rounded"
              onClick={() => closeModal()}
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
