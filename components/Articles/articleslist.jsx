import React, { useEffect, useState } from "react";
import "./articles.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import Link from "next/link";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:4000/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-center my-4">Top trending Articles</h3>
      <ul className="articles_list list-group list-group-flush mx-auto mb-5">
        {articles &&
          articles.length > 0 &&
          articles.map((item) => (
            <Link href={`/articles/${item.slug}`} key={item._id}>
              <li
                className="list-group-item d-flex align-items-center py-3"
                style={{
                  backgroundColor: "var(--bgColor)",
                  color: "var(--primary)",
                  border: "none",
                  borderBottom: "1px solid var(--bgDarkColor)",
                }}
              >
                <img
                  src={item.img}
                  alt="article"
                  width={90}
                  height={90}
                  className="object-fit-cover rounded me-4"
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="my-0 mb-1">{item.subtitle}...</p>
                  <div className="d-flex align-items-center" style={{color:"var(--bgDarkerColor)"}}>
                    <span className="me-3 small">
                      <MdOutlineRemoveRedEye className="h5" /> {item.views}
                    </span>
                    <span className="me-3 small">
                      <BiSolidLike className="h5" /> {item.likes}
                    </span>
                    <span className="me-3 small">{item.author.name}</span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ul>
      <div className="text-center mb-5">
        <button
          className="btn btn-primary rounded "
          style={{ minWidth: "250px" }}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default ArticlesList;
