import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";
import Alert from "@/components/Alert/Alert";
import Modal from "@/components/Modal/modal";

const CategoriesForm = ({
  items,
  setItems,
  itemName,
  itemLabel,
  addUrl,
  updateUrl,
  deleteUrl,
  renderItem,
  renderListItem,
}) => {
  const [item, setItem] = useState({ id: null, [itemName]: "" });
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setItem({ id: null, [itemName]: "" });
    setModal(false);
  };

  // handle create and edit item
  const handleItem = async (e, url) => {
    e.preventDefault();
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
          setItems(
            items.map((i) => (i.id === data.id ? { ...i, [itemName]: data[itemName] } : i))
          );
        } else {
          setItems([...items, data]);
        }
        setItem({ id: null, [itemName]: "" });
        setAlert({
          show: true,
          message: edit ? `${itemLabel} Updated` : `${itemLabel} Created`,
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
    }
  };

  // delete item
  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${deleteUrl}/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-4">
      <h6 className="mb-3">Create {itemLabel}</h6>
      {alert.show && (
        <div>
          <Alert type={alert.type}>{alert.message} </Alert>
        </div>
      )}
      {/* form */}
      <form
        onSubmit={(e) => {
          handleItem(
            e,
            edit ? `${updateUrl}/${item.id}/` : addUrl
          );
        }}
      >
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control"
            required
            value={item[itemName] || ""}
            onChange={(e) => setItem({ ...item, [itemName]: e.target.value })}
            placeholder={`${itemLabel} Name`}
          />
          <button className="btn btn-primary rounded text-nowrap ms-2">
            {edit ? `Update ${itemLabel}` : `Add ${itemLabel}`}
          </button>
        </div>
      </form>

      {/* list items */}
      <div>
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`badge bg-secondary-light text-secondary mt-2 p-2 px-3 ${
              items.length === i + 1 ? "" : "me-2"
            }`}
          >
            <span
              onClick={() => {
                setItem({ id: item.id, [itemName]: item[itemName] });
                setEdit(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {renderListItem ? renderListItem(item) : item[itemName]}
            </span>
            <TiTimes
              className="ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setItem({ id: item.id, [itemName]: item[itemName] });
                setModal(true);
              }}
            />
          </div>
        ))}
      </div>
      <Modal showmodal={modal} toggleModal={() => closeModal()}>
        <p>Are you sure you want to delete this {itemLabel}?</p>
        <h6>{item[itemName]}</h6>
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

export default CategoriesForm;
