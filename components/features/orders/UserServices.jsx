import { useUserContext } from "@/data/users/usercontextdata";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PiEmptyBold } from "react-icons/pi";
import ServicesPlaceholder from "../../custom/ImagePlaceholders/ServicesPlaceholder";
import Link from "next/link";

const UserServices = () => {
  const { userOrder } = useUserContext();
  const { data: session } = useSession();
  const [paidServices, setPaidServices] = useState([]);

  useEffect(() => {
    if (userOrder.length > 0 && session?.user?.id) {
      const userId = parseInt(session.user.id);
      const allPaidServices = userOrder.flatMap((order) =>
        order.services.filter((service) =>
          service.userIDs_that_bought_this_service.includes(userId)
        )
      );
      setPaidServices(allPaidServices);
    }
  }, [userOrder, session]);

  return (
    <div className="row">
      <h4 className="my-3">Services Purchased</h4>
      {paidServices.length > 0 ? (
        paidServices.map((service) => (
          <div key={service.id} className="col-12 col-md-4">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  {service.preview ? (
                    <img
                      src={service.img_url}
                      alt="services"
                      width={68}
                      height={68}
                      className="rounded-circle object-fit-cover"
                      style={{ objectPosition: "center" }}
                    />
                  ) : (
                    <ServicesPlaceholder />
                  )}
                </div>
                <div className="flex-fill">
                  <h6 className="text-capitalize">{service.name}</h6>
                  <p className="text-capitalize mb-1">
                    {service.description.length > 80 ? (
                      <span>{service.description.substring(0, 80)}... </span>
                    ) : (
                      service.description
                    )}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="small mb-1">
                      {service.category.category} Service
                    </p>
                    <div
                      className="badge bg-primary-light text-primary py-2 px-2"
                      style={{ cursor: "pointer" }}
                    >
                      {
                        // check if the service is already completed for the user
                        service.userIDs_whose_services_have_been_completed.includes(
                          parseInt(session.user.id)
                        ) ? (
                          <span>Service Completed</span>
                        ) : (
                          <Link
                            href={`/dashboard/my-orders/service?servicetoken=${service.service_token}`}
                            className="text-primary"
                          >
                            View Service Flow
                          </Link>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <PiEmptyBold
            className="mt-2"
            style={{ fontSize: "6rem", color: "var(--bgDarkerColor)" }}
          />
          <h4>Services</h4>
          <p>you have not ordered any Service so far</p>
        </div>
      )}
    </div>
  );
};

export default UserServices;
