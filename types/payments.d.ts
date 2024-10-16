// types.d.ts
import { CustomerSchema, orderSchema, ordersReportSchema } from "@/schemas/payments";
import { z } from "zod";
declare global {
  type Order = z.infer<typeof orderSchema>;

  type Orders = Order[];

  type Customers = z.infer<typeof CustomerSchema>[]

  type OrderReport = z.infer<typeof ordersReportSchema>
  
}

export {};
