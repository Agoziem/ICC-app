import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";
import Alert from "@/components/custom/Alert/Alert";
import Modal from "@/components/custom/Modal/modal";

//     "category": {
//       "id": 2,
//       "category": "PostUTME",
//       "description": "This is a Postutme Video"
//     },
//     "subcategory": {
//       "id": 4,
//       "category": {
//         "id": 2,
//         "category": "PostUTME",
//         "description": "This is a Postutme Video"
//       },
//       "subcategory": "Physical Science"
//     },

const SubCategoriesForm = ({
  categories, // array of categories
  fetchSubCategories, // function to fetch subcategories based on item type
  addUrl,
  updateUrl,
  deleteUrl,
}) => {
  const [subcategories, setSubcategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [item, setItem] = useState({
    id: null,
    subcategory: "",
    category: null,
  });
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  //   -----------------------------------------
  // close modal
  //   -----------------------------------------
  const closeModal = () => {
    setItem(null);
    setModal(false);
  };

  //   -----------------------------------------
  // handle create and edit item
  //   -----------------------------------------
  const handleItem = async (e, url) => {
    e.preventDefault();
    console.log(item);
    try {
      const res = await fetch(url, {
        method: edit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const data = await res.json();
        if (edit) {
          setSubcategories(
            subcategories.map((i) =>
                i.id === data.id ? data : i
            )
          );
        } else {
          setSubcategories([data, ...subcategories]);
        }
        setItem({ id: null, subcategory: "", category: null });
        setAlert({
          show: true,
          message: edit ? `Subcategory Updated` : `Subcategory Created`,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Something went wrong",
        type: "danger",
      });
    } finally {
      setEdit(false);
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
      setCurrentCategory(null);
    }
  };

  //   -----------------------------------------
  // delete item
  //   -----------------------------------------
  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${deleteUrl}/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubcategories(subcategories.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   -----------------------------------------
  // set current category and fetch subcategories on change of the categories select
  //   -----------------------------------------
  const handleCategoryChange = async (e) => {
    if (e.target.value === "") return;
    const category = categories.find((c) => c.category === e.target.value);
    setCurrentCategory(category);
    setLoading(true);
    const data = await fetchSubCategories(category.id);
    setSubcategories(data);
    setLoading(false);
  };

  //   --------------------------------------------------------
  //   nest the category selected into the subcategory object
  //   --------------------------------------------------------
  const handleSubCategory = (e) => {
    setItem({
      ...item,
      category: currentCategory,
      subcategory: e.target.value,
    });
  };

  return (
    <div className="card p-4">
      <h6 className="mb-3">Create Sub-Category</h6>
      {alert.show && (
        <div>
          <Alert type={alert.type}>{alert.message} </Alert>
        </div>
      )}
      {/* form */}
      <form
        onSubmit={(e) => {
          handleItem(e, edit ? `${updateUrl}/${item.id}/` : addUrl);
        }}
      >
        <div className="mb-2">
          <select
            className="form-select mb-3"
            onChange={handleCategoryChange}
            value={currentCategory?.category || ""}
            required
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control"
            value={item?.subcategory || ""}
            onChange={handleSubCategory}
            placeholder="Subcategory Name"
            required
          />
          <button className="btn btn-primary rounded text-nowrap ms-2">
            {edit ? `Update subcategory` : `Add subcategory`}
          </button>
        </div>
      </form>

      {/* list items */}
      <div>
        {subcategories?.map((subcategory, i) => (
          <div
            key={subcategory.id}
            className={`badge bg-secondary-light text-secondary mt-2 p-2 px-3 ${
              subcategories.length === i + 1 ? "" : "me-2"
            }`}
          >
            <span
              onClick={() => {
                setItem(subcategory);
                setEdit(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {subcategory.subcategory}
            </span>
            <TiTimes
              className="ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setItem(subcategory);
                setModal(true);
              }}
            />
          </div>
        ))}
      </div>
      <Modal showmodal={modal} toggleModal={() => closeModal()}>
        <p>
          Are you sure you want to delete this subcategory ? under{" "}
          <span className="fw-bold text-secondary">
            {item?.category?.category}
          </span>
        </p>
        <h6>{item?.subcategory}</h6>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger rounded"
            onClick={() => {
              deleteItem(item.id);
              closeModal();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-primary rounded ms-2"
            onClick={() => closeModal()}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SubCategoriesForm;
