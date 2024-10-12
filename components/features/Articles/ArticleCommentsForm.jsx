import React, { useState, useEffect } from "react";
import Modal from "../../custom/Modal/modal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { createComment } from "@/data/articles/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commentSchema } from "@/schemas/articles";
import Alert from "@/components/custom/Alert/Alert";

const ArticleCommentsForm = ({ article, comments, mutate }) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(
      commentSchema.pick({
        comment: true,
      })
    ),
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });

  const addComment = async (data) => {
    try {
      mutate(createComment(data), {
        populateCache: true,
      });
      setSuccess("submitted successfully!");
    } catch (error) {
      console.log(error.message);
      setError("failed to Submit!, try again");
    } finally {
      reset();
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
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
          <form onSubmit={handleSubmit(addComment)}>
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
                {...register("comment")}
              ></textarea>
              {errors.comment && (
                <p className="text-danger small">
                  {String(errors.comment.message)}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 rounded mt-3"
            >
              Add Comment
            </button>
            {/* Error Message */}
            {error && <Alert type={"danger"}>{error}</Alert>}

            {/* Success Message */}
            {success && <Alert type={"success"}>{success}</Alert>}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ArticleCommentsForm;
