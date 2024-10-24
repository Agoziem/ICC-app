"use client";
import {
  fetchService,
  fetchServiceUsers,
  servicesAPIendpoint,
} from "@/data/services/fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import SearchInput from "@/components/custom/Inputs/SearchInput";
import ServiceUsersTable from "./ServiceUsers";
import Pagination from "@/components/custom/Pagination/Pagination";

const categories = [
  {
    id: 1,
    name: "Purchased Service",
    category: "userIDs_that_bought_this_service",
  },
  {
    id: 2,
    name: "Service in Progess",
    category: "userIDs_whose_services_is_in_progress",
  },
  {
    id: 3,
    name: "Completed Service",
    category: "userIDs_whose_services_have_been_completed",
  },
];

const getCategoryname = (categoryField) => {
  const category = categories.find(
    (category) => category.category === categoryField
  );
  return category.name;
};

const ServiceConfig = ({ serviceid }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory =
    searchParams.get("category") || categories[0].category;
  const page = searchParams.get("page") || "1";
  const pageSize = "20";
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const {
    data: service,
    isLoading: loadingService,
    error,
    mutate:servicemutate
  } = useSWR(
    serviceid ? `${servicesAPIendpoint}/service/${serviceid}/` : null,
    fetchService
  );

  //   ------------------------------------------------
  //   fetch all the Users that bought the Service
  //   ------------------------------------------------
  const {
    data: users,
    isLoading: loadingUsers,
    error: fetchingUserError,
  } = useSWR(
    serviceid
      ? `${servicesAPIendpoint}/servicesusers/${serviceid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`
      : null,
    fetchServiceUsers
  );


  // -------------------------------
  // Handle Page change
  // -------------------------------
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

  // -------------------------------
  // Memoized filtered services based on search query
  // -------------------------------
  const filteredUsers = useMemo(() => {
    if (!users?.results) return [];
    if (!searchQuery) return users.results;

    return users.results.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <section>
      <div>
        <h4>{service?.name}</h4>
        <p><span className="fw-bold">category : </span>{service?.category.category}</p>
        <hr />
      </div>

      <div>
        {/* the filter button for inProgress, Completed  */}
        <div className="mb-3 ps-2 ps-md-0">
          {/* Categories */}
          <h5 className="mb-3 fw-bold">User categories</h5>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category.id}
                className={`badge rounded-5 px-4 py-2 me-2 mb-2`}
                style={{
                  color:
                    currentCategory === category.category
                      ? "var(--secondary)"
                      : "var(--primary)",
                  backgroundColor:
                    currentCategory === category.category
                      ? "var(--secondary-300)"
                      : " ",
                  border:
                    currentCategory === category.category
                      ? "1.5px solid var(--secondary)"
                      : "1.5px solid var(--bgDarkerColor)",
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryChange(category.category)}
              >
                {category.name}
              </div>
            ))}
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h5 className="mb-1">{getCategoryname(currentCategory)}</h5>
            <p className="mb-0 text-primary">
              {users?.count} User{users?.count > 1 ? "s" : ""} in Total
            </p>
          </div>

          <div className="ms-0 ms-md-auto mb-4 mb-md-0">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              itemlabel="user"
            />
          </div>
        </div>
        {/* the table as well */}
        <div className="my-4">
          <ServiceUsersTable
            users={filteredUsers}
            service={service}
            page={page}
            pageSize={pageSize}
            currentCategory={currentCategory}
            servicemutate={servicemutate}
          />
        </div>
        {/* the pagination */}
        <div>
          {!loadingUsers &&
            users &&
            Math.ceil(users.count / parseInt(pageSize)) > 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(users.count / parseInt(pageSize))}
                handlePageChange={handlePageChange}
              />
            )}
        </div>
      </div>
    </section>
  );
};

export default ServiceConfig;
