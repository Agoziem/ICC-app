"use client";
import React, { useEffect, useState } from "react";
import ArticleForm from "./ArticleForm";
import ArticleList from "./ArticleList";
import { useArticleContext } from "@/data/Articlescontextdata";
import { useSession } from "next-auth/react";

const ArticleConf = () => {
  const { articles, setArticles } = useArticleContext();
  const { data: session } = useSession();
  const [article, setArticle] = useState({
    id: null,
    img: null,
    img_url: null,
    img_name: "",
    title: "",
    subtitle: "",
    body: "",
    // tags: "",
    slug: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="row mt-4 justify-content-between">
      <div className="col-12 col-md-8">
        <ArticleForm
          session={session}
          article={article}
          setArticle={setArticle}
          editMode={editMode}
          setEditMode={setEditMode}
          articles={articles}
          setArticles={setArticles}
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
