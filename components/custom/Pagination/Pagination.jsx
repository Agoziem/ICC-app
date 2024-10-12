import React from "react";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="d-flex justify-content-center mt-3 my-4">
      {currentPage > 1 && (
        <TiArrowBack
          className="text-primary me-2"
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        />
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`me-2 ${
            currentPage === index + 1
              ? "text-light badge bg-secondary py-2 px-2"
              : "text-primary"
          }`}
          style={{ cursor: "pointer" }}
        >
          {index + 1}
        </div>
      ))}
      {currentPage < totalPages && (
        <TiArrowForward
          className="text-primary ms-2"
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        />
      )}
    </div>
  );
};

export default Pagination;
