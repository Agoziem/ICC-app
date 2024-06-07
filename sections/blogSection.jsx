"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./section.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:4000/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <hr className="text-primary pt-4 mx-5" />
      <section className="blog-section px-4 px-md-5">
        <div className=" blog-text text-center d-flex flex-column align-items-center mb-4">
          <h2>Articles and news</h2>
          <p className="align-self-center">
            Get the latest news and updates on our blog, stay informed and never
            miss out on any important information.
          </p>
        </div>

        <div className="row px-0 px-md-5">
          {articles &&
            articles.length > 0 &&
            articles.slice(0, 3).map((blog) => (
              <div
                key={blog._id}
                className="col-12 col-md d-flex justify-content-center"
              >
                <div className="card">
                  <div
                    className="blog-image"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "200px",
                    }}
                  >
                    <img
                      src={blog.img}
                      alt="blog1"
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-center">
                      <h6 className="text-primary mb-2">{blog.title}</h6>
                      <p className="mb-1 small ">
                        {blog.subtitle.length > 100
                          ? blog.subtitle.slice(0, 100) + "..."
                          : blog.subtitle}
                      </p>
                    </div>
                    <div
                      className="d-flex justify-content-center my-3 text-primary"
                      style={{ fontSize: "1rem" }}
                    >
                      <Link
                        href={`/articles/${blog._id}`}
                        className="mx-2 fw-medium text-primary bg-primary-light px-3 py-2 rounded"
                        style={{ cursor: "pointer" }}
                      >
                        Read more <FaLongArrowAltRight className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div>
          <div className="d-flex justify-content-center mt-0 mb-5">
            <Link href="/articles" className="btn btn-primary px-5">
              View articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
