import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";
import Alert from "@/components/custom/Alert/Alert";
import Modal from "@/components/custom/Modal/modal";
import {
  createSubCategory,
  deleteSubCategory,
  fetchSubCategories,
  updateSubCategory,
} from "@/data/categories/fetcher";
import useSWR from "swr";
import { SubCategorydefault } from "@/constants";

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
  apiendpoint,
  addUrl,
  updateUrl,
  deleteUrl,
}) => {
  /** @type {[Category,(value:Category) => void]} */
  const [currentCategory, setCurrentCategory] = useState(null);
  const [item, setItem] = useState(SubCategorydefault);
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: subcategories,
    isLoading: loadingsubcategories,
    mutate,
  } = useSWR(
    currentCategory?.id
      ? `${apiendpoint}/subcategories/${currentCategory.id}/`
      : null,
    fetchSubCategories
  );

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
      if (edit) {
        const ammendedSubcategory = await updateSubCategory(url, item);
        await mutate(
          (subcategories) => {
            const updatedsubcategories = (subcategories || []).map((i) =>
              i.id === ammendedSubcategory.id ? ammendedSubcategory : i
            )
            return [...updatedsubcategories];
          },
          {
            populateCache: true,
            revalidate: false
          }
        );
      } else {
        const newSubcategory = await createSubCategory(url, item);
        await mutate(
          (subcategories) => {
            return [newSubcategory, ...(subcategories || [])];
          },
          {
            populateCache: true,
            revalidate: false
          }
        );
      }
      setItem({ id: null, subcategory: "", category: null });
      setAlert({
        show: true,
        message: edit ? `Subcategory Updated` : `Subcategory Created`,
        type: "success",
      });
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
      const delete_id = await deleteSubCategory(deleteUrl,id)
      await mutate((subcategories)=> {
        const otherSubCategories = subcategories.filter((i) => i.id !== delete_id)
        return [...otherSubCategories]
      }, {
        populateCache:true,
        revalidate: false
      })
      
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
