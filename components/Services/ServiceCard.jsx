import React from "react";
import ServicesPlaceholder from "@/components/ImagePlaceholders/ServicesPlaceholder";
// {
//   "id": 14,
//   "organization": {
//     "id": 1,
//     "name": "Innovations Cybercafe"
//   },
//   "preview": null,
//   "img_url": null,
//   "img_name": null,
//   "category": {
//     "id": 1,
//     "category": "Olevel",
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur"
//   },
//   "subcategory": null,
//   "name": "Testing2",
//   "description": "Testing and one and two",
//   "service_flow": "None",
//   "price": "3000.00",
//   "number_of_times_bought": 0,
//   "created_at": "2024-07-02T07:56:30.761707Z",
//   "updated_at": "2024-07-16T17:14:16.796299Z",
//   "userIDs_that_bought_this_service": []
// },
const ServiceCard = ({
  service,
  openModal,
  cart,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="card p-4 py-4">
      <div className="d-flex align-items-center">
        <div className="me-3">
          {service.preview ? (
            <img
              src={service.img_url}
              alt="services"
              width={68}
              height={68}
              className="rounded-circle object-fit-cover"
              style={{ objectPosition: "center" }}
            />
          ) : (
            <ServicesPlaceholder />
          )}
        </div>

        <div
          className="flex-fill d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <h6 className="flex-grow-1">{service.name}</h6>
          <p className="text-primary mb-1">
            {service.description.length > 80 ? (
              <span>
                {service.description.substring(0, 80)}...{" "}
                <span
                  className="text-secondary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(service)}
                >
                  view more
                </span>
              </span>
            ) : (
              service.description
            )}
          </p>
          <div className="d-flex justify-content-between mt-3 flex-wrap">
            <span className="fw-bold text-primary me-2">
              &#8358;{parseFloat(service.price)}
            </span>

            <div className="me-2 me-md-3">
              {cart.find((item) => item.id === service.id) ? (
                <span
                  className="badge bg-secondary-light text-secondary p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromCart(service.id)}
                >
                  remove Service {"  "}
                  <i className="bi bi-cart-dash"></i>
                </span>
              ) : (
                <span
                  className="badge bg-success-light text-success p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => addToCart(service)}
                >
                  Add Service {"  "}
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

export default ServiceCard;
