"use client";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import Modal from "@/components/custom/Modal/modal";
import Alert from "@/components/custom/Alert/Alert";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";
import CategoryTabs from "@/components/features/Categories/Categoriestab";
import CategoriesForm from "@/components/features/Categories/Categories";
import SubCategoriesForm from "@/components/features/SubCategories/SubCategoriesForm";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import Pagination from "@/components/custom/Pagination/Pagination";
import { BsPersonFillGear } from "react-icons/bs";
import useSWR from "swr";
import { fetchCategories } from "@/data/categories/fetcher";
import { serviceDefault } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  createService,
  deleteService,
  fetchServices,
  servicesAPIendpoint,
  updateService,
} from "@/data/services/fetcher";
import SearchInput from "@/components/custom/Inputs/SearchInput";
import { PulseLoader } from "react-spinners";

const Services = () => {
  const { openModal } = useAdminContext();
  const { OrganizationData } = useContext(OrganizationContext);
  const [service, setService] = useState(serviceDefault);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [addorupdate, setAddorupdate] = useState({ mode: "", state: false });

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [allCategories, setAllCategories] = useState([]);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isPending, startTransition] = useTransition();
  const [isdeleting, startDeletion] = useTransition();

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoryError,
    mutate: categoriesmutate,
  } = useSWR(`${servicesAPIendpoint}/categories/`, fetchCategories);

  useEffect(() => {
    if (!categories) return;
    if (categories.length > 0)
      setAllCategories([
        { id: 0, category: "All", description: "All Categories" },
        ...categories,
      ]);
  }, [categories]);

  // ----------------------------------------
  // Fetch services based on category
  // ----------------------------------------
  const {
    data: services,
    isLoading: loadingServices,
    error: error,
    mutate,
  } = useSWR(
    `${servicesAPIendpoint}/services/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`,
    fetchServices
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

  // Memoized filtered services based on search query
  const filteredServices = useMemo(() => {
    if (!services?.results) return [];
    if (!searchQuery) return services.results;

    return services.results.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  // ----------------------------------------------------
  // Close the modal
  // ----------------------------------------------------
  const closeModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setAddorupdate({ mode: "", state: false });
    setService(serviceDefault);
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
    startTransition(async () => {
      const { organization, category, subcategory, ...restData } = service;
      const servicetosubmit = {
        ...restData,
        organization: Organizationid,
        category: category || "",
        subcategory: subcategory
          ? {
              ...subcategory,
              category: category.id,
            }
          : "",
      };
      try {
        if (addorupdate.mode === "add") {
          const newService = await createService(servicetosubmit);
          await mutate(
            (Services) => {
              /** * @type {Services} */
              const newServices = [newService, ...(Services?.results || [])];
              return {
                ...Services,
                results: newServices.sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                ),
              };
            },
            {
              populateCache: true,
            }
          );
        } else {
          const updatedService = await updateService(servicetosubmit);
          await mutate(
            (Services) => {
              /** * @type {Services} */
              const otherServices = (Services?.results || []).map((o) =>
                o.id === updatedService.id ? updatedService : o
              );
              return {
                ...Services,
                results: otherServices.sort(
                  (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
                ),
              };
            },
            {
              populateCache: true,
            }
          );
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
    });
  };

  //----------------------------------------------------
  // Delete a service
  //----------------------------------------------------
  /**
   * @async
   * @param {number} id
   */
  const handleDelete = async (id) => {
    startDeletion(async () => {
      try {
        const serviceid = await deleteService(id);
        await mutate(
          (Services) => {
            const otherServices = Services.results.filter(
              (service) => service.id !== serviceid
            );
            Services.results = otherServices;
            return { ...Services };
          },
          {
            populateCache: true,
          }
        );
        handleAlert("Service deleted Successfully", "success");
      } catch (error) {
        console.log(error.message);
        handleAlert("Error deleting Service", "danger");
      } finally {
        closeModal();
      }
    });
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
            mutate={categoriesmutate}
            addUrl={`${servicesAPIendpoint}/add_category/`}
            updateUrl={`${servicesAPIendpoint}/update_category/`}
            deleteUrl={`${servicesAPIendpoint}/delete_category/`}
          />
        </div>

        <div className="col-12 col-md-5">
          <SubCategoriesForm
            categories={categories}
            apiendpoint={servicesAPIendpoint}
            addUrl={`${servicesAPIendpoint}/create_subcategory/`}
            updateUrl={`${servicesAPIendpoint}/update_subcategory`}
            deleteUrl={`${servicesAPIendpoint}/delete_subcategory`}
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
          {currentCategory}{" "}
          {currentCategory !== "application" ? "Service" : "Application"}
        </button>

        <div>
          <h5 className="mb-1">{currentCategory} Services</h5>
          <p className="mb-0 text-primary">
            {services?.count} Service{services?.count > 1 ? "s" : ""} in Total
          </p>
        </div>

        <div className="ms-0 ms-md-auto mb-4 mb-md-0">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            itemlabel="service"
          />
        </div>
      </div>

      {/* The Services & Application list */}
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="row">
        {
          // loading
          loadingServices && !error && (
            <div className="d-flex justify-content-center">
              {/* spinner */}
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        }
        {!loadingServices && filteredServices?.length > 0 ? (
          filteredServices?.map((service) => (
            <ServiceCard
              openModal={openModal}
              key={service.id}
              tab={currentCategory}
              item={service}
              onEdit={handleEdit}
              onDelete={handleDeleteConfirm}
            />
          ))
        ) : (
          <div className="mt-3 mb-3 text-center">
            <BsPersonFillGear
              className="mt-2"
              style={{
                fontSize: "6rem",
                color: "var(--bgDarkerColor)",
              }}
            />
            <p className="mt-3 mb-3">no Services available</p>
          </div>
        )}

        {!loadingServices &&
          services &&
          Math.ceil(services.count / parseInt(pageSize)) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(services.count / parseInt(pageSize))}
              handlePageChange={handlePageChange}
            />
          )}
      </div>

      <Modal
        showmodal={showModal}
        toggleModal={closeModal}
        overlayclose={false}
      >
        <ServiceForm
          service={service}
          setService={setService}
          handleSubmit={handleSubmit}
          addorupdate={addorupdate}
          OrganizationData={OrganizationData}
          tab={currentCategory}
          categories={categories}
          isSubmitting={isPending}
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
              disabled={isdeleting}
            >
              {isdeleting ? (
                <div className="d-inline-flex align-items-center justify-content-center gap-2">
                  <div>deleting Service</div>
                  <PulseLoader size={8} color={"#ffffff"} loading={true} />
                </div>
              ) : (
                "Delete"
              )}
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
