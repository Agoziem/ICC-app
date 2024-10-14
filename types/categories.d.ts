// types.d.ts
import {
  categorySchema,
  categoryArraySchema,
  subcategorySchema,
} from "@/schemas/categories";
import { z } from "zod";

declare global {
  type Category = z.infer<typeof categorySchema>;

  type Categories = Category[];

  type SubCategory = z.infer<typeof subcategorySchema>;

  type SubCategories = SubCategory[];
}

export {};
