import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchCategories,
  fetchSubCategories,
  createCategory,
  createSubCategory,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
} from "@/data/categories/fetcher";

// Context for CategoriesQuery
const CategoriesQueryContext = createContext(null);

// Provider Component
export const CategoriesQueryProvider = ({ children }) => {
  const queryClient = useQueryClient();

  return (
    <CategoriesQueryContext.Provider value={{ queryClient }}>
      {children}
    </CategoriesQueryContext.Provider>
  );
};

// Hook to access CategoriesQueryContext
const useCategoriesQueryContext = () => {
  const context = useContext(CategoriesQueryContext);
  if (!context) {
    throw new Error(
      "useCategoriesQueryContext must be used within a CategoriesQueryProvider"
    );
  }
  return context;
};

// Custom Hooks

/** Fetch all categories */
export const useFetchCategories = (url) =>
  useQuery(["categories", url], () => fetchCategories(url), {
    enabled: !!url,
  });

/** Fetch all subcategories */
export const useFetchSubCategories = (url, category_id) =>
  useQuery(["subcategories", category_id, url], () => fetchSubCategories(url), {
    enabled: !!url,
  });

/** Create a new category */
export const useCreateCategory = () => {
  const { queryClient } = useCategoriesQueryContext();
  return useMutation(
    /** @param {Category} data */
    (data) => createCategory(`/categories/create/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]); // Refresh the category list
      },
    }
  );
};

/** Create a new subcategory */
export const useCreateSubCategory = () => {
  const { queryClient } = useCategoriesQueryContext();
  return useMutation(
    /** @param {SubCategory} data */
    (data) => createSubCategory(`/subcategories/create/`, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["subcategories", data.category.id]); // Refresh the subcategory list
      },
    }
  );
};

/** Update a category */
export const useUpdateCategory = () => {
  const { queryClient } = useCategoriesQueryContext();
  return useMutation(
    /** @param {Category} data */
    (data) => updateCategory(`/categories/${data.id}/update/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]); // Refresh the category list
      },
    }
  );
};

/** Update a subcategory */
export const useUpdateSubCategory = () => {
  const { queryClient } = useCategoriesQueryContext();
  return useMutation(
    /** @param {SubCategory} data */
    (data) => updateSubCategory(`/subcategories/${data.id}/update/`, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["subcategories",data.category.id]); // Refresh the subcategory list
      },
    }
  );
};

/** Delete a category */
export const useDeleteCategory = () => {
  const { queryClient } = useCategoriesQueryContext();
  return useMutation(
    /** @param {number} id */
    (id) => deleteCategory(`/categories/${id}/delete/`, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]); // Refresh the category list
      },
    }
  );
};

/** Delete a subcategory */
export const useDeleteSubCategory = () => {
  const { queryClient } = useCategoriesQueryContext();

  return useMutation(
    /**
     * @param {{ id: number, category_id: number }} params 
     */
    ({ id, category_id }) => deleteSubCategory(`/subcategories/${id}/delete/`, id),
    {
      onSuccess: (_, { category_id }) => {
        queryClient.invalidateQueries(["subcategories", category_id]);
      },
    }
  );
};
