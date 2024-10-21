import Alert from "@/components/custom/Alert/Alert";
import Modal from "@/components/custom/Modal/modal";
import { subscriptionDefault } from "@/constants";
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  MainAPIendpoint,
  updateSubscription,
} from "@/data/organization/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/custom/Pagination/Pagination";

const Subscriptions = () => {
  const OrganizationID = process.env.NEXT_PUBLIC_ORGANIZATION_ID;
  const [subscription, setSubscription] = useState(subscriptionDefault);
  const [showModal, setShowModal] = useState(false);
  const [showdeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSize = "20";

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [addorupdate, setAddorupdate] = useState({
    mode: "",
    state: false,
  });

  // for data fetching
  const {
    data: subscriptions,
    mutate,
    isLoading: loadingSubscriptions,
  } = useSWR(
    `${MainAPIendpoint}/subscription/${OrganizationID}/?page=${page}&page_size=${pageSize}`,
    fetchSubscriptions,
    {
      onSuccess: (data) =>
        data.results.sort(
          (a, b) =>
            new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
        ),
    }
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}&page_size=${pageSize}`);
  };

  // function close Modal
  const closeModal = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setSubscription(subscriptionDefault);
  };

  // function to add or update Subscription
  const addorupdateSubscription = async (e) => {
    e.preventDefault();
    try {
      if (addorupdate.mode === "add") {
        const newSubscription = await createSubscription(subscription);
        await mutate(
          (Subscriptions) => {
            const newSubscriptions = [
              newSubscription,
              ...(Subscriptions?.results || []),
            ];
            return {
              ...Subscriptions,
              results: newSubscriptions.sort(
                (a, b) =>
                  new Date(b.date_added).getTime() -
                  new Date(a.date_added).getTime()
              ),
            };
          },
          {
            populateCache: true,
          }
        );
      } else {
        const updatedSubscription = await updateSubscription(subscription);
        await mutate(
          (Subscriptions) => {
            const otherSubscriptions = (Subscriptions?.results || []).map((o) =>
              o.id === updatedSubscription.id ? updatedSubscription : o
            );
            return {
              ...Subscriptions,
              results: otherSubscriptions.sort(
                (a, b) =>
                  new Date(b.date_added).getTime() -
                  new Date(a.date_added).getTime()
              ),
            };
          },
          {
            populateCache: true,
          }
        );
      }
      setAlert({
        show: true,
        message: `email ${addorupdate.mode}ed successfully`,
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      setAlert({
        show: true,
        message: `An error occured while submitting`,
        type: "danger",
      });
    } finally {
      closeModal();
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  // function to delete Subscription
  /**
   * @param {number} id
   */
  const removeSubscription = async (id) => {
    try {
      const deletedid = await deleteSubscription(id);
      await mutate(
        (Subscriptions) => {
          const otherSubscriptions = Subscriptions.results.filter(
            (Subscription) => Subscription.id !== deletedid
          );
          Subscriptions.results = otherSubscriptions;
          return { ...Subscriptions };
        },
        {
          populateCache: true,
        }
      );
      setAlert({
        show: true,
        message: "email deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting email :", error);
      setAlert({
        show: true,
        message: "An error just occured",
        type: "danger",
      });
    } finally {
      closeModal();
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="px-3 mb-4">
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      <div className="d-flex justify-content-end mb-3">
        {/* button to add new subscription email */}
        <button
          className="btn btn-primary border-0 rounded mb-2 mb-md-0"
          style={{ backgroundColor: "var(--bgDarkerColor)" }}
          onClick={() => {
            setAddorupdate({ mode: "add", state: true });
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add email
        </button>
      </div>
      {subscriptions?.results.length > 0 ? (
        <div>
          <div className="mb-3">
            <h4 className="mb-1" >
              {subscriptions?.count} Subscription
              {subscriptions?.count > 1 ? "s" : ""}
            </h4>
            <p>in total</p>
          </div>

          {/* subscriptions emails list */}
          <ul className="list-group list-group-flush rounded">
            {subscriptions?.results.map((subscription) => (
              <li
                key={subscription.id}
                className="list-group-item d-flex flex-wrap justify-content-between align-items-center p-4 py-md-4 px-md-5"
                style={{
                  background: "var(--bgLightColor)",
                  borderColor: "var(--bgDarkColor)",
                }}
              >
                <div>
                  <h6 className="mb-0 text-break">{subscription.email}</h6>
                  <small>
                    {new Date(subscription.date_added).toDateString()}
                  </small>
                </div>
                <div className="mt-3 mt-md-0">
                  <button
                    className="btn btn-sm btn-accent-secondary me-3 py-1 rounded"
                    onClick={() => {
                      setSubscription(subscription);
                      setAddorupdate({ mode: "update", state: true });
                      setShowModal(true);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger rounded py-1"
                    onClick={() => {
                      setSubscription(subscription);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h5>No Subscriptions yet</h5>
        </div>
      )}

      {!loadingSubscriptions &&
        subscriptions &&
        Math.ceil(subscriptions.count / parseInt(pageSize)) > 1 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(subscriptions.count / parseInt(pageSize))}
            handlePageChange={handlePageChange}
          />
        )}

      {/* update email modal */}
      <Modal showmodal={showModal} toggleModal={() => closeModal()}>
        <div className="modal-header">
          <h5 className="modal-title">
            {addorupdate.mode === "add"
              ? "Add Subscription"
              : "Update Subscription"}
          </h5>
        </div>
        <div className="modal-body">
          <form onSubmit={addorupdateSubscription}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={subscription.email}
                onChange={(e) =>
                  setSubscription({ ...subscription, email: e.target.value })
                }
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-accent-secondary me-2 rounded"
                onClick={() => {
                  closeModal();
                }}
              >
                cancel
              </button>

              <button type="submit" className="btn btn-primary rounded">
                {addorupdate.mode === "add" ? "Add" : "Update"} email
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* delete email modal */}
      <Modal showmodal={showdeleteModal} toggleModal={() => closeModal()}>
        <div>
          <p className="mb-1">{subscription.email}</p>
          <h5 className="mb-3">Are you sure you want to delete this email?</h5>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-2"
              onClick={() => closeModal()}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeSubscription(subscription.id);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Subscriptions;
