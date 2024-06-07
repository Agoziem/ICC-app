"use client";
import Article from "@/components/Articles/article";
import React, { useEffect, useState } from "react";

const ArticlePage = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);

  const fetchData = () => {
    fetch(`http://localhost:4000/news`)
      .then((res) => res.json())
      .then((data) => {
        const article = data.find((item) => item._id === parseInt(id));
        setArticle(article);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return <Article article={article} />;
};

export default ArticlePage;
