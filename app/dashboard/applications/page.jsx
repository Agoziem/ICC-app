"use client";
import React, { useEffect, useState } from "react";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import { useCart } from "@/data/Cartcontext";
import { useUserContext } from "@/data/usercontextdata";
import { PiEmptyBold } from "react-icons/pi";
import ApplicationPlaceholder from "@/components/ImagePlaceholders/ApplicationPlaceholder";

const ApplicationsPage = () => {
  const { applications,openModal 
    } = useAdminContext();
  const { cart, addToCart, removeFromCart } = useCart();
  const { userOrder } = useUserContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(userOrder);
  }, [userOrder]);

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
                    <div className="me-3">
                      {application.preview ? (
                        <img
                          src={application.img_url}
                          alt="application"
                          width={75}
                          height={75}
                          className="rounded-circle object-fit-cover"
                          style={{
                            objectPosition: "center",
                          }}
                        />
                      ) : (
                        <ApplicationPlaceholder />
                      )}
                    </div>

                    <div className="ms-2 flex-fill">
                      <h6>{application.name}</h6>
                      <p className="text-primary mb-1">
                        {application.description.length > 80 ? (
                          <span>
                            {application.description.substring(0, 80)}...{" "}
                            <span
                              className="text-secondary fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => openModal(application)}
                            >
                              view more
                            </span>
                          </span>
                        ) : (
                          application.description
                        )}
                      </p>
                      <div className="d-flex justify-content-between mt-3">
                        <span className="fw-bold text-primary me-2">
                          &#8358;{parseFloat(application.price)}
                        </span>
                        <span className="me-2 me-md-4">
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
                        </span>
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

export default ApplicationsPage;
