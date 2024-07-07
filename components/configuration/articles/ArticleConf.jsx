"use client";
import React, { useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticleList from "./ArticleList";
import { useArticleContext } from "@/data/Articlescontextdata";
import { useSession } from "next-auth/react";
import ArticleCategoryForm from "./ArticleCategoryForm";

const ArticleConf = () => {
  const { articles, setArticles, categories, setCategories } =
    useArticleContext();
  const { data: session } = useSession();
  const [article, setArticle] = useState({
    id: null,
    img: null,
    img_url: null,
    img_name: "",
    title: "",
    subtitle: "",
    body: "",
    tags: [],
    slug: "",
    category: "",
    readTime: 0,
  });
  const [editMode, setEditMode] = useState(false);


  return (
    <div className="row mt-4 justify-content-between">
      <div className="col-12 col-md-8">
        <div>
          <ArticleCategoryForm
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <ArticleForm
          session={session}
          article={article}
          setArticle={setArticle}
          editMode={editMode}
          setEditMode={setEditMode}
          articles={articles}
          setArticles={setArticles}
          categories={categories}
        />
      </div>
      <div className="col-12 col-md-4">
        <ArticleList
          articles={articles}
          setArticles={setArticles}
          article={article}
          setArticle={setArticle}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>
    </div>
  );
};

export default ArticleConf;
