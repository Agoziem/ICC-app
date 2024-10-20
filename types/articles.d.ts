// types.d.ts
import { ArticleResponseSchema, ArticleSchema, categorySchema, commentSchema, tagSchema } from "@/schemas/articles";
import { z } from "zod";

declare global {
  type Tag = z.infer<typeof tagSchema>;

  type Tags = Tag[];

  type ArticleCategory = z.infer<typeof categorySchema>;

  type ArticleCategories = ArticleCategory[];

  type Article = z.infer<typeof ArticleSchema>;

  type ArticlesResponse = z.infer<typeof ArticleResponseSchema>;

  type Articles = Article[];

  type ArticleComment = z.infer<typeof commentSchema>;

  type ArticleComments = ArticleComment[]
}

export {};
