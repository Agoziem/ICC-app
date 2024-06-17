import ArticleImageUploader from "@/components/Imageuploader/ArticleImageUploader";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { converttoformData } from "@/utils/formutils";
import React, { useContext, useState } from "react";
import Alert from "@/components/Alert/Alert";
import Tiptap from "@/components/Richtexteditor/Tiptap";
const ArticleForm = ({
  article,
  setArticle,
  session,
  editMode,
  setEditMode,
  articles,
  setArticles,
}) => {
  const { OrganizationData } = useContext(OrganizationContext);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const closeEditMode = () => {
    console.log("closeEditMode");
    setEditMode(false);
    setArticle({
      img: null,
      img_url: null,
      img_name: null,
      title: "",
      subtitle: "",
      body: "",
      // tags: "",
      slug: "",
      category: "",
    });
  };

  const addArticle = async (e, url) => {
    e.preventDefault();
    const formData = converttoformData(article);
    const res = await fetch(url, {
      method: editMode ? "PUT" : "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      if (editMode) {
        setArticles(articles.map((a) => (a.id === data.id ? data : a)));
        setAlert({
          show: true,
          message: "Article updated successfully",
          type: "success",
        });
      } else {
        setArticles([data, ...articles]);
        setAlert({
          show: true,
          message: "Article created successfully",
          type: "success",
        });
      }
    } else {
      setAlert({
        show: true,
        message: "Something went wrong, please try again later",
        type: "danger",
      });
    }
    closeEditMode();
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };
  return (
    <div className="card p-4 px-md-5 py-5">
      <h4 className="mb-3">{editMode ? "Edit Article" : "Create Article"}</h4>
      <hr />
      <form
        onSubmit={
          session &&
          (editMode
            ? (e) =>
                addArticle(
                  e,
                  `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/updateblog/${article.id}/`
                )
            : (e) =>
                addArticle(
                  e,
                  `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/addblog/${OrganizationData.id}/${session.user.id}/`
                ))
        }
      >
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={article.title}
            onChange={(e) => {
              setArticle({
                ...article,
                title: e.target.value,
                slug: createSlug(e.target.value),
              });
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label>Subtitle</label>
          <input
            type="text"
            className="form-control"
            value={article.subtitle}
            onChange={(e) =>
              setArticle({ ...article, subtitle: e.target.value })
            }
          />
        </div>
  
        <div className="form-group mb-3">
          <label className="mb-3">Body</label>
          <Tiptap article={article} setArticle={setArticle} />
        </div>
        
        {/* <div className="form-group mb-3">
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            value={article.tags}
            onChange={(e) => setArticle({ ...article, tags: e.target.value })}
          />
        </div> */}
        <div className="form-group mb-3">
          <label>Slug</label>
          <input
            type="text"
            className="form-control"
            value={article.slug}
            readOnly
          />
        </div>
        <div className="form-group mb-4">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            value={article.category}
            onChange={(e) =>
              setArticle({ ...article, category: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <ArticleImageUploader
            imagekey={"img"}
            imageurlkey={"img_url"}
            imagename={"img_name"}
            formData={article}
            setFormData={setArticle}
          />
        </div>
        {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
        <button
          type="button"
          className="btn btn-accent-secondary rounded me-3"
          onClick={() => closeEditMode()}
        >
          Cancel {editMode ? "Edit" : "Create"}
        </button>

        <button type="submit" className="btn btn-primary rounded">
          {editMode ? "Update Article" : "Create Article"}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
