import useSWR from "swr";
import Image from "next/image";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import {
  addusertoProgressorCompleted,
  servicesAPIendpoint,
} from "@/data/services/fetcher";
import "./ServiceUsersTable.css";

/**
 * @param {{ users: ServiceUser[], service: Service, page: string, pageSize: string, currentCategory: string, servicemutate: any }} props
 */
const ServiceUsersTable = ({
  users,
  service,
  page,
  pageSize,
  currentCategory,
  servicemutate,
}) => {
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState(null);

  const { mutate: mutateProgress } = useSWR(
    `${servicesAPIendpoint}/servicesusers/${service?.id}/?category=userIDs_whose_services_is_in_progress&page=${page}&page_size=${pageSize}`
  );
  const { mutate: mutateCompleted } = useSWR(
    `${servicesAPIendpoint}/servicesusers/${service?.id}/?category=userIDs_whose_services_have_been_completed&page=${page}&page_size=${pageSize}`
  );

  // -----------------------------------------
  // status batch
  // -----------------------------------------
  const getUserStatus = (user) => {
    const { id } = user;
    if (service?.userIDs_whose_services_is_in_progress.includes(id))
      return <Badge text="in Progress ..." className="secondary" />;
    if (service?.userIDs_whose_services_have_been_completed.includes(id))
      return <Badge text="Completed" className="success" />;
    return <Badge text="Purchased" className="primary" />;
  };

  const Badge = ({ text, className }) => (
    <div className={`badge bg-${className}-light text-${className} py-2`}>
      {text}
    </div>
  );

  // ------------------------------------------------------
  // Update Service Users and their Cache
  // ------------------------------------------------------
  const updateServiceUser = async (user, endpoint, isInProgress) => {
    startTransition(async () => {
      try {
        await addusertoProgressorCompleted(endpoint);

        // mutate the Service Cache
        await servicemutate(
          (prev) => {
            return {
              ...prev,
              userIDs_whose_services_is_in_progress: isInProgress
                ? prev.userIDs_whose_services_is_in_progress.filter((id) => {
                    console.log(
                      "removed from progress and added userid to completed"
                    );
                    return id !== user.id;
                  })
                : [user.id, ...prev.userIDs_whose_services_is_in_progress],

              userIDs_whose_services_have_been_completed: isInProgress
                ? [user.id, ...prev.userIDs_whose_services_have_been_completed]
                : prev.userIDs_whose_services_have_been_completed,
            };
          },
          { populateCache: true }
        );

        // mutate the Users Completed list Cache
        if (isInProgress) {
          await mutateCompleted(
            (prev) => ({
              ...prev,
              results: [user, ...(prev?.results || [])].sort(
                (a, b) => b.id - a.id
              ),
            }),
            { populateCache: true }
          );

          // mutate the Users in Progress Cache list 
          await mutateProgress(
            (prev) => ({
              ...prev,
              results: prev?.results
                .filter((otheruser) => otheruser.id !== user.id)
                .sort((a, b) => b.id - a.id),
            }),
            { populateCache: true }
          );
        } else {
          // mutate the Users in Progress Cache list 
          await mutateProgress(
            (prev) => ({
              ...prev,
              results: [user, ...(prev?.results || [])].sort(
                (a, b) => b.id - a.id
              ),
            }),
            { populateCache: true }
          );
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setCurrentUser(null);
      }
    });
  };

  // ------------------------------------------------------
  // Update Service Users and their Cache
  // ------------------------------------------------------
  const handleUserServiceUpdate = (user) => {
    const userId = user.id;
    const isInProgress =
      service?.userIDs_whose_services_is_in_progress.includes(userId);
    const endpoint = `${servicesAPIendpoint}/services/${
      service?.id
    }/${userId}/${isInProgress ? "completed" : "in-progress"}/`;

    updateServiceUser(user, endpoint, isInProgress);
  };

  return (
    <div className="card p-4 overflow-auto">
      <table className="table table-bordered">
        <thead>
          <tr>
            {[
              "User ID",
              "Profile",
              "Frequency",
              "Date Joined",
              "Status",
              "Edit",
            ].map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                getUserStatus={getUserStatus}
                isPending={isPending && user === currentUser}
                handleUpdate={() => {
                  setCurrentUser(user);
                  handleUserServiceUpdate(user);
                }}
                service={service}
                currentCategory={currentCategory}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No User found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// -----------------------------
// the User Row
// -----------------------------
const UserRow = ({
  user,
  getUserStatus,
  isPending,
  handleUpdate,
  service,
  currentCategory,
}) => (
  <tr>
    <td>{user?.id}</td>
    <td>
      <UserProfile avatar={user?.avatar_url} username={user?.username} />
    </td>
    <td>{user?.user_count}</td>
    <td>{new Date(user?.date_joined).toLocaleDateString()}</td>
    <td>{getUserStatus(user)}</td>
    <td>
      {isPending ? (
        <PendingIndicator />
      ) : (
        <UserAction
          user={user}
          service={service}
          currentCategory={currentCategory}
          handleUpdate={handleUpdate}
        />
      )}
    </td>
  </tr>
);

// -----------------------------
// the User Profile
// -----------------------------
const UserProfile = ({ avatar, username }) => (
  <div className="d-flex align-items-center gap-3">
    {avatar ? (
      <Image
        src={avatar}
        alt="User Avatar"
        width={30}
        height={30}
        className="rounded-circle"
        style={{ objectFit: "cover", objectPosition: "top center" }}
      />
    ) : (
      <div
        className="rounded-circle text-white d-flex justify-content-center align-items-center flex-shrink-0"
        style={{
          width: 30,
          height: 30,
          fontSize: 15,
          backgroundColor: "var(--bgDarkerColor)",
        }}
      >
        {username?.charAt(0).toUpperCase()}
      </div>
    )}
    <div>{username}</div>
  </div>
);

// -----------------------------
// the User Action
// -----------------------------
const UserAction = ({ user, service, currentCategory, handleUpdate }) => (
  <div className="form-check">
    <label className="form-check-label" htmlFor={`user-checkbox-${user.id}`}>
      {currentCategory === "userIDs_whose_services_have_been_completed"
        ? "Completed"
        : currentCategory === "userIDs_whose_services_is_in_progress"
        ? "Set to Completed"
        : "Set to Progress"}
    </label>
    <input
      className="form-check-input"
      type="checkbox"
      id={`user-checkbox-${user.id}`}
      disabled={
        (service?.userIDs_whose_services_is_in_progress.includes(user.id) &&
          currentCategory === "userIDs_that_bought_this_service") ||
        service?.userIDs_whose_services_have_been_completed.includes(user.id)
      }
      onClick={handleUpdate}
      style={{ cursor: "pointer" }}
    />
  </div>
);

// -----------------------------
// the Pending Indicator
// -----------------------------
const PendingIndicator = () => (
  <div className="d-inline-flex align-items-center gap-2 text-primary">
    updating
    <PulseLoader size={7} color="#27011d" loading={true} />
  </div>
);

export default ServiceUsersTable;
