"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const SubCategoriesContext = createContext();

const Subcategoriesprovider = ({ children }) => {
  const [videosubcategories, setVideoSubcategories] = useState([]);
  const [servicesubcategories, setServiceSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideoSubCategories = async (category_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/subcategories/${category_id}/`
      );
      if (response.ok) {
        const data = await response.json();
        setVideoSubcategories(data);
        return data;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceSubCategories = async (category_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/subcategories/${category_id}/`
      );
      if (response.ok) {
        const data = await response.json();
        setServiceSubcategories(data);
        return data;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SubCategoriesContext.Provider
      value={{
        videosubcategories,
        fetchVideoSubCategories,
        servicesubcategories,
        fetchServiceSubCategories,
        loading,
      }}
    >
      {children}
    </SubCategoriesContext.Provider>
  );
};

const useSubCategoriesContext = () => {
  return useContext(SubCategoriesContext);
};

export { useSubCategoriesContext, Subcategoriesprovider };
