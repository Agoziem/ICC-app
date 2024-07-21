import React, { useState } from "react";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
import ArticlePlaceholder from "./ArticlePlaceholder";
const ArticleList = ({
  articles,
  setArticles,
  article,
  setArticle,
  editMode,
  setEditMode,
  currentPage,
  setCurrentPage,
  totalPages,
  fetchArticles,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const deleteArticle = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/deleteblog/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      setArticles(articles.filter((article) => article.id !== id));
      setAlert({
        show: true,
        message: "Article deleted successfully",
        type: "success",
      });
    } else {
      setAlert({
        show: true,
        message: "An error occurred",
        type: "danger",
      });
    }
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "",
      });
    });
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setArticle({
      id: null,
      img: null,
      img_url: null,
      img_name: "",
      title: "",
      subtitle: "",
      body: "",
      tags: [],
      slug: "",
      category: "",
      readTime: 0,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchArticles(page);
  };

  return (
    <div>
      <h4 className="mb-3">
        {articles?.length} Article{articles?.length > 1 ? "s" : ""}
      </h4>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {articles && articles.length > 0 ? (
        <div className="">
          {articles.map((article) => (
            <div key={article.id} className="card px-4 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  {article.img ? (
                    <img
                      src={article.img_url}
                      className="rounded object-fit-cover "
                      alt="profile"
                      height={90}
                      width={90}
                      style={{ objectPosition: "top center" }}
                    />
                  ) : (
                    <ArticlePlaceholder />
                  )}
                </div>
                <div className="flex-fill">
                  <h6 className="text-wrap text-break">{article.title}</h6>
                  <p className="text-wrap text-break">{article.subtitle}</p>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-accent-primary me-2 rounded"
                  onClick={() => {
                    setArticle({
                      id: article.id,
                      img: article.img,
                      img_url: article.img_url,
                      img_name: article.img_name,
                      title: article.title,
                      subtitle: article.subtitle,
                      body: article.body,
                      tags: article.tags.map((t) => t.tag),
                      slug: article.slug,
                      category: article.category.category,
                      readTime: article.readTime,
                    });
                    setEditMode(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger rounded"
                  onClick={() => {
                    setArticle({
                      id: article.id,
                      img: article.img,
                      img_url: article.img_url,
                      img_name: article.img_name,
                      title: article.title,
                      subtitle: article.subtitle,
                      body: article.body,
                      tags: article.tags.map((t) => t.tag),
                      slug: article.slug,
                      category: article.category.category,
                      readTime: article.readTime,
                    });
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className="btn btn-sm btn-primary rounded me-2"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card-body">
          <h5 className="text-center">No Articles found</h5>
        </div>
      )}
      <Modal showmodal={showModal} toggleModal={closeModal}>
        <div className="">
          <h5 className="mb-3">Delete Article</h5>
          <div className="modal-body">
            <p>Are you sure you want to delete this article? {article.title}</p>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-accent-secondary rounded me-3"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger rounded"
              onClick={() => deleteArticle(article.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArticleList;
