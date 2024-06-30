"use client";
import React from "react";
import "./articles.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import Link from "next/link";
import { useArticleContext } from "@/data/Articlescontextdata";

const ArticlesList = () => {
  const { articles } = useArticleContext();

  return (
    <div>
      <h3 className="text-center my-4">Top trending Articles</h3>
      <ul className="articles_list list-group list-group-flush mx-auto mb-5">
        {articles && articles.length > 0 ? (
          articles.map((item) => (
            <Link href={`/articles/${item.slug}`} key={item.id}>
              <li
                className="list-group-item d-flex align-items-center py-3"
                style={{
                  backgroundColor: "var(--bgColor)",
                  color: "var(--primary)",
                  border: "none",
                  borderBottom: "1px solid var(--bgDarkColor)",
                }}
              >
                <img
                  src={item.img_url}
                  alt="article"
                  width={90}
                  height={90}
                  className="object-fit-cover rounded me-4"
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="my-0 mb-1">{item.subtitle}...</p>
                  <div
                    className="d-flex align-items-center"
                    style={{ color: "var(--bgDarkerColor)" }}
                  >
                    <span className="me-3 small">
                      <MdOutlineRemoveRedEye className="h5" /> {item.views}
                    </span>
                    <span className="me-3 small">
                      <BiSolidLike className="h5" /> {item.no_of_likes}
                    </span>
                    <span className="me-3 small">{item.authordata.name}</span>
                  </div>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <p
            className="p-3 text-light text-center bg-primary-light mt-1 mb-3 rounded"
            style={{ background: "var(--bgDarkerColor)", maxWidth: "400px" }}
          >
            No Articles yet
          </p>
        )}
      </ul>
      {articles && articles.length > 10 ? (
        <div className="text-center mb-5">
          <button
            className="btn btn-primary rounded "
            style={{ minWidth: "250px" }}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ArticlesList;
