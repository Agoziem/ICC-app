"use client";
import React from "react";
import "./articles.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import Link from "next/link";
import { useArticleContext } from "@/data/Articlescontextdata";
import NextBreadcrumb from "../Breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ArticlesList = () => {
  const { articles, categories } = useArticleContext();
  const [currentCategory, setCurrentCategory] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCurrentCategory(category);
    } else if (categories.length > 0) {
      const firstCategoryWithArticles = categories.find((cat) =>
        categories.some((article) => article.category.id === cat.id)
      );
      setCurrentCategory(
        firstCategoryWithArticles?.category || categories[0].category
      );
    }
  }, [categories, articles, searchParams]);

  // filter categories with articles
  const filteredCategories = categories.filter((category) =>
    articles.some((article) => article.category.id === category.id)
  );

  // filter articles by category
  const filteredArticles = articles.filter(
    (article) => article.category.category === currentCategory
  );

  return (
    <div>
      <div className="articles_list mx-auto px-3 px-md-0">
        {/* categories */}
        <div className="mb-2 ps-2 ps-md-0">
          <div className="mb-1 fw-bold">categories</div>
          {filteredCategories.length > 0 &&
            filteredCategories.map((category) => {
              return (
                <div
                  key={category.id}
                  className={`badge rounded-5 px-4 py-2 me-2 mb-3 mb-md-0`}
                  style={{
                    color:
                      currentCategory === category.category
                        ? "var(--secondary)"
                        : "var(--primary)",
                    backgroundColor:
                      currentCategory === category.category
                        ? "var(--secondary-300)"
                        : " ",
                    border:
                      currentCategory === category.category
                        ? "1.5px solid var(--secondary)"
                        : "1.5px solid var(--bgDarkerColor)",
                    cursor: "pointer",
                  }}
                  onClick={() => setCurrentCategory(category.category)}
                >
                  {category.category}
                </div>
              );
            })}
        </div>

        <div className="ps-3">
          <NextBreadcrumb capitalizeLinks />
        </div>
        <div>
          <h4 className="my-3 text-center">{currentCategory} Articles</h4>
          <hr />
          <ul className="list-group list-group-flush mx-auto mb-5">
            {filteredArticles && filteredArticles.length > 0 ? (
              filteredArticles.map((item, index, filteredArticles) => (
                <Link href={`/articles/${item.slug}`} key={item.id}>
                  <li
                    className="list-group-item d-flex align-items-center py-3"
                    style={{
                      backgroundColor: "var(--bgColor)",
                      color: "var(--primary)",
                      border: "none",
                      borderBottom:
                        index === filteredArticles.length - 1
                          ? "none"
                          : "1px solid var(--bgDarkColor)",
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
                        <span className="me-3 small">
                          {item.authordata.name}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <div className="col-12 d-flex justify-content-center">
                <p
                  className="p-3 text-primary text-center bg-primary-light mt-1 mb-3 rounded"
                  style={{ minWidth: "300px" }}
                >
                  No Articles yet
                </p>
              </div>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-center my-4">Top trending Articles</h3>
          <hr />
          <ul className="list-group list-group-flush mx-auto mb-5">
            {articles && articles.length > 0 ? (
              articles.map((item, index) => (
                <Link href={`/articles/${item.slug}`} key={item.id}>
                  <li
                    className="list-group-item d-flex align-items-center py-3"
                    style={{
                      backgroundColor: "var(--bgColor)",
                      color: "var(--primary)",
                      border: "none",
                      borderBottom:
                        index === articles.length - 1
                          ? "none"
                          : "1px solid var(--bgDarkColor)",
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
                        <span className="me-3 small">
                          {item.authordata.name}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <div className="col-12 d-flex justify-content-center">
                <p
                  className="p-3 text-primary text-center bg-primary-light mt-1 mb-3 rounded"
                  style={{ minWidth: "300px" }}
                >
                  No Articles yet
                </p>
              </div>
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
      </div>
    </div>
  );
};

export default ArticlesList;
