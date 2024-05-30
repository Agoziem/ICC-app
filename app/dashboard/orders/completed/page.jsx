"use client";
import { useCart } from "@/data/Cartcontext";
import React, { useEffect, useState } from "react";
import { useAdminContext } from "@/data/Admincontextdata";
import { useUserContext } from "@/data/usercontextdata";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const OrderCompleted = () => {
  const router = useRouter();
  const { reference } = useCart();
  const { updateUserOrder } = useUserContext();
  const { updateOrder } = useAdminContext();
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});

  // ---------------------------------------------------------------------
  // verify payment function
  // ----------------------------------------------------------------------
  const verifyPayment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/verifypayment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: reference,
          }),
        }
      );
      if (response.status !== 200 && response.status === 404) {
        const data = await response.json();
        console.log(data)
        updateOrder(data);
        updateUserOrder(data);
        setError("An error occurred while verifying payment");
      } 
      const data = await response.json();
      console.log(data)
      updateOrder(data);
      updateUserOrder(data);
      setSuccessful(true);
      setOrder(data);
     
    } catch (error) {
      setError("An error occurred while verifying payment");
    }
  };

  // ---------------------------------------------------------------------
  // call the verify payment function
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (reference) verifyPayment();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      {!successful && !error ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      {successful ? (
        <div className="card p-5 text-center">
          <div
            className="text-center bg-success-light d-flex align-items-center justify-content-center mb-4"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          >
            <BsFillCartCheckFill
              style={{
                fontSize: "40px",
                color: "var(--success)",
              }}
            />
          </div>

          <h5 className="mb-3">Payment Successful</h5>
          <p className="mb-1">Thank you for your payment</p>
          <p className="mb-1">
            <span className="fw-bold">Order ID: </span>
            {order.id}
          </p>
          <p className="mb-1">
            <span className="fw-bold">Amount: </span>&#8358;{order.amount}
          </p>
          <p className="mb-1">
            <span className="fw-bold">Payment Reference: </span>
            {order.reference}
          </p>
          <div className="mt-3">
            <div
              className="badge bg-secondary-light py-3 px-4 me-2 mb-3 mb-md-0"
              style={{
                cursor: "pointer",
                color: "var(--secondary)",
                fontSize: "15px",
                borderRadius: "25px",
              }}
            >
              download receipt
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : null}
      {error && (
        <div className="card p-4">
          <div className="alert alert-danger mt-4">{error}</div>
          <button
            className="btn btn-primary"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCompleted;
