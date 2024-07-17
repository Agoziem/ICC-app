import React from "react";
import ProductPlaceholder from "../ImagePlaceholders/Productplaceholder";

// [
  // //     //     {
  //   "id": 3,
  //   "organization": {
  //     "id": 1,
  //     "name": "Innovations Cybercafe"
  //   },
  //   "preview": null,
  //   "img_url": null,
  //   "img_name": null,
  //   "product": null,
  //   "product_url": null,
  //   "product_name": null,
  //   "category": {
  //     "id": 1,
  //     "category": "Jamb",
  //     "description": null
  //   },
  //   "name": "AI Tutor for Exam Preparations",
  //   "description": "No description available",
  //   "price": "2500.00",
  //   "rating": 0,
  //   "product_token": "eddc95530ca84141bafb2a3bdd0d695d",
  //   "digital": true,
  //   "created_at": "2024-05-29T10:03:26.614597Z",
  //   "last_updated_date": "2024-07-16T04:50:08.986147Z",
  //   "free": false,
  //   "userIDs_that_bought_this_product": []
  // },
  //   ]

  
const ProductCard = ({
  product,
  openModal,
  cart,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="card p-4 py-4">
      <div className="d-flex align-items-center">
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

        <div
          className="flex-fill d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <h6 className="flex-grow-1">{product.name}</h6>
          <p className="text-primary mb-1">
            {product.description.length > 80 ? (
              <span>
                {product.description.substring(0, 80)}...{" "}
                <span
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(product)}
                >
                  view more
                </span>
              </span>
            ) : (
                product.description
            )}
          </p>
          <div className="d-flex justify-content-between mt-3 flex-wrap">
            <span className="fw-bold text-primary me-2">
              &#8358;{parseFloat(product.price)}
            </span>

            <div className="me-2 me-md-3">
              {cart.find((item) => item.id === product.id) ? (
                <span
                  className="badge bg-secondary-light text-secondary p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromCart(product.id)}
                >
                  remove product {"  "}
                  <i className="bi bi-cart-dash"></i>
                </span>
              ) : (
                <span
                  className="badge bg-success-light text-success p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => addToCart(product)}
                >
                  Add product {"  "}
                  <i className="bi bi-cart-plus"></i>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
