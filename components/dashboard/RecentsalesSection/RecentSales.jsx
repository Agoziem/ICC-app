import React, { useState, useEffect } from "react";
import CardFilter from "../Card/CardFilter";
import RecentSalesTable from "./RecentSalesTable";
import "./recentSales.css";
import { useAdminContext } from "@/data/users/Admincontextdata";
import { useUserContext } from "@/data/users/usercontextdata";

function RecentSales({ session }) {
  const { orders } = useAdminContext();
  const { userOrder } = useUserContext();
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="card recent-sales overflow-auto p-3">
      <div className="d-flex justify-content-end pe-4">
        <CardFilter filterChange={handleFilterChange} />
      </div>
      <div className="card-body">
        <h6 className="pb-3">
          Recent Orders
          <span>| {filter}</span>
        </h6>
        {session?.user?.is_staff ? (
          <RecentSalesTable items={orders} session={session} />
        ) : null}

        {!session?.user?.is_staff ? (
          <RecentSalesTable items={userOrder} session={session} />
        ) : null}
      </div>
    </div>
  );
}

export default RecentSales;
