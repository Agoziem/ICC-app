import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

const FormWrapper = ({
  children,
  headerLabel,
  backButtonlabel,
  backButtonHref,
  showSocial = true,
}) => {
  return (
    <div>
      <div className="text-center">
        <h4>{headerLabel}</h4>

        <div>{children}</div>
        
        <hr />
        {showSocial && (
          <div className="d-flex justify-content-center mb-2">
            <div>
              <FcGoogle
                className="h2 me-5"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
            </div>

            <div>
              <SiFacebook
                className="h2"
                style={{
                  cursor: "pointer",
                  color: "#001A52",
                }}
                onClick={() => {}}
              />
            </div>
          </div>
        )}
        <div className="text-center">
          <Link href={backButtonHref}>{backButtonlabel}</Link>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
