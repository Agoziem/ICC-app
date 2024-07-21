"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { OrganizationContext } from './Organizationalcontextdata';

const ArticleContext = createContext();
const ArticleProvider = ({ children }) => {
  const { OrganizationData } = useContext(OrganizationContext);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/orgblogs/${OrganizationData.id}/?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/getCategories/`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (OrganizationData.id) {
      fetchArticles(currentPage, pageSize);
      fetchCategories();
    }
  }, [OrganizationData.id, currentPage]);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        setArticles,
        fetchArticles,
        categories,
        setCategories,
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

const useArticleContext = () => {
  return useContext(ArticleContext);
};

export { ArticleProvider, useArticleContext };
