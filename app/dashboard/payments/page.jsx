"use client";
import Datatable from "@/components/custom/Datatable/Datatable";
import PageTitle from "@/components/custom/PageTitle/PageTitle";
import OrderTableItems from "@/components/features/orders/OrderTableItems";
import { fetchPayments, paymentsAPIendpoint } from "@/data/payments/fetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const PaymentsPage = () => {
  /**
   * @type {[Orders,(value:Orders) => void]}
   */
  const [items, setItems] = useState([]);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  const { data: orders } = useSWR(
    `${paymentsAPIendpoint}/payments/${Organizationid}`,
    fetchPayments,
    {
      onSuccess: (data) =>
        data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }
  );

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
