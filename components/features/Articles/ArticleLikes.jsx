import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  addLike,
  deleteLike,
} from "@/data/articles/fetcher";

/**
 * @param {{ article: Article; setToastMessage: any; mutate:any }} param0
 */
const ArticleLikes = ({ article, setToastMessage, mutate }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (article && article.likes) {
      setLikes(article.likes);
      console.log(article.likes)
    }
  }, [article]);

  const handleLikeToggle = async () => {
    const userId = parseInt(session?.user?.id);
    const isLiked = likes?.includes(userId);
    setToastMessage({
      title: isLiked ? "Unlike" : "Like",
      message: isLiked ? "You unliked the post" : "You liked the post",
      time: new Date().toLocaleTimeString(),
    });
    try {
      isLiked
        ? await mutate(deleteLike(article, userId), {
            populateCache: true,
          })
        : await mutate(addLike(article, userId), {
            populateCache: true,
          });
      document.getElementById("liveToast").classList.replace("show", "hide");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        document.getElementById("liveToast").classList.replace("show", "hide");
        setToastMessage({
          title: "",
          message: "",
          time: "",
        });
      }, 3000);
    }
  };

  return (
    <>
      {session ? (
        <button className="btn btn-primary" onClick={handleLikeToggle}>
          {likes?.includes(parseInt(session?.user?.id)) ? "Unlike" : "Like"}
        </button>
      ) : (
        <Link
          href={`/accounts/signin?next=/articles/${article.slug}/`}
          className="btn btn-primary"
        >
          Like
        </Link>
      )}
    </>
  );
};

export default ArticleLikes;
