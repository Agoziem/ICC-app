"use client";
import Article from "@/components/Articles/article";
import React, { useEffect, useState } from "react";

const ArticlePage = ({ params }) => {
  const { slug } = params;
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:4000/news`)
      .then((res) => res.json())
      .then((data) => {
        const article = data.find((item) => item.slug === slug);
        const otherArticles = data.filter((item) => item.slug !== slug);
        setArticle(article);
        setOtherArticles(otherArticles);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (slug) fetchData();
  }, [slug]);

  return <Article article={article} otherArticles={otherArticles} />;
};

export default ArticlePage;
