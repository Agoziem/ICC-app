import Alert from "@/components/custom/Alert/Alert";
import Tiptap from "@/components/custom/Richtexteditor/Tiptap";
import { updateOrganization } from "@/data/organization/fetcher";
import React, { useState } from "react";

/**
 * @param {{ OrganizationData: Organization, mutate: (data?: any) => Promise<void> }} param0
 */
const PrivacyPolicy = ({ OrganizationData, mutate }) => {
  const [organizationdata,setOrganizationData] = useState(OrganizationData)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const editPrivacyPolicy = async (e) => {
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
      <h5>Privacy Policy</h5>
      <hr />
      <p>Add or edit Privacy Policy</p>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <Tiptap
        item={organizationdata}
        setItem={setOrganizationData}
        keylabel={"privacy_policy"}
      />
      <button
        className="btn btn-primary mt-4 rounded"
        onClick={(e) => {
          editPrivacyPolicy(e);
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default PrivacyPolicy;
