"use client";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import React, { useContext, useEffect, useState } from "react";
import { PiEmptyBold } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import CartButton from "@/components/Offcanvas/CartButton";

const ServicesPage = () => {
  const { services } = useAdminContext();
  const { categories } = useContext(OrganizationContext);
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);
  const searchParams = useSearchParams();
  const [currentcategory, setCurrentCategory] = useState("");

  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    } else {
      console.log(categories)
      setCurrentCategory(categories[0]?.category);
    }
  }, [categories]);

  return (
    <div>
      <PageTitle pathname="Services" />
      <div style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center pe-3 pb-3 flex-wrap">
          <div>
            <h4 className="my-3">{currentcategory} Services</h4>
          </div>
          <CartButton />
        </div>

        <div className="mb-4">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => {
              if (category.category !== "application") {
                return (
                  <div
                    key={category.id}
                    className={`badge rounded-5 px-4 py-2 me-2 mb-3 mb-md-0`}
                    style={{
                      color:
                        currentcategory === category.category
                          ? "var(--secondary)"
                          : "var(--primary)",
                      backgroundColor:
                        currentcategory === category.category
                          ? "var(--secondary-300)"
                          : " ",
                      border:
                        currentcategory === category.category
                          ? "1.5px solid var(--secondary)"
                          : "1.5px solid var(--bgDarkerColor)",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentCategory(category.category)}
                  >
                    {category.category}
                  </div>
                );
              }
            })}
        </div>

        <div className="row">
          {services && services.length > 0 ? (
            // Filter services by the current category
            services.filter(
              (service) => currentcategory === service.category.category
            ).length > 0 ? (
              services
                .filter(
                  (service) => currentcategory === service.category.category
                )
                .map((service) => (
                  <div key={service.id} className="col-12 col-md-4">
                    <div className="card p-4 py-4">
                      <div className="d-flex align-items-center">
                        {service.preview ? (
                          <img
                            src={service.img_url}
                            alt="services"
                            width={68}
                            height={68}
                            className="me-3 rounded-circle object-fit-cover"
                            style={{ objectPosition: "center" }}
                          />
                        ) : (
                          <div
                            className="me-3"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              backgroundColor: "var(--bgDarkerColor)",
                              color: "var(--bgDarkerColor)",
                            }}
                          >
                            <i className="bi bi-person-fill-gear h4 mb-0"></i>
                          </div>
                        )}
                        <div
                          className="flex-fill d-flex flex-column justify-content-between"
                          style={{ height: "100%" }}
                        >
                          <h6 className="flex-grow-1">{service.name}</h6>
                          <div className="d-flex justify-content-around mt-3">
                            <span className="fw-bold text-primary me-2">
                              &#8358;{parseFloat(service.price)}
                            </span>

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
                  no services available for the {currentcategory} category
                </p>
              </div>
            )
          ) : (
            // Show "no services available" message if no services at all
            <div className="mt-3 mb-3 text-center" >
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
            <Datatable items={items} setItems={setItems}>
              <OrderTableItems />
            </Datatable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;
