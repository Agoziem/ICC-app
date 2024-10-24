// types.d.ts
import { productSchema, serviceSchema, UserPurchaseSchema, videoSchema } from "@/schemas/items";
import { z } from "zod";
declare global {
  type Service = z.infer<typeof serviceSchema>;

  type Services = Service[];

  type Product = z.infer<typeof productSchema>;

  type Products = Product[];

  type Video = z.infer<typeof videoSchema>;

  type Videos = Video[];

  type ServiceUser = z.infer<typeof UserPurchaseSchema>
}

export {};
