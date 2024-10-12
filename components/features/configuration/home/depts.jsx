import React, { useState } from "react";
import Alert from "@/components/custom/Alert/Alert";
import Modal from "@/components/custom/Modal/modal";
import { converttoformData } from "@/utils/formutils";
import DepartmentForm from "./DepartmentForm";
// [
//     {
//         "id": 1,
//         "img": null,
//         "img_url": null,
//         "img_name": null,
//         "staff_in_charge": {
//             "id": 5,
//             "name": "Edward Andreas",
//             "img_url": null
//         },
//         "organization": {
//             "id": 1,
//             "name": "Innovations Cybercafe"
//         },
//         "services": [
//             {
//                 "id": 1,
//                 "name": "Registering PostUtme",
//                 "created_at": "2024-06-27T09:46:01.943745Z"
//             },
//             {
//                 "id": 2,
//                 "name": "Date Confirmation",
//                 "created_at": "2024-06-27T09:46:45.576125Z"
//             },
//             {
//                 "id": 3,
//                 "name": "Data Correction",
//                 "created_at": "2024-06-27T09:47:06.970061Z"
//             }
//         ],
//         "name": "Post Utme",
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo. Fusce malesuada vulputate faucibus. Integer in hendrerit nisi. Praesent a hendrerit urna. In non imperdiet elit. Nulla feugiat dolor vel justo. Vestibulum auctor erat in purus sollicitudin, et elementum augue elementum. Cras non tincidunt mi. Etiam sit amet dui volutpat, cursus diam sit amet, accumsan odio. Suspendisse interdum mauris vel justo hendrerit, non lacinia lorem fermentum. Donec sagittis, libero nec pharetra aliquam, ex leo pharetra sem, vel lacinia mi justo nec tellus. Phasellus sit amet est pharetra, sodales mi vitae, ultrices ipsum. Nulla facilisi. Sed nec purus euismod, aliquam urna sit amet, euismod nunc. Nulla nec libero et nunc facilisis dictum",
//         "created_at": "2024-06-27T09:47:09.792477Z",
//         "last_updated_date": "2024-06-27T09:47:09.792477Z"
//     },
// ]
const Depts = ({ depts, setDepts, OrganizationData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showdeleteModal, setShowDeleteModal] = useState(false);
  const [service, setService] = useState("");
  const [department, setDepartment] = useState({
    id: null,
    img: null,
    img_url: null,
    img_name: null,
    staff_in_charge: null, // This is an id of staff_in_charge,
    services: [], // This is an array of services name,
    name: "",
    description: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [addorupdate, setAddOrUpdate] = useState({
    type: "add",
    state: false,
  });

  // -------------------------------------------------------------
  // Function to handle form submission
  // -------------------------------------------------------------

  const handleSubmit = (e, url) => {
    e.preventDefault();

    // Convert the department object to FormData, specifying 'services' as a key to be serialized
    const formData = converttoformData(department, ["services"]);

    fetch(url, {
      method: addorupdate.type === "add" ? "POST" : "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (addorupdate.type === "add") {
          setDepts([...depts, data]);
        } else {
          setDepts(
            depts.map((dept) =>
              dept.id === data.id ? { ...dept, ...data } : dept
            )
          );
        }
        setAlert({
          show: true,
          message: `Department ${addorupdate.type}ed successfully`,
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            type: "",
          });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding Department data:", error);
      })
      .finally(() => {
        closeModal();
      });
  };

  // -------------------------------------------------------------
  // Function to close the modal
  // -------------------------------------------------------------

  const closeModal = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setAddOrUpdate({
      type: "add",
      state: false,
    });
    setDepartment({
      id: null,
      img: null,
      img_url: null,
      img_name: null,
      staff_in_charge: null, // This is an id of staff_in_charge,
      services: [], // This is an array of services name,
      name: "",
      description: "",
    });
    setService("");
  };

  // -------------------------------------------------------------
  // Function to delete a testimonial
  // -------------------------------------------------------------
  const deleteTestimonial = (id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/department/delete/${id}/`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setDepts(depts.filter((dept) => dept.id !== id));
        setAlert({
          show: true,
          message: "Department deleted successfully",
          type: "success",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            type: "",
          });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting department data:", error);
      })
      .finally(() => {
        closeModal();
      });
  };
  return (
    <div className="px-1 px-md-4">
      <div className="mb-5 mb-md-0">
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-primary border-0 rounded"
            style={{ backgroundColor: "var(--bgDarkerColor)" }}
            onClick={() => {
              setAddOrUpdate({
                type: "add",
                state: true,
              });
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add Department
          </button>
        </div>
        <h4>Departments</h4>
      </div>

      {/* set of horizontal Cards that are clickable */}
      <div className="mt-4">
        {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
        {depts.length === 0 ? (
          <p>No testimonials available</p>
        ) : (
          depts.map((department) => (
            <div key={department.id} className="card my-3 p-3">
              <div className="card-body">
                <h5>{department.name} Department</h5>
                <p className="card-text">
                  {department.description && department.description.length > 100
                    ? department.description.slice(0, 200) + "..."
                    : department.description}
                </p>
                <div className="d-flex align-items-center">
                  {department?.staff_in_charge?.img_url ? (
                    <img
                      src={department.staff_in_charge.img_url}
                      alt="department"
                      className="rounded-circle object-fit-cover"
                      height={75}
                      width={75}
                      style={{ objectPosition: "top center" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: 75,
                        height: 75,
                        fontSize: "30px",
                        backgroundColor: "var(--bgDarkerColor)",
                      }}
                    >
                      {department.staff_in_charge?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="ms-3">
                    <h6 className="mb-1">{department.staff_in_charge?.name}</h6>
                    <p className="my-0 small">{department.name} Head</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                  <div className="mt-3 mt-md-0">
                    <button
                      className="btn btn-accent-secondary rounded small mx-0 me-2 mx-md-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAddOrUpdate({
                          type: "update",
                          state: true,
                        });
                        setDepartment({
                          id: department.id,
                          img: department.img,
                          img_url: department.img_url,
                          img_name: department.img_name,
                          staff_in_charge: department.staff_in_charge.id,
                          services: department.services,
                          name: department.name,
                          description: department.description,
                        });
                        setShowModal(true);
                      }}
                    >
                      edit department
                    </button>

                    <button
                      className="btn btn-sm btn-danger rounded px-3"
                      onClick={() => {
                        setDepartment({
                          id: department.id,
                          img: department.img,
                          img_url: department.img_url,
                          img_name: department.img_name,
                          staff_in_charge: department.staff_in_charge.id,
                          services: department.services,
                          name: department.name,
                          description: department.description,
                        });
                        setShowDeleteModal(true);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for adding a new testimonial */}
      <Modal showmodal={showModal} toggleModal={() => closeModal()}>
        <div className="modal-body">
          {addorupdate.state ? (
            <DepartmentForm
              addorupdate={addorupdate}
              department={department}
              setDepartment={setDepartment}
              OrganizationData={OrganizationData}
              handleSubmit={handleSubmit}
              closeModal={closeModal}
              setAlert={setAlert}
              setDepts={setDepts}
              depts={depts}
            />
          ) : null}
        </div>
      </Modal>
      <Modal
        showmodal={showdeleteModal}
        toggleModal={() => setShowDeleteModal(false)}
      >
        <div className="modal-body">
          <div className="mt-4">
            <h4>Delete Department</h4>
            <p>Are you sure you want to delete this Department?</p>
            <button
              className="btn btn-accent-secondary border-0 text-secondary mt-3 rounded"
              onClick={() => {
                deleteTestimonial(department.id);
              }}
            >
              Delete Testimonial
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Depts;
