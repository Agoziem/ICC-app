import Image from "next/image";
import React from "react";
import ArticleComments from "./articlecomments";

const Article = ({ article }) => {
  return (
    <>
      {article && (
        <section
          className="px-4 px-md-5 mx-auto mb-5"
          style={{ maxWidth: "900px" }}
        >
          <div className="article-header py-4">
            <h1>{article.title}</h1>
            <div className="d-flex my-4">
              <div>
                {article.author.img ? (
                  <Image
                    src={article.author.img}
                    alt={article.author.name}
                    width={50}
                    height={50}
                    className="rounded-circle object-fit-cover"
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
                    {article.author.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="ms-3">
                <p className="mb-0 fw-bold">{article.author.name}</p>
                <div>
                  <span>
                    <small>{article.category}</small>
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
                        {tag}
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
                {article.views} views
              </span>
            </div>
            <hr />
          </div>
          <div className="article-body pb-4">
            <Image
              src={article.img}
              width={400}
              height={400}
              alt="article"
              className="mb-4 rounded object-fit-cover"
              style={{ width:"100%", minWidth: "300px" }}
            />
            <p>{article.body}</p>
          </div>
          <div>
            <hr />
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <span className="me-3">
                  <i className="bi bi-heart-fill me-1"></i>
                  {article.likes} likes
                </span>
                <span className="me-3">
                  <i className="bi bi-chat-fill me-1"></i>
                  {article.comments && article.comments.length} comments
                </span>
              </div>
              <div className="mt-3 mt-md-0">
                <button className="btn btn-primary rounded">Like</button>
                <button className="btn btn-primary rounded ms-3">
                  Comment
                </button>
              </div>
            </div>
            <hr />
            {/* share the Post */}
            <div className="share-post my-4">
              <h5>Share this post</h5>
              <div className="d-flex">
                <button className="btn btn-primary rounded me-2" style={{ backgroundColor:"blue",border:"none"}}>
                  <i className="bi bi-facebook h5 pb-0"></i>
                </button>
                <button className="btn btn-primary rounded me-2" style={{ backgroundColor:"black",border:"none"}}>
                <i className="bi bi-twitter-x h5"></i>
                </button>
                <button className="btn btn-primary rounded me-2" style={{ backgroundColor:"#0077B5",border:"none"}}>
                  <i className="bi bi-linkedin h5"></i>
                </button>
                <button className="btn btn-primary rounded me-2" style={{ backgroundColor:"green",border:"none"}}>
                  <i className="bi bi-whatsapp h5"></i>
                </button>
              </div>
            </div>

            {/* comments or responses */}
            {
              article.comments && (
                <div className="comments mt-5">
                  <h5 className="my-4">Comments</h5>
                  <ArticleComments comments={article.comments} />
                </div>
              )
            }
          </div>
        </section>
      )}
    </>
  );
};

export default Article;
