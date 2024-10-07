import { emailAPIendpoint, getSentEmail } from "@/data/Emails/fetcher";
import EmailForm from "./EmailForm";
import useSWR from "swr";
import { TbMessageCancel } from "react-icons/tb";

const EmailMessaging = () => {
  // fetch all the messages and populate cache
  const {
    data: sentemails,
    isLoading,
    error,
  } = useSWR(`${emailAPIendpoint}/emails/getsentemails/`, getSentEmail, {
    onSuccess: (data) =>
      data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
  });

  /**
 * @param {string} emailstatus
 */
  const statusComponent = (emailstatus) => {
    switch (emailstatus) {
      case "sending":
        return (
          <span className="d-inline-flex align-content-center justify-content-between badge bg-secondary-light text-secondary px-3 py-2">
            {emailstatus}
            <i className="ms-1 bi bi-three-dots"></i>
          </span>
        );
      case "sent":
        return (
          <span className="d-inline-flex align-content-center justify-content-between badge bg-success-light text-success px-3 py-2">
            {emailstatus}
            <i className="ms-1 bi bi-send-check"></i>
          </span>
        );

      case "failed":
        return (
          <span className="d-inline-flex align-content-center justify-content-between badge bg-danger-light text-danger px-3 py-2">
            {emailstatus}
            <i className="ms-1 bi bi-exclamation-triangle-fill"></i>
          </span>
        );
    }
  };
  return (
    <div>
      <div className="d-flex flex-column flex-md-row gap-5">
        {/* Message Form */}
        <div>
          <h5>Email Templates</h5>
          <div className="card my-3 p-3 px-md-4 py-4">
            <EmailForm />
          </div>
        </div>

        {/* All Sent Messages */}
        <div className="flex-fill d-flex flex-column gap-1 px-3">
          <h5 className="text-center mb-3">Sent Messages</h5>
          {isLoading && (
            <div className=" d-flex align-items-center justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {sentemails?.length > 0
            ? sentemails.map((sentemail) => (
                <div key={sentemail.id} className="card p-4 py-4">
                  <div className="d-flex justify-content-between">
                    <p className="mb-1">
                      <span className="fw-bold">{sentemail.subject}</span>
                    </p>
                    <span
                      className="small"
                      style={{
                        color: "var(--bgDarkerColor)",
                      }}
                    >
                      {new Date(sentemail.created_at).toLocaleTimeString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p>
                    {sentemail.body.length > 100
                      ? `${sentemail.body.slice(0, 100)}...`
                      : sentemail.body}
                  </p>
                  <div className="d-flex">
                    {statusComponent(sentemail.status)}
                  </div>
                </div>
              ))
            : !isLoading && (
                <div className="mx-auto">
                  <div className="text-center">
                    <TbMessageCancel
                      className="mb-2"
                      style={{
                        fontSize: "3.5rem",
                        color: "var(--bgDarkerColor)",
                      }}
                    />
                    <p>No Sent Email found</p>
                  </div>
                </div>
              )}

          {error && <div>An error just occured, please try again later</div>}
        </div>
      </div>
    </div>
  );
};

export default EmailMessaging;
