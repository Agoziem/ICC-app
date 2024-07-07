import ArticlePlaceholder from "@/components/configuration/articles/ArticlePlaceholder";
import Link from "next/link";
import React from "react";

function NewsPostItem({ item }) {
  return (
    <div className="post-item clearfix">
      {item.image ? (
        <div className="post-image">
          <img src={item.image} alt={item.title} />
        </div>
      ) : (
        <ArticlePlaceholder />
      )}
      <h6>
        <Link href={`/articles/${item.slug}`}>{item.title}</Link>
      </h6>
      <p>{item.subtitle}...</p>
    </div>
  );
}

export default NewsPostItem;
