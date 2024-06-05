import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegFileImage } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";

const ProfileForm = ({ setAlert, setEditMode }) => {
  const { data: session } = useSession();
  const [fileName, setFileName] = useState("No Selected file");
  const fileInput = useRef(null);
  const [formData, setFormData] = useState({
    image: "",
    first_name: "",
    last_name: "",
    sex: "",
    email: "",
    Phonenumber: "",
    address: "",
  });

  useEffect(() => {
    if (session) {
      setFileName("my profile picture");
      setFormData({
        image: session.user.image,
        first_name: session.user.first_name,
        last_name: session.user.last_name,
        sex: session.user.sex,
        email: session.user.email,
        Phonenumber: session.user.phone,
        address: session.user.address,
      });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/update/${session?.user?.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAlert(
            {
              show: true,
              message: `Profile updated successfully, you may need to login again to see the changes, your Data will be preserved.`,
              type: "success",
            },
            setTimeout(() => {
              setAlert({ show: false, message: "", type: "" });
            }, 10000)
          );
          setEditMode(false);
        } else {
          setAlert(
            {
              show: true,
              message: "an error occurred while updating your profile",
              type: "danger",
            },
            setTimeout(() => {
              setAlert({ show: false, message: "", type: "" });
            }, 3000)
          );
          setEditMode(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="card p-4 p-md-4 mx-auto" style={{ maxWidth: "600px" }}>
        <form className="px-2" onSubmit={handleSubmit}>
          <div>
            <i
              className="bi bi-x h3 text-primary float-end"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditMode(false);
              }}
            ></i>
            <h4 className="text-center">edit Profile</h4>
            <p className="text-center">Edit your profile information</p>
          </div>

          <hr />
          {/* custom picture uploader */}
          <div className="form-profile">
            <input
              ref={fileInput}
              type="file"
              id="file"
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files[0])
                  setFormData({
                    ...formData,
                    // headshot: URL.createObjectURL(files[0]),
                    image: `${files[0].name}`,
                  });
              }}
              hidden
            />

            {/* display the image or the icon */}
            <div>
              <div className="d-flex align-items-center mt-2">
                <div>
                  {formData.image ? (
                    <img
                      src={formData.image}
                      className="rounded-circle object-fit-cover me-3"
                      alt="profile"
                      height={75}
                      width={75}
                      style={{ objectPosition: "top center" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle text-white d-flex justify-content-center align-items-center me-2"
                      style={{
                        width: 80,
                        height: 80,
                        fontSize: 40,
                        backgroundColor: "var(--bgDarkerColor)",
                      }}
                    >
                      {session?.user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-accent-primary shadow-none mt-3"
                    disabled
                    onClick={(e) => {
                      e.preventDefault();
                      fileInput.current.click();
                    }}
                  >
                    <LuUpload className="h5 me-2" />
                    {formData.image ? "Change Image" : "Upload Image"}
                  </button>
                </div>
              </div>

              {/* display the file name & the delete icon */}
              <div className="d-flex align-items-center rounded py-3">
                <FaRegFileImage className="h4 text-primary" />
                <p className="font-medium text-sm mt-2 mx-3 mb-2">{fileName}</p>
                {formData.image && (
                  <FaTimes
                    className="h-5 w-6 text-danger ms-2"
                    onClick={() => {
                      setFileName("No Selected file");
                      setFormData({
                        ...formData,
                        image: null,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* firstname */}
          <div className="row mt-2">
            <div className="col-12 col-md-6 mb-4">
              <label
                htmlFor="first_name"
                className="form-label text-primary fw-bold"
              >
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="first name ..."
                value={formData.first_name || ""}
                onChange={(e) => {
                  setFormData({ ...formData, first_name: e.target.value });
                }}
              />
            </div>

            {/* lastname */}
            <div className="col-12 col-md-6 mb-4">
              <label
                htmlFor="last_name"
                className="form-label text-primary fw-bold"
              >
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="full name ..."
                value={formData.last_name || ""}
                onChange={(e) => {
                  setFormData({ ...formData, last_name: e.target.value });
                }}
              />
            </div>

            {/* Gender */}
            <div className="col-12 col-md-6 mb-2">
              <p className="text-primary fw-bold mb-0">Gender</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={formData.sex === "male"}
                  value="male"
                  onChange={(e) => {
                    setFormData({ ...formData, sex: e.target.value });
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={formData.sex === "female"}
                  value="female"
                  onChange={(e) => {
                    setFormData({ ...formData, sex: e.target.value });
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  female
                </label>
              </div>
            </div>

            {/* email */}
            <div className="col-12 col-md-6 mb-4">
              <label
                htmlFor="email"
                className="form-label text-primary fw-bold"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={formData.email || ""}
                readOnly
              />
            </div>

            {/* Phone number */}
            <div className="col-12 col-md-6 mb-4">
              <label
                htmlFor="Phonenumber"
                className="form-label text-primary fw-bold"
              >
                <i className="bi bi-telephone-fill me-2"></i> Phone number
              </label>
              <input
                type="text"
                className="form-control"
                id="Phonenumber"
                placeholder="your Phonenumber"
                value={formData.Phonenumber || ""}
                onChange={(e) => {
                  setFormData({ ...formData, Phonenumber: e.target.value });
                }}
              />
            </div>

            {/* Phone number */}
            <div className="col-12 col-md-6 mb-4">
              <label htmlFor="text" className="form-label text-primary fw-bold">
                <i className="bi bi-geo-alt-fill me-2"></i> Address
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="enter your Address"
                value={formData.address || ""}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="d-flex flex-md-row justify-content-end flex-column flex-md-fill my-3">
            <button
              className="btn btn-secondary rounded me-0 mb-3 me-md-2 mb-md-0"
              onClick={() => setEditMode(false)}
            >
              cancel
            </button>
            <button className="btn btn-primary rounded" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
