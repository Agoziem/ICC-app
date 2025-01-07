"use client";
import { useQuery } from "react-query";
import { getOrderReport } from "@/data/payments/fetcher"; // Adjust the path as needed

export const useOrderReport = () => {
  return useQuery(
    ["orderReport"], // Unique query key
    getOrderReport,  // Fetcher function
  );
};
