import React, { useState } from "react";
import Alert from "@/components/custom/Alert/Alert";
import { converttoformData } from "@/utils/formutils";
import OrganizationalForm from "./organizationalform";
import { updateOrganization } from "@/data/organization/fetcher";

/**
 * @param {{ OrganizationData: Organization; mutate: any; }} param0
 */
const OrganizationCard = ({ OrganizationData, mutate }) => {
  const [Organization, setOrganizationData] = useState(OrganizationData);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [editMode, setEditMode] = useState(false);

  const keystofilter = [
    "staffs",
    "testimonials",
    "subscriptions",
    "messages",
    "created_at",
    "last_updated_date",
  ];

  /**
   * Description placeholder
   *
   * @param {Organization} OrganizationDataObj
   * @param {typeof keystofilter} keystoremove
   * @returns {*}
   */
  const filterData = (OrganizationDataObj, keystoremove) => {
    return Object.keys(OrganizationDataObj)
      .filter((key) => !keystoremove.includes(key))
      .reduce((obj, key) => {
        obj[key] = OrganizationDataObj[key];
        return obj;
      }, {});
  };

  const handleSubmit = async (e) => {
    const filteredData = filterData(OrganizationData, keystofilter);
    e.preventDefault();
    // converttoformData(filteredData) convert Form Data later
    mutate(updateOrganization(filteredData), {
      populateCache: true,
    });
    try {
      setAlert({
        show: true,
        message: "Organization details updated successfully",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Error updating organization details",
        type: "danger",
      });
    } finally {
      setEditMode(false);
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="card px-5 py-5">
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {editMode ? (
        <div>
          <div className="float-end">
            <i
              className="bi bi-x h3 text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => setEditMode(false)}
            ></i>
          </div>
          <h3 className="text-center mb-4">Edit Organization Details</h3>
          <OrganizationalForm
            handleSubmit={handleSubmit}
            OrganizationData={Organization}
            setOrganizationData={setOrganizationData}
            setEditMode={setEditMode}
          />
        </div>
      ) : (
        OrganizationData && (
          <div className="">
            <div className="float-end">
              <i
                className="bi bi-pencil-square h5 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => setEditMode(true)}
              ></i>
            </div>
            <img
              src={OrganizationData.Organizationlogo}
              alt="Organization Logo"
              className="rounded-circle mb-2"
              style={{ width: "80px", height: "auto" }}
            />

            <h5 className="mb-3">{OrganizationData.name}</h5>
            <p>{OrganizationData.description}</p>
            <hr />
            <h5>Vision</h5>
            <p>{OrganizationData.vision}</p>
            <hr />
            <h5>Mission</h5>
            <p>{OrganizationData.mission}</p>
            <hr />
            <p className="mb-1">
              <span className="fw-bold">Email:</span> {OrganizationData.email}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Official line:</span>{" "}
              {OrganizationData.phone}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Address:</span>{" "}
              {OrganizationData.address}
            </p>
            <hr />
            <button
              className="btn btn-accent-secondary rounded px-3 mt-3 shadow-none"
              onClick={() => setEditMode(true)}
            >
              edit organization details
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default OrganizationCard;
//
