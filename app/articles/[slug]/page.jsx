"use client";
import Article from "@/components/Articles/article";
import { useArticleContext } from "@/data/Articlescontextdata";
import React, { useEffect, useState } from "react";

const ArticlePage = ({ params }) => {
  const { slug } = params;
  const { articles } = useArticleContext();
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);

  const fetchData = () => {
    if (!articles) return;
    const article = articles.find((item) => item.slug === slug);
    if (article) {
      setArticle(article);
      const otherArticles = articles.filter((item) => item.slug !== slug);
      setOtherArticles(otherArticles);
    }
  };

  useEffect(() => {
    if (slug && articles && articles.length > 0) fetchData();
  }, [slug, articles]);

  return <Article article={article} setArticle={setArticle} otherArticles={otherArticles} />;
};

export default ArticlePage;
