"use client";
import { useCart } from "@/data/carts/Cartcontext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useUserContext } from "@/data/payments/usercontextdata";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import useJsxToPdf from "@/hooks/useJSXtoPDF";
import { FaCheck, FaRegClipboard } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { paymentsAPIendpoint, verifyPayment } from "@/data/payments/fetcher";
import { BeatLoader } from "react-spinners";

const OrderCompleted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") || "";
  const { mutate: userordersmutate } = useUserContext();
  const { mutate: ordersmutate } = useAdminContext();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  /** @type {[Order,(value:Order) => void]} */
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { loading: loadingPdf, generatePdf } = useJsxToPdf();
  const pdfRef = useRef();
  const { data: session } = useSession();

  const savePdf = async () => {
    await generatePdf(pdfRef.current, "Order-Receipt");
  };

  // -------------------------------
  // Verify payment function
  // -------------------------------
  const verifypayment = useCallback(async () => {
    if (!reference) {
      setError("Reference does not exist");
      return;
    }

    console.log(
      "Verifying payment with reference:",
      reference,
      session?.user?.id
    ); // Add this for debugging
    try {
      const data = await verifyPayment(
        `${paymentsAPIendpoint}/verifypayment/`,
        { reference, customer_id: parseInt(session?.user?.id) }
      );

      ordersmutate(
        (previousOrders = []) => {
          const orderExists = previousOrders.find((o) => o.id === data.id);
          if (orderExists) {
            return previousOrders.map((o) => (o.id === data.id ? data : o));
          }
          return [...previousOrders, data];
        },
        { populateCache: true, revalidate: false }
      );

      userordersmutate(
        (previousOrders = []) => {
          const orderExists = previousOrders.find((o) => o.id === data.id);
          if (orderExists) {
            return previousOrders.map((o) => (o.id === data.id ? data : o));
          }
          return [...previousOrders, data];
        },
        { populateCache: true, revalidate: false }
      );
      
      setOrder(data);
      setSuccess("Your Payment has been Verified");
    } catch (error) {
      console.error("Error verifying payment:", error); // Add this for debugging

      ordersmutate(
        (previousOrders = []) =>
          previousOrders.map((o) =>
            o.reference === reference ? { ...o, status: "Failed" } : o
          ),
        { populateCache: true, revalidate: false }
      );

      userordersmutate(
        (previousOrders = []) =>
          previousOrders.map((o) =>
            o.reference === reference ? { ...o, status: "Failed" } : o
          ),
        { populateCache: true, revalidate: false }
      );

      setError(error.message || "An error occurred while verifying payment");
    } finally {
      setLoading(false);
    }
  }, [reference, session]);

  useEffect(() => {
    if (session && reference) {
      verifypayment();
    }
  }, [verifypayment, session, reference]);

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
      {!success && !error ? (
        <BeatLoader color="#12000d" loading={loading} />
      ) : null}

      {success && order ? (
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
