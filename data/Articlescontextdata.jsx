"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { OrganizationContext } from './Organizationalcontextdata';

const ArticleContext = createContext();
const ArticleProvider = ({ children }) => {
  const { OrganizationData } = useContext(OrganizationContext);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  // fetch Articles and Paginate it
  const fetchArticles = async (Organizationid,page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/orgblogs/${Organizationid}/?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.results);
        setTotalArticles(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // fetch Articles by Category and Paginate it 
  const fetchArticlesByCategory = async (category, page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/orgblogs/${OrganizationData.id}/?category=${category}&page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setArticles(data.results);
        setTotalArticles(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  // fetch Article by Slug
  const fetchArticleBySlug = async (slug) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/blogbyslug/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/getCategories/`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Articles and Categories on Organization Change
  useEffect(() => {
    if (OrganizationData.id) {
      fetchCategories();
    }
  }, [OrganizationData.id]);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        setArticles,
        fetchArticles,
        fetchArticlesByCategory,
        fetchArticleBySlug,
        categories,
        setCategories,
        loading,
        totalPages,
        totalArticles,
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
