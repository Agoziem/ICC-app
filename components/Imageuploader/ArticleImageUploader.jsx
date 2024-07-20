import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import Alert from "../Alert/Alert";

const ArticleImageUploader = ({
  imagekey,
  imageurlkey,
  imagename,
  formData,
  setFormData,
}) => {
  const fileInput = useRef(null);
  const [fileName, setFileName] = useState("No Selected file");
  const [image, setImage] = useState(null);
  const [erroralert, setErrorAlert] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (formData[imageurlkey]) {
      setFileName(formData[imagename]);
      setImage(formData[imageurlkey]);
    }
  }, [formData[imageurlkey], formData[imagename]]);

  const handleFileChange = ({ target: { files } }) => {
    const file = files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorAlert({
          show: true,
          message: "Only image files are allowed",
        });
        setTimeout(() => {
          setErrorAlert({
            show: false,
            message: "",
          });
        }, 3000);
        return;
      }

      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        [imagekey]: file,
      });
    }
  };

  const handleRemoveFile = () => {
    setFileName("No Selected file");
    setImage(null);
    setFormData({
      ...formData,
      [imagekey]: null,
      [imageurlkey]: null,
      [imagename]: null,
    });
    if (fileInput.current) {
      fileInput.current.value = null; // Reset file input value
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mt-2">
        <input
          ref={fileInput}
          type="file"
          accept="image/*" // Restrict file picker to images
          id="file"
          onChange={handleFileChange}
          hidden
        />

        {erroralert.show && <Alert type="danger">{erroralert.message}</Alert>}
        <div>
          {image ? (
            <img
              src={image}
              className="rounded object-fit-cover me-3"
              alt="profile"
              height={150}
              width={150}
              style={{ objectPosition: "top center" }}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center me-3 rounded"
              style={{
                width: "150px",
                height: "150px",
                fontSize: "80px",
                backgroundColor: "var(--bgDarkColor)",
                color: "var(--bgDarkerColor)",
              }}
            >
              <MdOutlineArticle />
            </div>
          )}
        </div>

        <div>
          <p className="mb-2">Article Thumbnail</p>
          <button
            className="btn btn-sm btn-accent-primary shadow-none"
            onClick={(e) => {
              e.preventDefault();
              fileInput.current.click();
            }}
          >
            <LuUpload className="h5 me-2" />
            {image ? "Change Image" : "Upload Image"}
          </button>
        </div>
      </div>
      {/* display the file name & the delete icon */}
      <div className="d-flex align-items-center rounded py-3">
        <FaRegFileImage className="h4 text-primary" />
        <p className="font-medium text-sm mt-2 mx-3 mb-2 text-break">
          {fileName || "No Selected file"}
        </p>
        {formData[imagekey] && (
          <FaTimes
            className="h-5 w-6 text-danger ms-2"
            onClick={handleRemoveFile}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleImageUploader;
