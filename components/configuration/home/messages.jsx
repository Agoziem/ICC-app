import React, { useEffect, useState } from "react";
import Alert from "@/components/Alert/Alert";
import Modal from "@/components/Modal/modal";
import { MdAlternateEmail } from "react-icons/md";

const Messages = ({ messages, setMessages, OrganizationData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [message, setMessage] = useState({
    id: "",
    name: "",
    subject: "",
    message: "",
    email: "",
    created_at: "",
  });
  const [reply, setReply] = useState({
    name: "",
    sending_email: "",
    recieving_email: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/emailsapi/delete_email/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const newMessages = messages.filter((message) => message.id !== id);
        setMessages(newMessages);
        setAlert({
          show: true,
          message: "Message Deleted Successfully",
          type: "success",
        });
      } else {
        throw new Error("Error Deleting Message");
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Error Deleting Message",
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteMode(false);
    setReply({
      name: "",
      sending_email: "",
      recieving_email: "",
      subject: "",
      message: "",
    });
    setMessage({
      id: "",
      name: "",
      subject: "",
      message: "",
      email: "",
      created_at: "",
    });
  };

  // send a reply to a message
  const replyToMessage = async (e) => {
    e.preventDefault();
    try {
      console.log(reply);
      setAlert({
        show: true,
        message: "Message Sent Successfully",
        type: "success",
      });
      // const res = await fetch("/api/messages", {
      //   method: "POST",
      //   body: JSON.stringify(reply),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (res.status === 201 || res.status === 200) {
      //   setAlert({
      //     show: true,
      //     message: "Message Sent Successfully",
      //     type: "success",
      //   });
      // } else {
      //   throw new Error("Error Sending Message");
      // }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Error Sending Message",
        type: "danger",
      });
    } finally {
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
      closeModal();
    }
  };

  return (
    <div className="px-1 px-md-4">
      <h4>Messages</h4>
      {alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="card my-3 p-3">
            <div className="card-body">
              <div className="mb-3">
                <div>
                  <MdAlternateEmail
                    className="float-end text-primary"
                    style={{ fontSize: "35px" }}
                  />
                </div>
                <p className="card-text">{message.message}</p>
              </div>

              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: "30px",
                    backgroundColor: "var(--bgDarkerColor)",
                  }}
                >
                  {message.name?.charAt(0).toUpperCase()}
                </div>

                <div className="ms-3">
                  <h6 className="mb-1">{message.name}</h6>
                  <p className="my-0 small text-break">{message.email}</p>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                <div className="text-primary small">
                  {new Date(message.created_at).toDateString()}
                </div>
                <div className="mt-2 mt-md-0">
                  <button
                    className="btn btn-accent-secondary rounded small mx-0 me-2 mx-md-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setMessage(message);
                      setReply({
                        ...reply,
                        name: OrganizationData.name,
                        sending_email: OrganizationData.email,
                        recieving_email: message.email,
                      });
                      setShowModal(true);
                    }}
                  >
                    reply to message
                  </button>

                  <button
                    className="btn btn-sm btn-danger rounded px-3"
                    onClick={() => {
                      setMessage(message);
                      setDeleteMode(true);
                      setShowModal(true);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="my-3">
          <h6 className="">No Messages Yet</h6>
        </div>
      )}

      <Modal
        showmodal={showModal}
        toggleModal={() => {
          closeModal();
        }}
      >
        {!deleteMode ? (
          <div>
            <p className="mb-1 small">reply with {reply.sending_email}</p>
            <h5>{message.name}</h5>
            <hr />
            <form onSubmit={replyToMessage}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={reply.name}
                  readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email to send message</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={reply.recieving_email}
                  readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={reply.subject}
                  onChange={(e) =>
                    setReply({ ...reply, subject: e.target.value })
                  }
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  value={reply.message}
                  onChange={(e) =>
                    setReply({ ...reply, message: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-accent-secondary rounded"
                >
                  Reply email
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <p className="mb-1">
              Are you sure you want to delete this message by
            </p>
            <h5 className="mb-3">{message.name} ?</h5>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-sm btn-danger rounded px-3 me-3"
                onClick={() => {
                  deleteMessage(message.id);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-accent-secondary rounded px-3"
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;
