"use client";
import React, { createContext, useContext, useEffect, useState } from 'react'
import { OrganizationContext } from './Organizationalcontextdata';

const ArticleContext = createContext();
const ArticleProvider = ({children}) => {
    const {OrganizationData} = useContext(OrganizationContext);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/orgblogs/${OrganizationData.id}/`);
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error(error);
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
    
    }

    useEffect(() => {
        if (OrganizationData.id) {
            fetchArticles();
            fetchCategories();
        };
    }, [OrganizationData.id]);

  return (
    <ArticleContext.Provider value={{
        articles,
        setArticles,
        fetchArticles,
        categories,
        setCategories,
    }}>
        {children}
    </ArticleContext.Provider>
  )
}

const useArticleContext = () => {
    return useContext(ArticleContext);
  };

export { ArticleProvider, useArticleContext}