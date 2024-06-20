"use client";
import Datatable from "@/components/Datatable/Datatable";
import PageTitle from "@/components/PageTitle/PageTitle";
import OrderTableItems from "@/components/orders/OrderTableItems";
import { useAdminContext } from "@/data/Admincontextdata";
import React, { useEffect, useState } from "react";

const PaymentsPage = () => {
  const { orders } = useAdminContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(orders);
  }, [orders]);
  return (
    <div style={{minHeight:"100vh"}}>
      <PageTitle pathname="Payments" />
      <div className="mt-4">
        <h3>Payment History</h3>
        <Datatable items={items} setItems={setItems}>
          <OrderTableItems />
        </Datatable>
      </div>
    </div>
  );
};

export default PaymentsPage;
