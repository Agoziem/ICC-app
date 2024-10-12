import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ArticleLikes = ({ article, setArticle, setToastMessage }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (article) {
      setLikes(article.likes);
    }
  }, [article]);

  const handleLikeToggle = async () => {
    const userId = parseInt(session?.user?.id);
    const isLiked = likes.includes(userId);
    setToastMessage({
      title: isLiked ? "Unlike" : "Like",
      message: isLiked ? "You unliked the post" : "You liked the post",
      time: new Date().toLocaleTimeString(),
    });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/blogsapi/${
          isLiked ? "deletelike" : "addlike"
        }/${article?.id}/${userId}/`,
        {
          method: isLiked ? "DELETE" : "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const updatedLikes = isLiked
        ? likes.filter((like) => like !== userId)
        : [...likes, userId];

      setArticle({
        ...article,
        likes: updatedLikes,
        no_of_likes: updatedLikes.length,
      });
      setLikes(updatedLikes);
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
          {likes.includes(parseInt(session?.user?.id)) ? "Unlike" : "Like"}
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
