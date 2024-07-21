import { useUserContext } from "@/data/usercontextdata";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";
import ProductPlaceholder from "../ImagePlaceholders/Productplaceholder";
import Link from "next/link";

const UserProducts = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();
  const [product, setProduct] = useState("");
  const [paidProducts, setPaidProducts] = useState([]);

  useEffect(() => {
    if (userOrder.length > 0 && session?.user?.id) {
      const userId = parseInt(session.user.id);
      const allpaidProducts = userOrder.flatMap((order) =>
        order.products.filter((product) =>
          product.userIDs_that_bought_this_product.includes(userId)
        )
      );
      setPaidProducts(allpaidProducts);
    }
  }, [userOrder, session]);
  //   {
  //     "id": 3,
  //     "organization": {
  //         "id": 1,
  //         "name": "Innovations Cybercafe"
  //     },
  //     "preview": "/media/products/SUZIEYGDIAMOND_7881979b-2b78-47ea-8fa4-af9d4e73eaf5_1024x_1.webp",
  //     "img_url": "http://127.0.0.1:8000/media/products/SUZIEYGDIAMOND_7881979b-2b78-47ea-8fa4-af9d4e73eaf5_1024x_1.webp",
  //     "img_name": "SUZIEYGDIAMOND_7881979b-2b78-47ea-8fa4-af9d4e73eaf5_1024x_1.webp",
  //     "product": "/media/products/Paystack_Merchant_Service_Agreement_1239837.pdf",
  //     "product_url": "http://127.0.0.1:8000/media/products/Paystack_Merchant_Service_Agreement_1239837.pdf",
  //     "product_name": "Paystack_Merchant_Service_Agreement_1239837.pdf",
  //     "category": {
  //         "id": 1,
  //         "category": "Jamb",
  //         "description": null
  //     },
  //     "name": "AI Tutor for Exam Preparations",
  //     "description": "No description available",
  //     "price": "2500.00",
  //     "rating": 0,
  //     "product_token": "eddc95530ca84141bafb2a3bdd0d695d",
  //     "number_of_times_bought": 1,
  //     "digital": true,
  //     "created_at": "2024-05-29T10:03:26.614597Z",
  //     "last_updated_date": "2024-07-19T20:56:52.716697Z",
  //     "free": false,
  //     "userIDs_that_bought_this_product": [
  //         1
  //     ]
  // }

  return (
    <div className="row">
      <h4 className="my-3">Products Purchased</h4>
      {paidProducts.length > 0 ? (
        paidProducts.map((product) => (
          <div key={product.id} className="col-12 col-md-4">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  {product.preview ? (
                    <img
                      src={product.img_url}
                      alt="products"
                      width={68}
                      height={68}
                      className="rounded-circle object-fit-cover"
                      style={{ objectPosition: "center" }}
                    />
                  ) : (
                    <ProductPlaceholder />
                  )}
                </div>
                <div className="flex-fill">
                  <h6 className="text-capitalize">{product.name}</h6>
                  <p className="text-capitalize mb-1">
                    {product.description.length > 80 ? (
                      <span>{product.description.substring(0, 80)}... </span>
                    ) : (
                      product.description
                    )}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="small mb-1">
                      {product.category.category} Product
                    </p>
                    <div
                      className="badge bg-primary py-2 px-2"
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        href={product.product_url || "#"}
                        target="_blank"
                        className="text-light"
                      >
                        view product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <PiEmptyBold
            className="mt-2"
            style={{ fontSize: "6rem", color: "var(--bgDarkerColor)" }}
          />
          <h4>Products</h4>
          <p>you have not purchased any Products so far</p>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
