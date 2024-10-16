// types.d.ts
import { ArticleSchema, categorySchema, commentSchema, tagSchema } from "@/schemas/articles";
import { z } from "zod";

declare global {
  type Tag = z.infer<typeof tagSchema>;

  type Tags = Tag[];

  type ArticleCategory = z.infer<typeof categorySchema>;

  type ArticleCategories = ArticleCategory[];

  type Article = z.infer<typeof ArticleSchema>;

  type Articles = Article[];

  type ArticleComment = z.infer<typeof commentSchema>;

  type ArticleComments = ArticleComment[]
}

export {};