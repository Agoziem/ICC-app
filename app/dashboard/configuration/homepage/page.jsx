"use client";
import PageTitle from "@/components/PageTitle/PageTitle";
import Messages from "@/components/configuration/home/messages";
import OrganizationCard from "@/components/configuration/home/organizationcard";
import Staffs from "@/components/configuration/home/staffs";
import Subscriptions from "@/components/configuration/home/subscriptions";
import Testimonials from "@/components/configuration/home/testimonials";
import { OrganizationContext } from "@/data/Organizationalcontextdata";
import React, { useContext, useState } from "react";

const HomePageConfigPage = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const {
    OrganizationData,
    setOrganizationData,
    staffs,
    setStaffs,
    testimonials,
    setTestimonials,
    subscriptions,
    setSubscriptions,
    messages,
    setMessages,
  } = useContext(OrganizationContext);


  return (
    <div>
      <PageTitle pathname="homepage" />
      <h3 className="my-3 mt-4">Sections</h3>
      <div className="row justify-content-between">
        <div className="col-md-5">
          <div className="card rounded p-3">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item"
                style={{
                  background: "var(--bgLighterColor)",
                  borderColor: "var(--bgDarkColor)",
                  cursor: "pointer",
                  color: currentSection === 1 ? "var(--secondary)" : "var(--primary)",
                  fontWeight: currentSection === 1 ? "bold" : "",
                }}
                onClick={() => setCurrentSection(1)}
              >
                Organization Details
              </li>
              <li
                className="list-group-item"
                style={{
                  background: "var(--bgLighterColor)",
                  borderColor: "var(--bgDarkColor)",
                  cursor: "pointer",
                  color: currentSection === 2 ? "var(--secondary)" : "var(--primary)",
                  fontWeight: currentSection === 2 ? "bold" : "",
                }}
                onClick={() => setCurrentSection(2)}
              >
                Testimonials & Reviews
              </li>
              <li
                className="list-group-item"
                style={{
                  background: "var(--bgLighterColor)",
                  borderColor: "var(--bgDarkColor)",
                  cursor: "pointer",
                  color: currentSection === 3 ? "var(--secondary)" : "var(--primary)",
                  fontWeight: currentSection === 3 ? "bold" : "",
                }}
                onClick={() => setCurrentSection(3)}
              >
                Staffs & Team
              </li>
              <li
                className="list-group-item"
                style={{
                  background: "var(--bgLighterColor)",
                  borderColor: "var(--bgDarkColor)",
                  cursor: "pointer",
                  color: currentSection === 4 ? "var(--secondary)" : "var(--primary)",
                  fontWeight: currentSection === 4 ? "bold" : "",
                }}
                onClick={() => setCurrentSection(4)}
              >
                Subscriptions
              </li>
              <li
                className="list-group-item"
                style={{
                  background: "var(--bgLighterColor)",
                  borderColor: "var(--bgDarkColor)",
                  cursor: "pointer",
                  color: currentSection === 5 ? "var(--secondary)" : "var(--primary)",
                  fontWeight: currentSection === 5 ? "bold" : "",
                }}
                onClick={() => setCurrentSection(5)}
              >
                Messages
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-7">
          {
            currentSection === 1 && (
              <OrganizationCard OrganizationData={OrganizationData} setOrganizationData={setOrganizationData} />
            )
          }
          {
            currentSection === 2 && (
              <Testimonials testimonials={testimonials} setTestimonials={setTestimonials} OrganizationData={OrganizationData}  />
            )
          }
          {
            currentSection === 3 && (
              <Staffs staffs={staffs} setStaffs={setStaffs} OrganizationData={OrganizationData} />
            )
          }
          {
            currentSection === 4 && (
              <Subscriptions subscriptions={subscriptions} setSubscriptions={setSubscriptions} OrganizationData={OrganizationData} />
            )
          }
          {
            currentSection === 5 && (
              <Messages messages={messages} setMessages={setMessages} OrganizationData={OrganizationData}/>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default HomePageConfigPage;
