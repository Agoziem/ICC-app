import React, { useState, useEffect } from "react";
import TopSellingItem from "./TopSellingItem";
import "./topSelling.css";
import { useAdminContext } from "@/data/Admincontextdata";
import Link from "next/link";

function TopSelling() {
  const { services } = useAdminContext();

  return (
    <div className="card top-selling overflow-auto p-3">
      <div className="card-body pb-0">
        <h5 className="card-title pb-2">
          Services & Products <span>| Top Selling</span>
        </h5>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Services</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.length > 0 &&
              services
                .slice(0, 10)
                .map((item) => <TopSellingItem key={item.id} item={item} />)}
          </tbody>
        </table>
        <Link href={"/dashboard/services"} className="btn bg-primary-light btn-primary rounded  my-3">See more Services</Link>
      </div>
    </div>
  );
}

export default TopSelling;
