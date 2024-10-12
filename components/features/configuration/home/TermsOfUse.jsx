import Tiptap from "@/components/custom/Richtexteditor/Tiptap";
import React, { useState } from "react";
import Alert from "@/components/custom/Alert/Alert";

const TermsOfUse = ({ OrganizationData, setOrganizationData }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  })
  const editTermsOfUse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/organization/edittermsofuse/${OrganizationData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OrganizationData),
      });
      if (res.ok) {
        const data = await res.json();
        setOrganizationData(data);
        setAlert({
          show: true,
          message: "Terms of Use updated successfully",
          type: "success",
        })
      }
    } catch (error) {
      console.log(error);
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
        item={OrganizationData}
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
