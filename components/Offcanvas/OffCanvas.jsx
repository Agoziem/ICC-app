"use client";
import { useCart } from "@/data/Cartcontext";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import React, { useContext } from "react";

const OffCanvas = () => {
  const { OrganizationData } = useContext(OrganizationContext);
  const { cart, removeFromCart, resertCart, checkout } = useCart();
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasTop"
      aria-labelledby="offcanvasTopLabel"
      style={{
        backgroundColor: "var(--bgLightColor)",
      }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasTopLabel">
          Shopping Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body py-2">
        {cart && cart.length > 0 ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item"
                  style={{
                    backgroundColor: "var(--bgLightColor)",
                    borderColor: "var(--bgDarkColor)",
                  }}
                >
                  <div>
                    {item.name} -{" "}
                    <span className="float-md-end fw-bold">
                      &#8358;{item.price}
                    </span>
                  </div>
                  <span className="fw-bold small text-secondary">
                    {item.category === "service" ? (
                      <i className="bi bi-person-fill-gear me-2 h5"></i>
                    ) : (
                      <i className="bi bi-google-play"></i>
                    )}
                    {item.category}
                  </span>
                  <span
                    className="float-end badge bg-secondary-light text-secondary ms-2"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    remove
                  </span>
                </li>
              ))}
            </ul>
            <div className="d-flex flex-column justify-content-between pb-4 ps-3">
              <h4 className="mb-3">
                Total:{" "}
                <span className="fw-bold">
                  &#8358;
                  {cart.reduce((acc, item) => {
                    return acc + parseFloat(item.price);
                  }, 0)}
                </span>
              </h4>
              <div className="d-flex flex-md-row flex-column flex-md-fill">
                <button
                  className="btn btn-outline-danger me-0 me-md-3 mb-3 mb-md-0"
                  onClick={() => {
                    resertCart();
                  }}
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Clear Cart
                </button>
                <button
                  className="btn btn-primary"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => {
                    checkout(OrganizationData?.id);
                  }}
                >
                  Checkout now <i className="bi bi-cart-check h5 ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default OffCanvas;
