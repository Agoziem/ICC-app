"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { OrganizationContext } from "./Organizationalcontextdata";
import { converttoformData } from "@/utils/formutils";

// Create the context
const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const { organizationID } = useContext(OrganizationContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // ---------------------------------------
  // Fetch all products and paginate them
  // ---------------------------------------
  const fetchProducts = async (organizationID, page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/products/${organizationID}/?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data.results);
        setProducts(data.results);
        setTotalProducts(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching products" };
    }
  };

  // ---------------------------------------
  // Fetch by category and paginate them
  // ---------------------------------------
  const fetchProductsByCategory = async (category, page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/products/${organizationID}/?category=${category}&page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.results);
        setTotalProducts(data.count);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching products" };
    }
  };

  // ---------------------------------------
  // Fetch a single product by ID
  // ---------------------------------------
  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/product/${id}/`
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching product" };
    }
  };

  // ---------------------------------------
  // Create a new product
  // ---------------------------------------
  const createProduct = async (product) => {
    setLoading(true);
    const formData = converttoformData(product, ["category", "organization"]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/add-product/${organizationID}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        setLoading(false);
        return { type: "success", message: "Product added successfully " };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error adding product" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error adding product" };
    }
  };

  // ---------------------------------------
  // Update an existing product
  // ---------------------------------------

  const updateProduct = async (id, updatedProduct) => {
    setLoading(true);
    const formData = converttoformData(updatedProduct, [
      "category",
      "organization",
    ]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/update-product/${id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const updatedProduct = await response.json();
        const updatedProducts = products.map((product) =>
          product.id === id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setLoading(false);
        return { type: "success", message: "Product updated successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error updating product  " };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error updating product " };
    }
  };

  // ---------------------------------------
  // Delete a product
  // ---------------------------------------
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/delete-product/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        setLoading(false);
        return { type: "success", message: "Product deleted successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error deleting product" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error deleting product" };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        fetchProductById,
        fetchProductsByCategory,
        createProduct,
        updateProduct,
        deleteProduct,
        loading,
        totalPages,
        totalProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
