import React from "react";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      className="d-flex align-items-center rounded"
      style={{
        border: "1.5px solid var(--bgDarkerColor)",
        background: "var(--bgDarkColor)",
      }}
    >
      <i className="bi bi-search text-primary ms-3 "></i>
      <input
        type="text"
        className="form-control border-0"
        placeholder="Search for message"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          color: "white",
        }}
      />
    </div>
  );
};

export default SearchInput;


