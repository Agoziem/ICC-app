import styles from "./page.module.css";
import HeaderSection from "@/sections/headerSection";
import StatisticsSection from "@/sections/statisticsSection";
import AboutSection from "@/sections/aboutSection";
import ServicesSection from "@/sections/servicesSection";
import TestimonialSection from "@/sections/testimonialSection";
import StaffSection from "@/sections/staffSection";
import BlogSection from "@/sections/blogSection";
import ContactSection from "@/sections/contactSection";
import FooterSection from "@/sections/footerSection";
import BackToTop from "@/components/backtotopbutton/BackToTop";


export default function Home() {
  return (
    <main className={styles.main}>
      <HeaderSection />
      <StatisticsSection />
      <AboutSection />
      <ServicesSection />
      <StaffSection />
      <BlogSection />
      <TestimonialSection />
      <ContactSection />
      <FooterSection />
      <BackToTop />
    </main>
  );
}

// import React from "react";
