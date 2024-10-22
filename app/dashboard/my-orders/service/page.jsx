"use client";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/custom/PageTitle/PageTitle";
import ServicesPlaceholder from "@/components/custom/ImagePlaceholders/ServicesPlaceholder";
import useSWR from "swr";
import { fetchService, servicesAPIendpoint } from "@/data/services/fetcher";
import { PulseLoader } from "react-spinners";

const ServicePage = () => {
  const searchParams = useSearchParams();
  const servicetoken = searchParams.get("servicetoken");

  const {
    data: service,
    isLoading: loadingService,
    error: error,
  } = useSWR(
    servicetoken
      ? `${servicesAPIendpoint}/service_by_token/${servicetoken}/`
      : null,
    fetchService
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageTitle pathname="Service" />

      {loadingService && !error && (
        <div className="d-flex justify-content-center">
          <PulseLoader size={9} color={"#12000d"} loading={true} />
        </div>
      )}

      {!loadingService && service && (
        <div>
          <h3 className="text-center">Service Flow</h3>
          <div
            className="card p-3 mx-auto my-4 p-4"
            style={{
              maxWidth: "650px",
            }}
          >
            <div className="d-flex flex-column justify-content-center gap-3">
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
              <div>
                <h5>{service?.name}</h5>
                <p
                  className="mb-1"
                  style={{
                    color: "var(--bgDarkerColor)",
                  }}
                >
                  {service?.category.category} Service
                </p>
                <hr />
              </div>
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
      )}
    </div>
  );
};

export default ServicePage;
