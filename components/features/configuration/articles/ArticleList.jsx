import React, { useContext, useEffect, useState } from "react";
import Modal from "@/components/custom/Modal/modal";
import Alert from "@/components/custom/Alert/Alert";
import ArticlePlaceholder from "./ArticlePlaceholder";
import { OrganizationContext } from "@/data/organization/Organizationalcontextdata";
import Pagination from "@/components/custom/Pagination/Pagination";
import { ArticleDefault } from "@/constants";
import { useRouter } from "next/navigation";


/**
 * Description placeholder
 *
 * @param {{ articles: any; article: any; setArticle: any; editMode: any; setEditMode: any; loading: any; currentPage: any; pageSize: any; }} param0
 */
const ArticleList = ({
  articles,
  article,
  setArticle,
  editMode,
  setEditMode,
  loading,
  currentPage,
  pageSize
}) => {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const router = useRouter();

  // handle Article Delete
  const deleteArticle = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/deleteblog/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      // setArticles(articles.filter((article) => article.id !== id));
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
    setArticle(ArticleDefault);
  };

  // -----------------------------------------
  // Handle page change
  // -----------------------------------------
  /**  @param {string} newPage */
  const handlePageChange = (newPage) => {
    router.push(
      `?category=All&page=${newPage}&page_size=${pageSize}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <div>
      <h4 className="mb-3">
        {articles} Article{articles?.length > 1 ? "s" : ""}
      </h4>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {articles && articles.length > 0 ? (
        <div className="">
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
          {!loading &&
            articles.map((article) => (
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

          {/* ServerSide Pagination */}
          {!loading &&
            articles &&
            Math.ceil(articles.count / parseInt(pageSize)) > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(articles.count / parseInt(pageSize))}
                handlePageChange={handlePageChange}
              />
            )}
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
