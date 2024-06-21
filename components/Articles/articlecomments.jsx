import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "../Modal/modal";
const ArticleComments = ({ comments, setComments }) => {
  const [showModal, setShowModal] = useState(false);
  const [deletemode, setDeleteMode] = useState(false);
  const [commenttoedit, setCommenttoEdit] = useState({
    id: "",
    comment: "",
  });
  const { data: session } = useSession();
  const closeModal = () => {
    setShowModal(false);
    setDeleteMode(false);
    setCommenttoEdit({
      id: "",
      comment: "",
    });
  };

  const editComment = (comment) => {
    setCommenttoEdit({
      id: comment.id,
      comment: comment.comment,
    });
    setShowModal(true);
  };

  const deleteComment = (comment) => {
    setCommenttoEdit({
      id: comment.id,
      comment: comment.comment,
    });
    setDeleteMode(true);
    setShowModal(true);
  };

  const handledelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/deletecomment/${commenttoedit.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const newcomments = comments.filter(
          (comment) => comment.id !== commenttoedit.id
        );
        setComments(newcomments);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/updatecomment/${commenttoedit.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commenttoedit),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const newcomments = comments.map((comment) =>
          comment.id === commenttoedit.id ? data : comment
        );
        setComments(newcomments);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      closeModal();
    }
  };
  return (
    <div>
      {comments.slice(0, 5).map((comment, index) => (
        <div key={comment.id} className="mb-4">
          <div className="d-flex">
            <div>
              {comment.authordata.img ? (
                <img
                  src={comment.authordata.img}
                  alt="author"
                  className="rounded-circle object-fit-cover me-3"
                  style={{
                    width: 50,
                    height: 50,
                    objectPosition: "top center",
                  }}
                />
              ) : (
                <div
                  className="rounded-circle text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: "20px",
                    backgroundColor: "var(--bgDarkerColor)",
                  }}
                >
                  {comment.authordata.name[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="ms-3">
              <p className="mb-0 fw-bold">{comment.authordata.name}</p>
              <p className="mb-0">
                {comment.comment.length > 300
                  ? comment.comment.slice(0, 300) + "..."
                  : comment.comment}
              </p>
              <div className="mt-2">
                <span>
                  <small>{new Date(comment.date).toDateString()}</small>
                </span>
                {parseInt(session?.user?.id) === comment.user && (
                  <span
                    className="fw-bold text-secondary mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => editComment(comment)}
                  >
                    <small>edit</small>
                  </span>
                )}
                {parseInt(session?.user?.id) === comment.user && (
                  <span
                    className="fw-bold text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteComment(comment)}
                  >
                    <small>delete</small>
                  </span>
                )}
              </div>
            </div>
          </div>
          {index !== comments.length - 1 && <hr />}
        </div>
      ))}
      {comments.length > 6 && (
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          View all comments
        </button>
      )}

      <Modal
        showmodal={showModal}
        toggleModal={() => {
          closeModal();
        }}
      >
        {deletemode ? (
          <div className="modal-body">
            <h4 className="text-center">Delete comment</h4>
            <p className="text-center">Are you sure you want to delete this comment?</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger me-3 rounded"
                onClick={() => {
                  handledelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-primary rounded"
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            <h4 className="text-center">Edit comment</h4>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="form-group my-3">
                <label htmlFor="comment mb-3">Comment</label>
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  value={commenttoedit.comment}
                  onChange={(e) =>
                    setCommenttoEdit({
                      ...commenttoedit,
                      comment: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-3 rounded" type="submit">
                  Edit
                </button>
                <button
                  className="btn btn-primary rounded"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ArticleComments;
