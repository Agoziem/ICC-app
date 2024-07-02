import React from "react";

const CategoryTabs = ({ categories, currentCategory, setCurrentCategory, services }) => {
  const filteredCategories = categories.filter((category) =>
    services.some((service) => service.category.id === category.id)
  );

  return (
    <div>
      {filteredCategories.length > 0 &&
        filteredCategories.map((category) => {
          if (category.category !== "application") {
            return (
              <div
                key={category.id}
                className={`badge rounded-5 px-4 py-2 me-2 mb-2 mb-md-0`}
                style={{
                  color: currentCategory === category.category
                    ? "var(--secondary)"
                    : "var(--primary)",
                  backgroundColor: currentCategory === category.category
                    ? "var(--secondary-300)"
                    : " ",
                  border: currentCategory === category.category
                    ? "1.5px solid var(--secondary)"
                    : "1.5px solid var(--bgDarkerColor)",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentCategory(category.category)}
              >
                {category.category}
              </div>
            );
          }
        })}
    </div>
  );
};

export default CategoryTabs;
