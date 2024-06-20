"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/data/Cartcontext";
import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const { data: session } = useSession();
  const { cart, total, reference, resertCart } = useCart();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const router = useRouter();
  const amount = total * 100;
  const name = session?.user.username;
  const email = session?.user.email;
  const handleSuccess = () => {
    resertCart();
    router.push(`/dashboard/orders/completed`);
  };

  const componentProps = {
    email,
    amount,
    reference,
    metadata: {
      name,
    },
    publicKey,
    text: "Complete Payment",
    onSuccess: () => handleSuccess(),
    onclose: () => console.log("closed"),
  };
  return (
    <section className="pt-5" style={{minHeight:"100vh"}}>
      <div
        className="card p-4 mx-auto"
        style={{
          maxWidth: "500px",
        }}
      >
        <div className="row">
          <div className="col-12">
            <h4 className="text-center">Order Page</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={{ background:"var(--bgLighterColor)",borderColor:"var(--bgDarkColor)"}}>
                <div className="py-2 fw-bold">Services Order</div>
              </li>
              <li className="list-group-item text-primary" style={{ background:"var(--bgLighterColor)",borderColor:"var(--bgDarkColor)"}}>
                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id}>
                      <span>
                        <i className="bi bi-check2-circle me-3 h5 text-secondary fw-bold"></i>
                        {item.name}
                      </span>
                      <span className="float-md-end ms-3 fw-bold">
                        &#8358;{item.price}
                      </span>
                    </div>
                  ))
                ) : (
                  <span>No items to order</span>
                )}
              </li>
              <li className="list-group-item" style={{ background:"var(--bgLighterColor)",borderColor:"var(--bgDarkColor)"}}>
                Total Amount to pay
                <span className="float-md-end ms-3 fw-bold">&#8358;{total}</span>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <PaystackButton
                {...componentProps}
                className="btn btn-primary w-100 mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
