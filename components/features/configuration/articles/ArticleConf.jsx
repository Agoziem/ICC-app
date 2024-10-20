"use client";
import React, { useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticleList from "./ArticleList";
import { useSession } from "next-auth/react";
import ArticleCategoryForm from "./ArticleCategoryForm";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { articleAPIendpoint, fetchArticles, fetchArticlesCategories } from "@/data/articles/fetcher";
import { ArticleDefault } from "@/constants";
import { useForm } from "react-hook-form";

const ArticleConf = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const page = searchParams.get("page") || "1";
  const pageSize = "10";
  const [editMode, setEditMode] = useState(false);
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [article,setArticle] = useState(ArticleDefault)

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
          article={article}
          setArticle= {setArticle}
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
          mutate = {articlesmutate}
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
