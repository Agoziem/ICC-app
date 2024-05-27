"use client";
import React from "react";
import { useSession } from "next-auth/react";
import PageTitle from "@/components/PageTitle/PageTitle";
import DashboardBody from "@/components/dashboard/dashboard";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <PageTitle pathname="Dashboard" />
      <DashboardBody />
    </div>
  );
};

export default Dashboard;
