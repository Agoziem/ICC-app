// types.d.ts
import { blogSchema, categorySchema, commentSchema, tagSchema } from "@/schemas/articles";

declare global {
  type Tag = z.infer<typeof tagSchema>;

  type Tags = Tag[];

  type ArticleCategory = z.infer<typeof categorySchema>;

  type ArticleCategories = ArticleCategory[];

  type Blog = z.infer<typeof blogSchema>;

  type Blogs = Blog[];

  type Comment = z.infer<typeof commentSchema>;

  type Comments = Comment[]
}

export {};
