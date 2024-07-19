import { useUserContext } from "@/data/usercontextdata";
import React from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";

const UserProducts = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();
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
    <div>
      {userOrder.length > 0 ? (
        userOrder.map((order) => {
          const paidProducts = order.products.filter((product) =>
            product.userIDs_that_bought_this_product.includes(
              parseInt(session?.user?.id)
            )
          );

          return (
            <div key={order.id}>
              {paidProducts.length > 0 ? (
                paidProducts.map((product) => (
                  <div key={product.id}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <PiEmptyBold
                    className="mt-2"
                    style={{
                      fontSize: "6rem",
                      color: "var(--bgDarkerColor)",
                    }}
                  />
                  <h4>Products</h4>
                  <p>No Products paid for this order</p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <PiEmptyBold
            className="mt-2"
            style={{
              fontSize: "6rem",
              color: "var(--bgDarkerColor)",
            }}
          />
          <h4>Orders</h4>
          <p>It seems you have not placed any orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
