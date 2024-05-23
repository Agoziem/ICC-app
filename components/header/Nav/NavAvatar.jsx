"use client";

import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal/modal";
import { signOut, useSession } from "next-auth/react";

function NavAvatar() {
  const { data: session } = useSession();
  const { currentRoot } = useCurrentUser();
  const [showModal,setShowModal] = useState(false)
  const [loggingOut,setLoggingOut] = useState(false)
  const router = useRouter();

  const logoutDashboard = () => {
    setLoggingOut(true)
    setShowModal(false)
    setLoggingOut(false)
    signOut()
  };

  return (
    <>
      <li className="nav-item dropdown pe-3">
        <a
          className="nav-link nav-profile d-flex align-items-center pe-0"
          href="#"
          data-bs-toggle="dropdown"
        >
          {session?.user.image ? (
            <img
              src={`${session.user.image}`}
              alt="Profile"
              width={35}
              height={35}
              className="rounded-circle object-fit-cover"
              style={{ objectPosition: "top center" }}
            />
          ) : (
            <i className="bi bi-person" style={{ fontSize: "30px" }}></i>
          )}
          <span className="d-none d-md-block dropdown-toggle ps-2">
            {(session?.user.first_name) ||
              (session?.user.username) ||
              "user"}
          </span>
        </a>

        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li className="dropdown-header">
            <h6>
              {(session?.user.first_name) ||
                (session?.user.username) ||
                "user"}
            </h6>
            <span className="d-block">{session?.user.is_staff?"admin":"user"}</span>
            <span>{session?.user.email}</span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <Link
              className="dropdown-item d-flex align-items-center"
              href={`/`}
            >
              <i className="bi bi-house-door"></i>
              <span>Home page</span>
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <Link
              className="dropdown-item d-flex align-items-center"
              href={`/${currentRoot}/profile`}
            >
              <i className="bi bi-person"></i>
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a
              className="dropdown-item d-flex align-items-center"
              href="users-profile.html"
            >
              <i className="bi bi-gear"></i>
              <span>Account Settings</span>
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a
              className="dropdown-item d-flex align-items-center"
              href="pages-faq.html"
            >
              <i className="bi bi-question-circle"></i>
              <span>Need Help?</span>
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <Link
              className="dropdown-item d-flex align-items-center"
              href="/#"
              {...{
                onClick: (e) => {
                  e.preventDefault();
                  setShowModal(true);
                },
              }}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </Link>
          </li>
        </ul>
      </li>

      
      {/* Modal for logout */}
      <Modal showmodal={showModal} toggleModal={() => setShowModal(false)}>
        <div className="modal-body">
          <p className="text-center">Are you sure you want to logout?</p>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-primary me-3"
              onClick={() => {
                logoutDashboard();
              }}
            >
              {loggingOut ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">logging out</span>
                </div>
              ) : (
                "Yes"
              )}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NavAvatar;
