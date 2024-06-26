"use client";
import React from "react";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import { PiEmptyBold } from "react-icons/pi";

const ApplicationsPage = () => {
  const { applications, setApplications } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const { orders } = useAdminContext();

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Applications" />
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
          {applications && applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.id} className="col-12 col-md-4">
                <div className="card p-4 py-4">
                  <div className="d-flex align-items-center">
                    {application.preview ? (
                      <img
                        src={application.img_url}
                        alt="application"
                        width={75}
                        height={75}
                        className="me-3 rounded-circle object-fit-cover"
                        style={{
                          objectPosition: "center",
                        }}
                      />
                    ) : (
                      <div
                        className="p-3 d-flex justify-content-center align-items-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "var(--bgDarkColor)",
                          color: "var(--bgDarkerColor)",
                        }}
                      >
                        <i className="bi bi-google-play h4 mb-0"></i>
                      </div>
                    )}

                    <div className="ms-3 flex-fill">
                      <h6>{application.name}</h6>
                      <div className="d-flex justify-content-around mt-3">
                        <span className="fw-bold text-primary me-2">
                          &#8358;{parseFloat(application.price)}
                        </span>

                        {cart.find((item) => item.id === application.id) ? (
                          <span
                            className="badge bg-secondary-light text-secondary p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeFromCart(application.id)}
                          >
                            remove from Cart {"  "}
                            <i className="bi bi-cart-dash"></i>
                          </span>
                        ) : (
                          <span
                            className="badge bg-success-light text-success p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => addToCart(application)}
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
            ))
          ) : (
            <div className="mt-3 mb-3 text-center">
              <PiEmptyBold
                className="mt-2"
                style={{
                  fontSize: "6rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
              <p className="mt-3 mb-3">
                no applications available at the moment
              </p>
            </div>
          )}

          <div className="mt-2">
            <h5>Orders made</h5>
            <Datatable items={userOrder}>
              <OrderTableItems />
            </Datatable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
