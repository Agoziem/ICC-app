import React, { useState, useEffect } from "react";
import TopSellingItem from "./TopSellingItem";
import "./topSelling.css";
import Link from "next/link";
import { useServiceContext } from "@/data/Servicescontext";

function TopSelling() {
 const { services } = useServiceContext();


  return (
    <div className="card top-selling overflow-auto p-3">
      <div className="card-body pb-0">
        <h6 className=" pb-2">
          Services & Products <span>| Top Selling</span>
        </h6>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Services</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {services && services.length > 0 ? (
              services
                .slice(0, 10)
                .map((item) => <TopSellingItem key={item.id} item={item} />)
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center fw-bold mb-1 py-4">
                      No Services Available
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {services && services.length > 0 ? (
          <Link href={"/dashboard/services"} className="text-secondary  my-3">
            See more Services
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default TopSelling;
