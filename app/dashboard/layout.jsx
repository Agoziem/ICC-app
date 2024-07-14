import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";
import NavList from "./navList";
import Main from "@/components/Main/Main";
import { SidebartoggleRefProvider } from "@/components/sidebar/sideBarTogglerContext";
import Feedback from "@/components/Feedback/ModalFeedback";

export const metadata = {
  title: "ICC dashboard",
  description:
    "ICC dashboard provides a platform for users to access the Jamb,Postutme, Admission services and applications. It is a dashboard that displays the services and applications, orders, and customers. It also displays the recent activities, recent sales, reports, news, and top-selling items.",
};

const dashboardlayout = ({ children }) => {
  return (
    <div>
      <SidebartoggleRefProvider>
        <Header portalname={"Dashboard"} portallink={"/dashboard"} />
        <SideBar navList={NavList} />
        <div
          className="d-flex flex-column justify-content-between"
          style={{ minHeight: "100vh" }}
        >
          <Main>{children}</Main>
          <Footer />
        </div>
        <BackToTop />
        <Feedback />
      </SidebartoggleRefProvider>
    </div>
  );
};

export default dashboardlayout;
