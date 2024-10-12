"use client";
import { useCart } from "@/data/carts/Cartcontext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useUserContext } from "@/data/payments/usercontextdata";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useJsxToPdf from "@/hooks/useJSXtoPDF";
import { FaCheck, FaRegClipboard } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useVideoContext } from "@/data/videos/Videoscontext";
import { useProductContext } from "@/data/product/Productcontext";
import { useServiceContext } from "@/data/services/Servicescontext";

const OrderCompleted = () => {
  const router = useRouter();
  const { reference } = useCart();
  const { updateUserOrder } = useUserContext();
  const { updateOrder } = useAdminContext();
  const { setVideos } = useVideoContext();
  const { setProducts } = useProductContext();
  const { setServices } = useServiceContext();
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});
  const [copied, setCopied] = useState(false);
  const [loading, generatePdf] = useJsxToPdf();
  const pdfRef = useRef();
  const { data: session } = useSession();

  const savePdf = async () => {
    await generatePdf(pdfRef.current, "Order-Receipt");
  };

  const updateItems = (prevItems, updatedItems) => {
    const updatedItemsMap = new Map();
    updatedItems.forEach((item) => {
      updatedItemsMap.set(item.id, item);
    });

    return prevItems.map((item) => {
      if (updatedItemsMap.has(item.id)) {
        return updatedItemsMap.get(item.id);
      }
      return item;
    });
  };

  // Verify payment function
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
            customer_id: session.user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify payment");
      }

      const data = await response.json();
      updateOrder(data);
      updateUserOrder(data);

      // Assuming data contains updatedProducts, updatedServices, and updatedVideos arrays
      const updatedProducts = data.products || [];
      const updatedServices = data.services || [];
      const updatedVideos = data.videos || [];

      setProducts((prevProducts) => updateItems(prevProducts, updatedProducts));
      setServices((prevServices) => updateItems(prevServices, updatedServices));
      setVideos((prevVideos) => updateItems(prevVideos, updatedVideos));

      setOrder(data);
      setSuccessful(true);
    } catch (error) {
      setError(error.message || "An error occurred while verifying payment");
    }
  };

  // Call the verify payment function
  useEffect(() => {
    if (reference && session) {
      verifyPayment();
    }
  }, [reference, session]);

  // Copy to clipboard function
  const handleCopy = () => {
    setCopied(true);
    if (order.reference) {
      navigator.clipboard.writeText(order.reference);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "100vh" }}
    >
      {!successful && !error ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      {successful && !error ? (
        <div className="card text-center px-">
          <div ref={pdfRef} className="px-3 px-md-5 pt-5">
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
            {/* Order Id */}
            <p className="mb-1">
              <span className="fw-bold">Order ID: </span>
              {order.id}
            </p>
            {/* Amount */}
            <p className="mb-1">
              <span className="fw-bold">Amount: </span>
            </p>
            <h3 className="fw-bold">&#8358;{order.amount}</h3>

            {/* Payment ref */}
            <p className="mb-1">
              <span className="fw-bold">Payment Reference: </span>
            </p>
            <div className="text-primary">
              {order.reference}
              {copied ? (
                <FaCheck className="h6 ms-2 text-success" />
              ) : (
                <FaRegClipboard
                  className="h6 ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopy}
                />
              )}
            </div>
            <div className="px-3 mt-2 text-primary">
              Copy the payment reference to clipboard to track your order
            </div>
          </div>

          <div className="my-3 mb-5">
            <div>
              <Link
                href={"/dashboard/my-orders"}
                className="btn btn-primary shadow-none rounded px-5"
              >
                View your Orders <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
            <button
              className="btn btn-accent-secondary my-3 mb-3 py-2 px-5 mb-md-0 rounded"
              style={{
                color: "var(--secondary)",
                fontSize: "15px",
                borderRadius: "25px",
              }}
              onClick={savePdf}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Downloading...</span>
                </div>
              ) : (
                "Save Receipt as PDF"
              )}
            </button>
          </div>
        </div>
      ) : null}

      {error && (
        <div className="card p-4">
          <div className="alert alert-danger mt-4">{error}</div>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/dashboard/services")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCompleted;
