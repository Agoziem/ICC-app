import React from "react";
import Image from "next/image";

const ServiceCard = ({ item, onEdit, onDelete }) => (
  <div className="col-12 col-md-4">
    <div className="card p-3 py-4">
      <div className="d-flex justify-content-center align-items-center">
        {item.img_url ? (
          <Image
            src={item.img_url}
            alt="Services"
            width={100}
            height={100}
            className="me-3"
            style={{
              maxWidth: "60px",
              maxHeight: "60px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <div
            className="p-3 d-flex justify-content-center align-items-center me-3"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "var(--bgDarkColor)",
            }}
          >
            <i className="bi bi-google-play h4 text-primary m-0"></i>
          </div>
        )}

        <div className="flex-fill py-2">
          <h6>{item.name}</h6>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <span className="fw-bold text-primary">
              &#8358;{parseFloat(item.price)}
            </span>
            <div>
              <button
                className="btn btn-sm btn-accent-secondary rounded py-1 px-3 me-2"
                onClick={() => onEdit(item)}
              >
                edit
              </button>
              <button
                className="btn btn-sm btn-danger rounded py-1 px-3"
                onClick={() => onDelete(item)}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ServiceCard;
