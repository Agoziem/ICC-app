// types.d.ts
import { categoryArraySchema, subcategorySchema } from "@/schemas/categories";
import { z } from "zod";
declare global {
  type Category = z.infer<typeof categoryArraySchema>;

  type Categories = Category[];

  type SubCategory = z.infer<typeof subcategorySchema>;

  type SubCategories = SubCategory[];
}

export {};
