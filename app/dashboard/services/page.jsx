"use client";
import React, { useContext, useEffect, useState } from "react";
import { PiEmptyBold } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import CartButton from "@/components/Offcanvas/CartButton";
import CategoryTabs from "@/components/Categories/Categoriestab";
import ServicesPlaceholder from "@/components/ImagePlaceholders/ServicesPlaceholder";

const ServicesPage = () => {
  const { services, // openModal 
    } = useAdminContext();
  const { categories } = useContext(OrganizationContext);
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    } else if (categories.length > 0) {
      const firstCategoryWithServices = categories.find((cat) =>
        services.some((service) => service.category.id === cat.id)
      );
      setCurrentCategory(
        firstCategoryWithServices?.category || categories[0].category
      );
    }
  }, [categories, services, searchParams]);

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

        <div className="mb-4">
          <CategoryTabs
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={services}
          />
        </div>
        <div className="row">
          {services && services.length > 0 ? (
            // Filter services by the current category
            services.filter(
              (service) => currentCategory === service.category.category
            ).length > 0 ? (
              services
                .filter(
                  (service) => currentCategory === service.category.category
                )
                .map((service) => (
                  <div key={service.id} className="col-12 col-md-4">
                    <div className="card p-4 py-4">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          {service.preview ? (
                            <img
                              src={service.img_url}
                              alt="services"
                              width={68}
                              height={68}
                              className="rounded-circle object-fit-cover"
                              style={{ objectPosition: "center" }}
                            />
                          ) : (
                            <ServicesPlaceholder />
                          )}
                        </div>

                        <div
                          className="flex-fill d-flex flex-column justify-content-between"
                          style={{ height: "100%" }}
                        >
                          <h6 className="flex-grow-1">{service.name}</h6>
                          {/* Shorten the lenght by 100 characters */}
                          <p className="text-primary mb-1">
                            {service.description.length > 80 ? (
                              <span>
                                {service.description.substring(0, 80)}...{" "}
                                <span
                                  className="text-secondary fw-bold"
                                  style={{ cursor: "pointer" }}
                                  // onClick={() => openModal(service)}
                                >
                                  view more
                                </span>
                              </span>
                            ) : (
                              service.description
                            )}
                          </p>
                          <div className="d-flex justify-content-between mt-3 flex-wrap">
                            <span className="fw-bold text-primary me-2">
                              &#8358;{parseFloat(service.price)}
                            </span>

                            <div className="me-2 me-md-3">
                              {cart.find((item) => item.id === service.id) ? (
                                <span
                                  className="badge bg-secondary-light text-secondary p-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => removeFromCart(service.id)}
                                >
                                  remove Service {"  "}
                                  <i className="bi bi-cart-dash"></i>
                                </span>
                              ) : (
                                <span
                                  className="badge bg-success-light text-success p-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => addToCart(service)}
                                >
                                  Add Service {"  "}
                                  <i className="bi bi-cart-plus"></i>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              // Show "no services available" message if no services in the category
              <div className="mt-3 mb-3 text-center">
                <PiEmptyBold
                  className="mt-2"
                  style={{
                    fontSize: "6rem",
                    color: "var(--bgDarkerColor)",
                  }}
                />
                <p className="mt-3 mb-3">
                  no services available for the {currentCategory} category
                </p>
              </div>
            )
          ) : (
            // Show "no services available" message if no services at all
            <div className="mt-3 mb-3 text-center">
              <PiEmptyBold
                className="mt-2"
                style={{
                  fontSize: "6rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
              <p className="mt-3 mb-3">no services available at the moment</p>
            </div>
          )}

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
    </div>
  );
};

export default ServicesPage;
