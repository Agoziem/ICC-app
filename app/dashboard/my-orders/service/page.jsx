"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/custom/PageTitle/PageTitle";
import { useServiceContext } from "@/data/services/Servicescontext";
import ServicesPlaceholder from "@/components/custom/ImagePlaceholders/ServicesPlaceholder";

// {
//     "id": 11,
//     "organization": {
//       "id": 1,
//       "name": "Innovations Cybercafe"
//     },
//     "preview": null,
//     "img_url": null,
//     "img_name": null,
//     "category": {
//       "id": 6,
//       "category": "application",
//       "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur"
//     },
//     "subcategory": null,
//     "name": "My Application",
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi culpa dolore possimus suscipit assumenda ad id officia consequuntur",
//     "service_token": "c103644e436f453f9185c80634752a1d",
//     "service_flow": "",
//     "price": "3400.00",
//     "number_of_times_bought": 0,
//     "created_at": "2024-06-14T21:39:39.956278Z",
//     "updated_at": "2024-07-20T12:55:45.603150Z",
//     "userIDs_that_bought_this_service": []
//   },

const ServicePage = () => {
  const searchParams = useSearchParams();
  const servicetoken = searchParams.get("servicetoken");
  const [service, setService] = useState(null);
  const { fetchServiceByToken } = useServiceContext();

  // fetch service by token
  useEffect(() => {
    if (servicetoken) {
      fetchServiceByToken(servicetoken).then((data) => {
        setService(data);
      });
    }
  }, [servicetoken]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Service" />
      <div>
        <div>
          <h3 className="text-center">Service Flow</h3>
          <div
            className="card p-3 mx-auto my-4 p-4"
            style={{
              maxWidth: "650px",
            }}
          >
            <div className="d-flex flex-column justify-content-center">
              <div className="mx-auto">
                {service?.preview ? (
                  <img
                    src={service?.img_url}
                    alt="services"
                    width={68}
                    height={68}
                    className="rounded-circle object-fit-cover"
                    style={{ objectPosition: "center" }}
                  />
                ) : (
                  <ServicesPlaceholder
                    width={89}
                    height={89}
                    fontSize="2.5rem"
                  />
                )}
              </div>
              <h4>{service?.name}</h4>
              <p
                className="mb-1"
                style={{
                  color: "var(--bgDarkerColor)",
                }}
              >
                {service?.category.category} Service
              </p>
              <hr />
              <div style={{ width: "100%" }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: service?.service_flow,
                  }}
                  style={{
                    fontSize: "1.1rem",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
