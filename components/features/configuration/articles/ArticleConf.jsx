"use client";
import React, { useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticleList from "./ArticleList";
import { useArticleContext } from "@/data/articles/Articlescontextdata";
import { useSession } from "next-auth/react";
import ArticleCategoryForm from "./ArticleCategoryForm";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { articleAPIendpoint, fetchArticles, fetchArticlesCategories } from "@/data/articles/fetcher";

const ArticleConf = () => {
  // const {
    // articles,
    // setArticles,
    // fetchArticles,
    // categories,
    // setCategories,
    // loading,
    // totalPages,
    // totalArticles,
  // } = useArticleContext();
  
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [allCategories, setAllCategories] = useState([]);
  const { data: session } = useSession();
  const [editMode, setEditMode] = useState(false);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [article,setArticle] = useState(null)

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoryError,
    mutate: categoriesmutate
  } = useSWR(`${articleAPIendpoint}/getCategories/`, fetchArticlesCategories);

  const {
    data: articles,
    isLoading: loadingArticles,
    error: articleError,
    mutate: articlesmutate
  } = useSWR(
    `${articleAPIendpoint}/orgblogs/${Organizationid}/?category=${currentCategory}&page=${page}&page_size=${pageSize}`,
    fetchArticles
  );

  return (
    <div className="row mt-4 justify-content-between">
      <div className="col-12 col-md-8">
        <div>
          <ArticleCategoryForm
            categories={categories}
            mutate = {categoriesmutate}
          />
        </div>
        <ArticleForm
          session={session}
          article={article}
          setArticle={setArticle}
          editMode={editMode}
          setEditMode={setEditMode}
          articles={articles}
          mutate = {articlesmutate}
          categories={categories}
        />
      </div>
      <div className="col-12 col-md-4">
        <ArticleList
          articles={articles}
          article={article}
          setArticle={setArticle}
          editMode={editMode}
          setEditMode={setEditMode}
          loading={loadingArticles}
          currentPage={page}
          pageSize ={pageSize}
        />
      </div>
    </div>
  );
};

export default ArticleConf;
