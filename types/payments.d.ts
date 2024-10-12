// types.d.ts
import { ordersSchema } from "@/schemas/payments";

declare global {
  type Order = z.infer<typeof ordersSchema>;

  type Orders = Order[];
}

export {};
