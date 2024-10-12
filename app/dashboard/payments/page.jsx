"use client";
import Datatable from "@/components/custom/Datatable/Datatable";
import PageTitle from "@/components/custom/PageTitle/PageTitle";
import OrderTableItems from "@/components/features/orders/OrderTableItems";
import { useAdminContext } from "@/data/users/Admincontextdata";
import React, { useEffect, useState } from "react";

const PaymentsPage = () => {
  const { orders } = useAdminContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(orders);
  }, [orders]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Payments" />
      <div className="mt-4">
        <h5>Payment History</h5>

        <Datatable
          items={items}
          setItems={setItems}
          label={"Payments"}
          filteritemlabel={"reference"}
        >
          <OrderTableItems />
        </Datatable>
      </div>
    </div>
  );
};

export default PaymentsPage;
