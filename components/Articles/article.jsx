"use client";
import { useArticleContext } from "@/data/Articlescontextdata";
import React, { useEffect, useState } from "react";
import ArticleComments from "./articlecomments";
import ShareButtons from "./sharebuttons";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import ArticleLikes from "./ArticleLikes";
import ArticleCommentsForm from "./ArticleCommentsForm";
import Toast from "../Toast/toast";
import { useSession } from "next-auth/react";
import { MdOutlineArticle } from "react-icons/md";
import NextBreadcrumb from "../Breadcrumb/breadcrumb"


const Article = ({ params }) => {
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

  const { data: session } = useSession();
  const [toastmessage, setToastMessage] = useState({
    title: "",
    message: "",
    time: "",
  });
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/getcomments/${article.id}`
      );
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const incrementViews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/addviews/${article.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setArticle({
        ...article,
        views: data.views,
      });
    } catch (error) {
      console.error("Failed to update views:", error);
    }
  };

  useEffect(() => {
    if (article?.id) {
      fetchComments();
      incrementViews();
    }
  }, [article?.id]);

  return (
    <>
      {article && (
        <section
          className="px-4 px-md-5 mx-auto mb-5"
          style={{ maxWidth: "900px" }}
        >
          <div className="pt-2 ps-3">
            <NextBreadcrumb capitalizeLinks />
          </div>
          <div className="article-header pb-4">
            <h1>{article.title}</h1>
            <div className="d-flex my-4">
              <div>
                {article.authordata.img ? (
                  <img
                    src={article.authordata.img}
                    alt={article.authordata.name}
                    width={50}
                    height={50}
                    className="rounded-circle object-fit-cover"
                    style={{ objectPosition: "top center" }}
                  />
                ) : (
                  <div
                    className="rounded-circle text-white d-flex justify-content-center align-items-center"
                    style={{
                      width: 50,
                      height: 50,
                      fontSize: "30px",
                      backgroundColor: "var(--bgDarkerColor)",
                    }}
                  >
                    {article.authordata.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="ms-3">
                <p className="mb-0 fw-bold">{article.authordata.name}</p>
                <div>
                  <span>
                    <small>{article.category.category}</small>
                  </span>
                  {" . "}
                  <span className="me-3">
                    <small>{new Date(article.date).toDateString()}</small>
                  </span>
                  {article.tags.length > 0 &&
                    article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary-light text-secondary rounded-5 px-3 py-2 me-1"
                      >
                        {tag.tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <hr />
            <div>
              <span className=" me-3">{article.readTime} min read</span>
              <span className=" me-3">
                <i className="bi bi-eye-fill me-1"></i>
                {article.views} view{article.views > 1 && "s"}
              </span>
            </div>
            <hr />
          </div>
          <div className="article-body pb-4">
            {article.img_url && (
              <img
                src={article.img_url}
                width={400}
                height={400}
                alt="article"
                className="mb-4 rounded object-fit-cover"
                style={{ width: "100%", minWidth: "300px" }}
              />
            )}
            <div style={{ width: "100%" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.body,
                }}
                style={{
                  fontSize: "1.1rem",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </div>
          </div>
          <div>
            <hr />
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <span className="me-3">
                  <i
                    className={`bi ${
                      article.likes.includes(parseInt(session?.user?.id))
                        ? "bi-heart-fill text-danger"
                        : "bi-heart-fill text-primary"
                    } me-1`}
                  ></i>
                  {article.no_of_likes} like{article.no_of_likes > 1 && "s"}
                </span>
                <span className="me-3">
                  <i className="bi bi-chat-fill me-1"></i>
                  {comments ? comments.length : "0"} comment
                  {comments?.length > 1 && "s"}
                </span>
              </div>

              <div className="my-3 my-md-0">
                <ArticleCommentsForm
                  article={article}
                  comments={comments}
                  setComments={setComments}
                />
                <ArticleLikes
                  article={article}
                  setArticle={setArticle}
                  setToastMessage={setToastMessage}
                />
              </div>
            </div>
            <hr />
            <div className="share-post my-4">
              <h5 className="mb-3">Share this post</h5>
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`}
                title={article.title}
                setToastMessage={setToastMessage}
              />
            </div>
            {comments && (
              <div className="comments mt-5">
                <hr />
                <h5 className="my-4">Comments</h5>
                <div>
                  {comments.length > 0 ? (
                    <ArticleComments
                      comments={comments}
                      setComments={setComments}
                    />
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-primary-light mt-5">
        <div className="px-5 py-4 mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="text-center">
            <h4 className="fw-bold mb-4">Related Articles</h4>
            <div className="row justify-content-center">
              {otherArticles &&
                otherArticles.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="col-12 col-md d-flex justify-content-center"
                  >
                    <div className="card mx-auto" style={{ width: "350px" }}>
                      <div
                        className="blog-image"
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                        }}
                      >
                        {blog.img ? (
                          <img
                            src={blog.img_url}
                            className="object-fit-cover me-3"
                            alt="profile"
                            style={{
                              objectPosition: "top center",
                              width: "100%",
                              height: "100%",
                              borderRadius: "0.5rem 0.5rem 0 0",
                            }}
                          />
                        ) : (
                          <div
                            className="d-flex justify-content-center align-items-center me-3"
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "var(--bgDarkColor)",
                              color: "var(--bgDarkerColor)",
                              fontSize: "5rem",
                              borderRadius: "0.5rem 0.5rem 0 0",
                            }}
                          >
                            <MdOutlineArticle />
                          </div>
                        )}
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
                            href={`/articles/${blog.slug}`}
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
          </div>
        </div>
      </section>

      <Toast
        title={toastmessage.title}
        message={toastmessage.message}
        time={toastmessage.time}
      />
    </>
  );
};

export default Article;
