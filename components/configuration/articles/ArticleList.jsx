import React, { useState } from "react";
import { MdOutlineArticle } from "react-icons/md";
import Modal from "@/components/Modal/modal";
import Alert from "@/components/Alert/Alert";
const ArticleList = ({
  articles,
  setArticles,
  article,
  setArticle,
  editMode,
  setEditMode,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  //   {
  //     "id": 1,
  //     "img": "/media/blogs/news-2.jpg",
  //     "img_url": "http://127.0.0.1:8000/media/blogs/news-2.jpg",
  //     "img_name": "news-2.jpg",
  //     "authordata": {
  //         "id": 1,
  //         "name": "Gozzy",
  //         "img": "http://127.0.0.1:8000/media/avatars/IMG_20230808_195658_YR2fjuu.jpg"
  //     },
  //     "no_of_likes": 0,
  //     "title": "Nihil blanditiis at in nihil autem",
  //     "subtitle": "Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum",
  //     "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo. Fusce malesuada vulputate faucibus. Integer in hendrerit nisi. Praesent a hendrerit urna. In non imperdiet elit. Nulla feugiat dolor vel justo. Vestibulum auctor erat in purus sollicitudin, et elementum augue elementum. Cras non tincidunt mi. Etiam sit amet dui volutpat, cursus diam sit amet, accumsan odio. Suspendisse interdum mauris vel justo hendrerit, non lacinia lorem fermentum. Donec sagittis, libero nec pharetra aliquam, ex leo pharetra sem, vel lacinia mi justo nec tellus. Phasellus sit amet est pharetra, sodales mi vitae, ultrices ipsum. Nulla facilisi. Sed nec purus euismod, aliquam urna sit amet, euismod nunc. Nulla nec libero et nunc facilisis dictum. Ut sit amet suscipit odio. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo. Fusce malesuada vulputate faucibus. Integer in hendrerit nisi. Praesent a hendrerit urna. In non imperdiet elit. Nulla feugiat dolor vel justo. Vestibulum auctor erat in purus sollicitudin, et elementum augue elementum. Cras non tincidunt mi. Etiam sit amet dui volutpat, cursus diam sit amet, accumsan odio. Suspendisse interdum mauris vel justo hendrerit, non lacinia lorem fermentum. Donec sagittis, libero nec pharetra aliquam, ex leo pharetra sem, vel lacinia mi justo nec tellus. Phasellus sit amet est pharetra, sodales mi vitae, ultrices ipsum. Nulla facilisi. Sed nec purus euismod, aliquam urna sit amet, eu",
  //     "date": "2024-06-15T02:06:10.081508Z",
  //     "updated_at": "2024-06-15T02:06:10.081508Z",
  //     "tags": "[         \"lifestyle\",         \"health\",         \"tech\"       ]",
  //     "slug": "nihil-blanditiis-at-in-nihil-autem",
  //     "category": "abc",
  //     "readTime": 0,
  //     "views": 0,
  //     "organization": 1,
  //     "author": 1,
  //     "likes": []
  // }

  const deleteArticle = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/deleteblog/${id}`, {
      method: "DELETE",
    });
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
      // tags: "",
      slug: "",
      category: "",
    });
  };

  return (
    <div>
      <h4 className="mb-3">{articles?.length} Article{ articles.length > 1 ? "s":""}</h4>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {articles && articles.length > 0 ? (
        <div className="">
          {articles.map((article) => (
            <div key={article.id} className="card px-4 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {article.img ? (
                    <img
                      src={article.img_url}
                      className="rounded object-fit-cover me-3"
                      alt="profile"
                      height={90}
                      width={90}
                      style={{ objectPosition: "top center" }}
                    />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center me-3 rounded"
                      style={{
                        width: "90px",
                        height: "90px",
                        fontSize: "40px",
                        backgroundColor: "var(--bgDarkColor)",
                        color: "var(--bgDarkerColor)",
                      }}
                    >
                      <MdOutlineArticle />
                    </div>
                  )}
                </div>
                <div className="flex-fill">
                  <h6>{article.title}</h6>
                  <p>{article.subtitle}</p>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-accent-primary me-2 rounded"
                  onClick={() => {
                    console.log(article)
                    setArticle({
                      id: article.id,
                      img: article.img,
                      img_url: article.img_url,
                      img_name: article.img_name,
                      title: article.title,
                      subtitle: article.subtitle,
                      body: article.body,
                      // tags: article.tags,
                      slug: article.slug,
                      category: article.category,
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
                      // tags: article.tags,
                      slug: article.slug,
                      category: article.category,
                    });
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
