// types.d.ts
import { ordersSchema } from "@/schemas/payments";
import { z } from "zod";
declare global {
  type Order = z.infer<typeof ordersSchema>;

  type Orders = Order[];
}

export {};
