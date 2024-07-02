import React from "react";
import CategoriesForm from "@/components/Categories/Categories";

const ArticleCategoryForm = ({ categories, setCategories }) => {
  return (
    <CategoriesForm
      items={categories}
      setItems={setCategories}
      itemName="category"
      itemLabel="Category"
      addUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/addCategory/`}
      updateUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/updateCategory`}
      deleteUrl={`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/deleteCategory`}
    />
  );
};

export default ArticleCategoryForm;
