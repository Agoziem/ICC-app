"use client";
import React, { useState } from "react";
import UserServices from "./UserServices";
import UserProducts from "./UserProducts";
import UserVideos from "./UserVideos";

const UserOrders = () => {
  const categories = ["services", "products", "videos"];
  const [activeTab, setActiveTab] = useState(categories[0]);
  return (
    <div className="mt-4">
      {categories.map((category) => (
        <div
          key={category}
          className={`badge rounded-5 px-4 py-2 me-2 mb-2 mb-md-0`}
          style={{
            color:
              activeTab === category ? "var(--secondary)" : "var(--primary)",
            backgroundColor:
              activeTab === category ? "var(--secondary-300)" : " ",
            border:
              activeTab === category
                ? "1.5px solid var(--secondary)"
                : "1.5px solid var(--bgDarkerColor)",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab(category)}
        >
          {category}
        </div>
      ))}

      {/* Calculators */}
      <div className="mt-4">
        {activeTab === "services" && <div><UserServices /></div>}
        {activeTab === "products" && <div><UserProducts /></div>}
        {activeTab === "videos" && <div><UserVideos /></div>}
      </div>
    </div>
  );
};

export default UserOrders;
