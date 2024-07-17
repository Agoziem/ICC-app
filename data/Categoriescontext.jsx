"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { OrganizationContext } from "./Organizationalcontextdata";

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const { OrganizationData } = useContext(OrganizationContext);
  const [servicecategories, setServiceCategories] = useState([]);
  const [productcategories, setProductCategories] = useState([]);
  const [videoCategories, setVideoCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (OrganizationData.id) {
      fetchServicesCategories();
      fetchProductCategories();
      fetchVideoCategories();
    }
  }, [OrganizationData]);

  const fetchServicesCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/categories/`
      );
      if (response.ok) {
        const data = await response.json();
        setServiceCategories(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/productsapi/categories/`
      );
      if (response.ok) {
        const data = await response.json();
        setProductCategories(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/categories/`
      );
      if (response.ok) {
        const data = await response.json();
        setVideoCategories(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        servicecategories,
        setServiceCategories,
        productcategories,
        setProductCategories,
        videoCategories,
        setVideoCategories,
        loading,
        error,
        success,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};

export { CategoriesProvider, useCategoriesContext };
