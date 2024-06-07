import Image from "next/image";
import React, { useEffect, useState } from "react";
import ArticleComments from "./articlecomments";
import ShareButtons from "./sharebuttons";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import Modal from "../Modal/modal";
import { useSession } from "next-auth/react";
import Toast from "../Toast/toast";

const Article = ({ article, otherArticles }) => {
  const [toastmessage, setToastMessage] = useState({
    title: "",
    message: "",
    time: "",
  });
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState({
    user: {
      id: "",
      name: "",
    },
    comment: "",
  });
  const [like, setLike] = useState({
    user: {
      id: "",
      name: "",
    },
  });
  

  useEffect(() => {
    if (session) {
      setComment({
        ...comment,
        user: {
          id: session.user.id,
          name: session.user.name,
        },
      });
      setLike({
        ...like,
        user: {
          id: session.user.id,
          name: session.user.name,
        },
      });
    }
  },[session]);

  const addComment = (e) => {
    e.preventDefault();
    console.log(comment);
    setComment({
      ...comment,
      comment: "",
    }); 
    setShowModal(false);
  };

  const addLike = () => {
    console.log(like);
    document.getElementById("liveToast").classList.replace("hide", "show");
    setTimeout(() => {
      document.getElementById("liveToast").classList.replace("show", "hide");
      setToastMessage({
        title: "",
        message: "",
        time: "",
      });
    }, 3000);
  };
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
            <img
              src={article.img}
              width={400}
              height={400}
              alt="article"
              className="mb-4 rounded object-fit-cover"
              style={{ width: "100%", minWidth: "300px" }}
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

              {session ? (
                <div className="my-3 my-md-0">
                  <button
                    className="btn btn-primary me-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    Add Comment
                  </button>
                  <button className="btn btn-primary" onClick={() => {
                    setToastMessage({
                      title: "Liked",
                      message: "You liked the post",
                      time: new Date().toLocaleTimeString(),
                    })
                    addLike();
                  }}>
                    Like
                  </button>
                </div>
              ) : (
                <div>
                  <Link href={`/accounts/signin?next=/articles/${article.slug}/`} className="btn btn-primary me-3">
                    Add Comment
                  </Link>
                  <Link href={`/accounts/signin?next=/articles/${article.slug}/`} className="btn btn-primary">
                    Like
                  </Link>
                </div>
              )}
            </div>
            <hr />
            {/* share the Post */}
            <div className="share-post my-4">
              <h5 className="mb-3">Share this post</h5>
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`}
                title={article.title}
                setToastMessage={setToastMessage}
              />
            </div>

            {/* comments or responses */}
            {article.comments && (
              <div className="comments mt-5">
                <h5 className="my-4">Comments</h5>
                <ArticleComments comments={article.comments} />
              </div>
            )}
          </div>
        </section>
      )}
      {/* other Articles in the same category , excluding the current one */}
      <div
        className="other-articles my-5 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <h4 className="my-4 text-center">Other Articles</h4>
        <div className="row px-3 px-md-5 justify-content-between">
          {otherArticles &&
            otherArticles.length > 0 &&
            otherArticles.slice(0, 3).map((blog) => (
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
        <div className="text-center">
          <Link
            className="btn rounded"
            href="/articles"
            style={{
              backgroundColor: "var(--bgDarkerColor)",
              color: "var(--light)",
            }}
          >
            View All Articles
          </Link>
        </div>
      </div>

      {/* Modal for logout */}
      <Modal showmodal={showModal} toggleModal={() => setShowModal(false)}>
        <div className="modal-body">
          <h4 className="text-center">Add comment</h4>
          <form onSubmit={addComment}>
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={comment.user.name}
                readOnly
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="comment">Comment</label>
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                value={comment.comment}
                onChange={(e) =>
                  setComment({ ...comment, comment: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded mt-3">
              Add Comment
            </button>
          </form>
        </div>
      </Modal>

      <Toast
        title={toastmessage.title}
        message={toastmessage.message}
        time={toastmessage.time}
      />
    </>
  );
};

export default Article;
