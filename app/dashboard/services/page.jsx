"use client";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ServicesPage = () => {
  const { services, setServices } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const { orders } = useAdminContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);
  return (
    <div>
      <PageTitle pathname="Services" />
      <div style={{minHeight:"100vh"}}>
        <div className="d-flex justify-content-end pe-3 pb-3">
          <div
            className="px-3 py-2 position-relative"
            style={{
              cursor: "pointer",
              backgroundColor: "var(--bgDarkerColor)",
              color: "var(--white)",
              borderRadius: "5px",
            }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            {cart.length > 0 ? "Check out now " : "View your Cart"}
            <i className="bi bi-cart3 ms-2 h6"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">cart items</span>
              </span>
            )}
          </div>
        </div>
        <div className="row">
          {services &&
            services.length > 0 &&
            services.map((service) => (
              <div key={service.id} className="col-12 col-md-4">
                <div className="card p-4 py-4">
                  <div className="d-flex align-items-center">
                    {service.preview ? (
                      <img
                        src={service.img_url}
                        alt="services"
                        width={75}
                        height={75}
                        className="me-3 rounded-circle object-fit-cover"
                        style={{
                          objectPosition: "center",
                        }}
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
                            remove from Cart {"  "}
                            <i className="bi bi-cart-dash"></i>
                          </span>
                        ) : (
                          <span
                            className="badge bg-success-light text-success p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => addToCart(service)}
                          >
                            Add to Cart {"  "}
                            <i className="bi bi-cart-plus"></i>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

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
