import CategoriesForm from "@/components/features/Categories/Categories";

const ArticleCategoryForm = ({ categories,mutate }) => {
  return (
    <CategoriesForm
      items={categories}
      mutate={mutate}
      itemName="category"
      itemLabel="Category"
      addUrl={"/blogsapi/addCategory/"}
      updateUrl={"/blogsapi/updateCategory/"}
      deleteUrl={"/blogsapi/deleteCategory/"}
    />
  );
};

export default ArticleCategoryForm;
