import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import { AdminContextProvider } from "@/data/Admincontextdata";
import { UserContextProvider } from "@/data/usercontextdata";
import React from "react";
import NavList from "./navList";
import Main from "@/components/Main/Main";

const dashboardlayout = ({ children }) => {
  return (
    <div>
      <AdminContextProvider>
        <UserContextProvider>
          <Header portalname={"Dashboard"} portallink={"/dashboard"} />
          <SideBar navList={NavList} />
          <Main>{children}</Main>
          <Footer />
          <BackToTop />
        </UserContextProvider>
      </AdminContextProvider>
    </div>
  );
};

export default dashboardlayout;
