import React from "react";
import NewsPostItem from "./NewsPostItem";
import "./news.css";
import { useArticleContext } from "@/data/Articlescontextdata";

function News() {
  const { articles } = useArticleContext();
  return (
    <div className="card">
      <div className="card-body pb-0">
        <h5 className="card-title pb-3">Articles &amp; Updates</h5>

        <div className="news">
          {articles &&
            articles.length > 0 &&
            articles
              .slice(0, 5)
              .map((item) => <NewsPostItem key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default News;
