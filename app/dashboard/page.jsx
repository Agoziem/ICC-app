"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import PageTitle from "@/components/PageTitle/PageTitle";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <PageTitle pathname="Dashboard" />
    </div>
  );
};

export default Dashboard;
