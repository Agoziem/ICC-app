"use client";
import React from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import DashboardBody from "@/components/dashboard/dashboard";

const Dashboard = () => {
  
  return (
    <div>
      <PageTitle pathname="Dashboard" />
      <DashboardBody />
    </div>
  );
};

export default Dashboard;
