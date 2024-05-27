import React from "react";
import HorizontalCard from "./Card/horizontalcard";
import RecentActivity from "./RecentactionsSections/RecentActivity";
import RecentSales from "./RecentsalesSection/RecentSales";
import Reports from "./ReportchartsSection/Reports";
import News from "./Newsection/News";
import TopSelling from "./TopsellingSection/TopSelling";
import BudgetReport from "./BudgetSection/BudgetReport";
import WebTraffic from "./WebtrafficSection/WebTraffic";
import { useSession } from "next-auth/react";

const DashboardBody = () => {
  const { data: session } = useSession();
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12 col-md-9">
          <div className="row">
            {/* Display the Cards */}
            {session?.user?.is_staff ? (
              <>
                {/* Only Admins */}
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="primary"
                    cardtitle="Services"
                    icon="bi bi-person-fill-gear"
                    cardbody="10"
                    cardspan="Services Available"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="secondary"
                    cardtitle="Orders"
                    icon="bi bi-cart3"
                    cardbody="0"
                    cardspan="Services Ordered"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="success"
                    cardtitle="Customers"
                    icon="bi bi-people"
                    cardbody="4"
                    cardspan="Total Customers"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="primary"
                    cardtitle="Services"
                    icon="bi bi-person-fill-gear"
                    cardbody="4"
                    cardspan="Services/Products"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="secondary"
                    cardtitle="Completed Orders"
                    icon="bi bi-person-check"
                    cardbody="4"
                    cardspan="Completed Orders"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="success"
                    cardtitle="Pending Orders"
                    icon="bi bi-pause-circle"
                    cardbody="0"
                    cardspan="Pending Orders"
                  />
                </div>
              </>
            )}

            {/* Display Analytics Chart for to the Admin & Customers */}
            <div className="col-12">
              <Reports session={session} />
            </div>

            {/* Display Budget Report & Web Traffic to only Admins*/}
            {
              // Only Admins
              session?.user?.is_staff ? (
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <BudgetReport />
                    </div>
                    <div className="col-12 col-md-6">
                      <WebTraffic />
                    </div>
                  </div>
                </div>
              ) : null
            }

            {/* Display the Resent Orders to Admin OR Orders purchased to customers */}
            <div className="col-12">
              <RecentSales session={session} />
            </div>

            {/* Display Services & Products Available */}
            <div className="col-12">
              <TopSelling />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div>
            <RecentActivity />
          </div>
          <div>
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
