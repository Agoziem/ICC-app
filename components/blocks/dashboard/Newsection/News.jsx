import React, { useContext, useEffect } from "react";
import NewsPostItem from "./NewsPostItem";
import "./news.css";
import { useArticleContext } from "@/data/articles/Articlescontextdata";
import Link from "next/link";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";

function News() {
  const { articles, fetchArticles } = useArticleContext();
  const { OrganizationData } = useContext(OrganizationContext);

  useEffect(() => {
    if (OrganizationData.id) {
      fetchArticles(OrganizationData.id);
    }
  }, [OrganizationData.id]);

  
  return (
    <div className="card ">
      <div className="card-body pb-4">
        <h6 className="px-3 pt-2">Articles &amp; Updates</h6>
        <hr />

        <div className="news mt-3">
          {articles && articles.length > 0 ? (
            articles
              .slice(0, 5)
              .map((item, index) => (
                <NewsPostItem
                  key={item.id}
                  item={item}
                  index={index}
                  items={articles}
                />
              ))
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <p className="fw-bold mb-1 py-4" style={{ marginLeft: "0px" }}>
                No Articles Available
              </p>
            </div>
          )}
          {articles && articles.length > 5 && (
            <Link
              href={"/articles"}
              className="text-center text-secondary text-decoration-none"
            >
              View All Articles
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
