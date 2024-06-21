import React, { useState, useEffect } from "react";
import Modal from "../Modal/modal";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ArticleCommentsForm = ({ article, comments, setComments }) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
  });

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/addcomment/${article?.id}/${session?.user?.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setComments([data, ...comments]);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setComment({
        ...comment,
        comment: "",
      });
      setShowModal(false);
    }
  };

  return (
    <>
      {session ? (
        <button
          className="btn btn-primary me-3"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Add Comment
        </button>
      ) : (
        <Link
          href={`/accounts/signin?next=/articles/${article.slug}/`}
          className="btn btn-primary me-3"
        >
          Add Comment
        </Link>
      )}
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
                value={session?.user?.username}
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
            <button
              type="submit"
              className="btn btn-primary w-100 rounded mt-3"
            >
              Add Comment
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ArticleCommentsForm;
