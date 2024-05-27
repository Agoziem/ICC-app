import React, { useContext, useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import useCurrentUser  from "@/hooks/useCurrentUser";
import Modal from "@/components/Modal/modal";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import { useSession } from "next-auth/react";

function NavNotice() {
  const { data: session } = useSession();
  const { currentRoot } = useCurrentUser();
  const [notifications, setNotifications] = useState([]);
  const { OrganizationData } = useContext(OrganizationContext);
  const Django_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL;

  const [user_group, setUserGroup] = useState("");
  const [showmodal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    time: "",
  });

  // const [notificationcheck, setNotificationCheck] = useState(false);

  // set the user group based on the current root
  const changeUserGroup = () => {
    if (currentRoot === "admin") {
      setUserGroup("admin");
    } else if (currentRoot === "dashboard") {
      setUserGroup("dashboard");
    }
  };

  useEffect(() => {
    if (currentRoot) {
      changeUserGroup();
    }
  }, [currentRoot]);

  // fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${Django_URL}/api/get_notifications_by_group/${OrganizationData.id}/${user_group}/`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (OrganizationData.id && user_group) {
      fetchNotifications();
    }
  }, [OrganizationData.id, user_group]);



  // WebSocket Connection for notifications
  // const { error, loading, sendMessage, closeWebSocket } = useWebSocket({
  //   roomprefix: "notice",
  //   room_name: `${user_group}`,
  //   Connect: () => {
  //     console.log("Connected to notice websocket");
  //   },
  //   Disconnect: () => {
  //     console.log("Disconnected from notice websocket");
  //   },
  //   Receive: (e) => {
  //     handleRecieve(e);
  //   },
  // });

  // // handle the received notification
  // const handleRecieve = (e) => {
  //   const newnotice = JSON.parse(e.data);
  //   if (newnotice.action == "delete") {
  //     setNotifications((prevNotifications) =>
  //       prevNotifications.filter((n) => n.id !== newnotice.notification.id)
  //     );
  //   } else if (newnotice.action == "create") {
  //     setNotifications((prevNotifications) => [
  //       newnotice.notification,
  //       ...prevNotifications,
  //     ]);
  //   } else if (newnotice.action == "update") {
  //     return;
  //   }
  // };

  // // handle the update/show notification
  // const handleSend = (notification) => {
  //   // set the modal content
  //   setModalContent({
  //     title: notification.headline,
  //     message: notification.Notification,
  //     time: timeSince(notification.Notificationdate),
  //   });
  //   // show the modal
  //   setShowModal(true);
  //   // if the notification has already been seen by the user, return
  //   if (notification.users_seen.includes(session?.user.id)) {
  //     return;
  //   }
  //   // Update users_seen
  //   notification.users_seen.push(session?.user.id);
  //   const index = notifications.findIndex((n) => n.id === notification.id);
  //   if (index !== -1) {
  //     const updatedNotifications = [...notifications];
  //     updatedNotifications[index] = notification;
  //     setNotifications(updatedNotifications);

  //     // Send the updated notification via WebSocket
  //     sendMessage({
  //       notification: notification,
  //     });
  //   }
  // };

  // shorten the notification message
  const shortenMessage = (message) => {
    if (message.length > 50) {
      return message.substring(0, 50) + "...";
    }
    return message;
  };

  // return the date as a string like 8 days ago, 2 weeks ago, 3 months ago etc
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) === 1 ? " year ago" : " years ago")
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) === 1 ? " month ago" : " months ago")
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) === 1 ? " day ago" : " days ago")
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) === 1 ? " hour ago" : " hours ago")
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) === 1 ? " minute ago" : " minutes ago")
      );
    }
    return (
      Math.floor(seconds) +
      (Math.floor(seconds) === 1 ? " second ago" : " seconds ago")
    );
  };

  return (
    <li className="nav-item dropdown">
      {/* the Notification bell icon */}
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        {notifications.filter(
          (notification) =>
            !notification.users_seen?.includes(session?.user.id)
        ).length > 0 ? (
          <span className="badge bg-danger badge-number">
            {
              notifications.filter(
                (notification) =>
                  !notification.users_seen?.includes(session?.user.id)
              ).length
            }
          </span>
        ) : null}
      </a>

      {/* the Notification drop down header */}
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        {notifications.filter(
          (notification) =>
            !notification.users_seen?.includes(session?.user.id)
        ).length > 0 ? (
          <React.Fragment>
            <li className="dropdown-header text-primary">
              You have{" "}
              {
                notifications.filter(
                  (notification) =>
                    !notification.users_seen?.includes(session?.user.id)
                ).length
              }{" "}
              unread notifications
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="dropdown-header text-primary">
              You have no unread notification at the Moment
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </React.Fragment>
        )}

        {/* the Notification dropdown messages */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <li
                className="notification-item"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleSend(notification);
                }}
              >
                <i
                  className={`bi bi-exclamation-circle  ${
                    notification.users_seen?.includes(session?.user.id)
                      ? "text-muted"
                      : "text-warning"
                  }`}
                ></i>
                <div>
                  <h4
                    className={
                      notification.users_seen?.includes(session?.user.id)
                        ? "text-muted"
                        : ""
                    }
                  >
                    {notification.headline}
                  </h4>
                  <p
                    className={
                      notification.users_seen?.includes(session?.user.id)
                        ? ""
                        : "text-dark"
                    }
                  >
                    {shortenMessage(notification.Notification)}
                  </p>
                  <p>{timeSince(notification.Notificationdate)}</p>
                </div>
              </li>
              {index === notifications.length - 1 ? null : (
                <li key={notification.id}>
                  <hr className="dropdown-divider" />
                </li>
              )}
            </React.Fragment>
          ))
        ) : (
          <li className="notification-item">
            <i className="bi bi-exclamation-circle text-warning"></i>
            <div>
              <h4>Notice</h4>
              <p>No notice available at the moment</p>
            </div>
          </li>
        )}
      </ul>

      <Modal showmodal={showmodal} toggleModal={()=>setShowModal(!showmodal)} >
        <h4>{ modalContent.title}</h4>
        <p className="small text-muted">{modalContent.time}</p>
        <p>{modalContent.message}</p>
        <button className="btn btn-primary" onClick={
          ()=>setShowModal(!showmodal)
        }>
          Close
        </button>
      </Modal>
    </li>
  );
}

export default NavNotice;
