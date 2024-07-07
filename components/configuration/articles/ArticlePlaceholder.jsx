import React from "react";
import { MdOutlineArticle } from "react-icons/md";

const ArticlePlaceholder = ({
  width = "90px",
  height = "90",
  fontSize = "2rem",
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center me-3 rounded"
      style={{
        width: { width },
        height: { height },
        fontSize: { fontSize },
        backgroundColor: "var(--bgDarkColor)",
        color: "var(--bgDarkerColor)",
      }}
    >
      <MdOutlineArticle />
    </div>
  );
};

export default ArticlePlaceholder;
