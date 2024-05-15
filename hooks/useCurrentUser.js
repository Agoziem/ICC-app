"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminContext } from "@/data/Admincontextdata";
import { UserContext } from "@/data/usercontextdata";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentRoot, setCurrentRoot] = useState("");
  const { adminData } = useContext(AdminContext);
  const { userData } = useContext(UserContext);
  const paths = usePathname();
  const currentPortal = paths;

  useEffect(() => {
    if (currentPortal.includes("/admin")) {
      setCurrentRoot("admin");
      setCurrentUser(adminData);
    } else if (currentPortal.includes("/dashboard")) {
      setCurrentRoot("dashboard");
      setCurrentUser(userData);
    } else {
      setCurrentRoot("");
      setCurrentUser({});
    }
  }, [currentPortal, userData, adminData]);

  return { currentUser, currentRoot };
};

export default useCurrentUser;
