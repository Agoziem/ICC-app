"use client";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import Image from "next/image";
import React from "react";


const ServicesPage = () => {
  const { services, setServices } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const { orders } = useAdminContext();
  
  return (
    <div>
      <PageTitle pathname="Services" />
      <div>
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
                <div className="card p-3 py-4" style={{
                  minHeight: "150px",
                }}>
                  <div className="d-flex justify-content-center align-items-center">
                    <Image
                      src={service.preview}
                      alt="Services"
                      width={100}
                      height={100}
                      className="me-3"
                      style={{
                        maxWidth: "60px",
                        maxHeight: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <h6>{service.name}</h6>
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
            <Datatable items={userOrder}>
              <OrderTableItems />
            </Datatable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
