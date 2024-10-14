import Tiptap from "@/components/custom/Richtexteditor/Tiptap";
import React, { useState } from "react";
import Alert from "@/components/custom/Alert/Alert";
import { updateOrganization } from "@/data/organization/fetcher";


/**
 * @param {{ OrganizationData: Organization, mutate: (data?: any) => Promise<void> }} param0
 */
const TermsOfUse = ({ OrganizationData,mutate }) => {
  const [organizationdata,setOrganizationData] = useState(OrganizationData)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const editTermsOfUse = async (e) => {
    e.preventDefault();
    try {
      await mutate(updateOrganization(organizationdata))
      setAlert({
        show: true,
        message: "Terms of Use updated successfully",
        type: "success",
      })
    } catch (error) {
      console.log(error.message)
      setAlert({
        show: true,
        message: "An error occurred",
        type: "danger",
      })
    } finally {
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        })
      }, 3000)
    }
  };

  return (
    <div className="card p-4 py-5">
      <h5>Terms of Use</h5>
      <hr />
      <p>Add or edit Terms of Use</p>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <Tiptap
        item={organizationdata}
        setItem={setOrganizationData}
        keylabel={"terms_of_use"}
      />
      <button
        className="btn btn-primary mt-4 rounded"
        onClick={(e) => {
          editTermsOfUse(e);
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default TermsOfUse;
