import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";

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

  useEffect(() => {
    setFileName(formData[imagename]);
    setImage(formData[imageurlkey]);
  }, [formData[imagename], formData[imageurlkey]]);

  return (
    <div>
      <div className="d-flex align-items-center mt-2">
        <input
          ref={fileInput}
          type="file"
          id="file"
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files[0]) {
              setImage(URL.createObjectURL(files[0]));
              setFormData({
                ...formData,
                [imagekey]: files[0],
              });
            }
          }}
          hidden
        />

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
            onClick={() => {
              setFileName("No Selected file");
              setImage(null);
              setFormData({
                ...formData,
                [imagekey]: null,
              });
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleImageUploader;
