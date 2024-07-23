"use client";
import React, { useContext, useEffect, useState } from "react";
import "./articles.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import Link from "next/link";
import { useArticleContext } from "@/data/Articlescontextdata";
import NextBreadcrumb from "../Breadcrumb/breadcrumb";
import { useSearchParams } from "next/navigation";
import ArticlePlaceholder from "../configuration/articles/ArticlePlaceholder";
import BackButton from "../backbutton/BackButton";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import Pagination from "../Pagination/Pagination";
import CategoryTabs from "../Categories/Categoriestab";

const ArticlesList = () => {
  const {
    articles,
    categories,
    fetchArticlesByCategory,
    fetchArticles,
    loading,
    totalPages,
  } = useArticleContext();
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { OrganizationData } = useContext(OrganizationContext);

  // structure categories
  useEffect(() => {
    if (categories.length > 0)
      setFilteredCategories([{ id: 0, category: "All" }, ...categories]);
  }, [categories]);

  // get category from url
  useEffect(() => {
    if (searchParams.has("category")) {
      setCurrentCategory(searchParams.get("category"));
    }
  }, [searchParams]);

  // Fetch Articles on Page Change
  useEffect(() => {
    if (OrganizationData.id) {
      setCurrentPage(1)
      if (currentCategory === "All") {
        fetchArticles(OrganizationData.id, 1);
      } else {
        fetchArticlesByCategory(currentCategory, 1);
      }
    }
  }, [OrganizationData.id, currentCategory]);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (currentCategory === "All") {
      fetchArticles(OrganizationData.id, page);
    } else {
      fetchArticlesByCategory(currentCategory, page);
    }
  };

  return (
    <div>
      <div className="articles_list mx-auto px-3 px-md-0">
        {/* categories */}
        <div className="mb-3 ps-2 ps-md-0">
          {/* Categories */}
          <h5 className="mb-3 fw-bold">categories</h5>
          <CategoryTabs
            categories={filteredCategories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            services={articles}
          />
        </div>

        <div className="ps-3">
          <NextBreadcrumb capitalizeLinks />
          <BackButton />
        </div>
        <div>
          <h4 className="my-3 text-center">{currentCategory} Articles</h4>
          <hr />
          <ul className="list-group list-group-flush mx-auto mb-5">
            <>
              {
                // loading
                loading && (
                  <div className="d-flex justify-content-center">
                    {/* spinner */}
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )
              }
              {!loading && articles && articles.length > 0 ? (
                articles.map((item, index, articles) => (
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
                      <div className="me-3">
                        {item.img_url ? (
                          <img
                            src={item.img_url}
                            alt="article"
                            width={90}
                            height={90}
                            className="object-fit-cover rounded"
                          />
                        ) : (
                          <ArticlePlaceholder />
                        )}
                      </div>

                      <div className="ms-2">
                        <h5 className="mb-1 text-wrap text-break">
                          {item.title}
                        </h5>
                        <p className="my-0 mb-1 text-wrap text-break">
                          {item.subtitle}...
                        </p>
                        <div
                          className="d-flex align-items-center"
                          style={{ color: "var(--bgDarkerColor)" }}
                        >
                          <span className="me-3 small">
                            <MdOutlineRemoveRedEye className="h5" />{" "}
                            {item.views}
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
            </>
          </ul>
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
