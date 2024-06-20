"use client";
import PageTitle from "@/components/PageTitle/PageTitle";
import React, { useState } from "react";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileCard from "@/components/Profile/ProfileCard";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  return (
    <div style={{minHeight:"100vh"}}>
      <PageTitle pathname="Profile" />
      {editMode ? (
        <ProfileForm setAlert={setAlert} setEditMode={setEditMode} />
      ) : (
        <ProfileCard alert={alert} setEditMode={setEditMode} />
      )}
    </div>
  );
};

export default ProfilePage;
