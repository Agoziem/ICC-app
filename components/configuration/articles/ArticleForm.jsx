import ArticleImageUploader from "@/components/Imageuploader/ArticleImageUploader";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { converttoformData } from "@/utils/formutils";
import React, { useContext, useState } from "react";
import Alert from "@/components/Alert/Alert";
import Tiptap from "@/components/Richtexteditor/Tiptap";
import { TiTimes } from "react-icons/ti";

const ArticleForm = ({
  article,
  setArticle,
  session,
  editMode,
  setEditMode,
  articles,
  setArticles,
  categories,
}) => {
  const { OrganizationData } = useContext(OrganizationContext);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [tag, setTag] = useState("");

  // use Local Storage to get the article data in case of page refresh


  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const resetFormState = () => {
    setArticle({
      img: null,
      img_url: null,
      img_name: null,
      title: "",
      subtitle: "",
      body: "",
      tags: [],
      slug: "",
      category: "",
    });
  };

  const closeEditMode = () => {
    setEditMode(false);
    resetFormState();
  };

  const addArticle = async (e, url) => {
    e.preventDefault();
    const formData = converttoformData(article);
    try {
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
        throw new Error(" An error occurred");
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Something went wrong, please try again later",
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
      closeEditMode();
    }
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
            required
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
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="mb-3">Body</label>
          <Tiptap item={article} setItem={setArticle} keylabel={"body"} />
        </div>

        <div className="form-group mb-3">
          <label>Tags</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary ms-2 rounded"
              onClick={() => {
                setArticle({ ...article, tags: [...article.tags, tag] });
                setTag("");
              }}
            >
              Add
            </button>
          </div>
          <div className="mt-3">
            {article.tags.length > 0 ? (
              article.tags.map((t, i) => (
                <div
                  key={i}
                  className="badge bg-secondary-light text-secondary rounded-pill py-2 px-3 me-2 mb-2"
                >
                  {t}
                  <TiTimes
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setArticle({
                        ...article,
                        tags: article.tags.filter((tag) => tag !== t),
                      });
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="text-primary">No tags added</p>
            )}
          </div>
        </div>
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
          <select
            className="form-select"
            value={article.category}
            onChange={(e) =>
              setArticle({ ...article, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
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
