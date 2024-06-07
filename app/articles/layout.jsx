import React from "react";
import BackToTop from "@/components/backtotopbutton/BackToTop";
import MainHeader from "@/components/header/Mainheader/MainHeader";
import FooterSection from "@/sections/footerSection";
import styles from "./articlelayout.module.css";

const ArticleLayout = ({ children }) => {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      <MainHeader />
      <section className={styles.articlelayout}>{children}</section>
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default ArticleLayout;
