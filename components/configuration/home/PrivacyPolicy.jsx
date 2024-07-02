import Alert from "@/components/Alert/Alert";
import Tiptap from "@/components/Richtexteditor/Tiptap";
import React, { useState } from "react";

const PrivacyPolicy = ({ OrganizationData, setOrganizationData }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const editPrivacyPolicy = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/organization/editprivacypolicy/${OrganizationData.id}/`, {
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
          message: "Privacy Policy updated successfully",
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
      <h5>Privacy Policy</h5>
      <hr />
      <p>Add or edit Privacy Policy</p>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <Tiptap
        item={OrganizationData}
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
