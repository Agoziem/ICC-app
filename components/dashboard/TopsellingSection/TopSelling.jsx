import React, { useState, useEffect, useContext } from "react";
import "./topSelling.css";
import Link from "next/link";
import { useServiceContext } from "@/data/Servicescontext";
import { useProductContext } from "@/data/Productcontext";
import { useVideoContext } from "@/data/Videoscontext";
import TopSellingService from "./TopSellingService";
import TopSellingVideo from "./TopSellingVideo";
import TopSellingProduct from "./TopSellingProduct";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { RiShoppingBasketFill } from "react-icons/ri";
import { FaVideo } from "react-icons/fa6";

function TopSelling({ itemName }) {
  const { services, fetchServices, totalServices } = useServiceContext();
  const { products, fetchProducts, totalProducts } = useProductContext();
  const { videos, fetchVideos, totalVideos } = useVideoContext();
  const [topSelling, setTopSelling] = useState([]);
  const { OrganizationData } = useContext(OrganizationContext);

  useEffect(() => {
    if (OrganizationData.id) {
      if (itemName === "Services") {
        fetchServices(OrganizationData.id, 1, 6);
      } else if (itemName === "Products") {
        fetchProducts(OrganizationData.id, 1, 6);
      } else if (itemName === "Videos") {
        fetchVideos(OrganizationData.id, 1, 6);
      }
    }
  }, [OrganizationData.id]);

  useEffect(() => {
    if (itemName === "Services") {
      setTopSelling(services);
    } else if (itemName === "Products") {
      setTopSelling(products);
    } else if (itemName === "Videos") {
      setTopSelling(videos);
    }
  }, [services, products, videos]);

  return (
    <div className="card top-selling overflow-auto p-3">
      <div className="card-body pb-0">
        <div className="d-flex align-items-center mb-3">
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center ${
              itemName === "Services"
                ? "bg-primary-light"
                : itemName === "Products"
                ? "bg-secondary-light"
                : "bg-success-light"
            }`}
            style={{
              width: "48px",
              height: "48px",
              fontSize: "1.2rem",
              flexShrink: 0,
            }}
          >
            {itemName === "Services" ? (
              <i className="bi bi-person-fill-gear  mb-0 text-primary"></i>
            ) : itemName === "Products" ? (
              <RiShoppingBasketFill className={" mb-0 text-secondary"} />
            ) : (
              <FaVideo className={" mb-0 text-success"} />
            )}
          </div>
          <h6 className="ms-3">
            {itemName} <span>| Recent {itemName}</span>
          </h6>
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">
                {itemName === "Services"
                  ? "Preview"
                  : itemName === "Products"
                  ? "Preview"
                  : "Thumbnail"}
              </th>
              <th scope="col">
                {itemName === "Services"
                  ? "Service"
                  : itemName === "Products"
                  ? "Product"
                  : "Video"}
              </th>

              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {topSelling && topSelling.length > 0 ? (
              topSelling.slice(0, 6).map((item) => {
                if (itemName === "Services") {
                  return <TopSellingService key={item.id} item={item} />;
                } else if (itemName === "Products") {
                  return <TopSellingProduct key={item.id} item={item} />;
                } else {
                  return <TopSellingVideo key={item.id} item={item} />;
                }
              })
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center fw-bold mb-1 py-4">
                      No {itemName} Available
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {(itemName === "Services"
          ? totalServices
          : itemName === "Products"
          ? totalProducts
          : totalVideos) > 6 ? (
          <Link
            href={`/dashboard/${
              itemName === "Services"
                ? "services"
                : itemName === "Products"
                ? "products"
                : "videos"
            }`}
            className="text-secondary  my-3"
          >
            See more {itemName}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default TopSelling;
