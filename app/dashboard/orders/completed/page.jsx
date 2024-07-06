"use client";
import { useCart } from "@/data/Cartcontext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAdminContext } from "@/data/Admincontextdata";
import { useUserContext } from "@/data/usercontextdata";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useJsxToPdf from "@/hooks/useJSXtoPDF";
import { FaCheck, FaRegClipboard } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import { OrganizationContext } from "@/data/Organizationalcontextdata";

const OrderCompleted = () => {
  const router = useRouter();
  const { reference } = useCart();
  const { updateUserOrder } = useUserContext();
  const { updateOrder } = useAdminContext();
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});
  const [copied, setCopied] = useState(false);
  const [loading, generatePdf] = useJsxToPdf();
  const pdfRef = useRef();
  const { OrganizationData } = useContext(OrganizationContext);

  const savePdf = async () => {
    await generatePdf(pdfRef.current, "Order-Receipt");
  };

  const message = `Hello, I just made a payment to ${OrganizationData?.name} with payment reference of ${order?.reference}. I would like to verify my order.`;

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
        updateOrder(data);
        updateUserOrder(data);
        setError("An error occurred while verifying payment");
      }
      const data = await response.json();
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

  // ---------------------------------------------------------------------
  // copy to clipboard function
  // ----------------------------------------------------------------------
  const handleCopy = () => {
    setCopied(true);
    if (order.reference) navigator.clipboard.writeText(order.reference);
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

      {successful ? (
        <div className="card text-center px-4">
          <div ref={pdfRef} className="px-5 pt-5">
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
              <div className="fw-bold">Payment Reference: </div>
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
            </p>
          </div>

          <div className="my-3 mb-5">
            <div>
              <div
                className="badge bg-secondary-light py-3 px-4 me-3 mb-3 mb-md-0"
                style={{
                  cursor: "pointer",
                  color: "var(--secondary)",
                  fontSize: "15px",
                  borderRadius: "25px",
                }}
                onClick={savePdf}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">downloading...</span>
                  </div>
                ) : (
                  "Save Receipt"
                )}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  router.push("/dashboard/services");
                }}
              >
                Continue Shopping
              </button>
            </div>
            <div className="px-3 my-2 mt-4">
              copy the payment reference to clipboard to track your order
            </div>
            <Link href={`${OrganizationData?.whatsapplink}?text=${encodeURIComponent(message)}` || "#"} target="_blank" className="btn btn-accent-primary shadow-none rounded px-5">
              <IoLogoWhatsapp className={"h4 mb-1 me-2"} />
              chat on whatsapp
            </Link>
          </div>
        </div>
      ) : null}

      {error && (
        <div className="card p-4">
          <div className="alert alert-danger mt-4">{error}</div>
          <button
            className="btn btn-primary"
            onClick={() => {
              router.push("/dashboard/services");
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
