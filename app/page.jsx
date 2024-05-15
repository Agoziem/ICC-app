import styles from "./page.module.css";
import HeaderSection from "@/sections/headerSection";
import StatisticsSection from "@/sections/statisticsSection";
import AboutSection from "@/sections/aboutSection";
import ServicesSection from "@/sections/servicesSection";
import ProductsSection from "@/sections/productsSection";
import TestimonialSection from "@/sections/testimonialSection";
import StaffSection from "@/sections/staffSection";
import ContactSection from "@/sections/contactSection";
import SubscriptionSection from "@/sections/subscriptionSection";
import FooterSection from "@/sections/footerSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeaderSection />
      <StatisticsSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialSection />
      <StaffSection />
      <ContactSection />
      <SubscriptionSection />
      <FooterSection />
    </main>
  );
}
