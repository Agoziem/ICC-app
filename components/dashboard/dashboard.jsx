import React from "react";
import HorizontalCard from "./Card/horizontalcard";
import RecentActivity from "./RecentactionsSections/RecentActivity";
import RecentSales from "./RecentsalesSection/RecentSales";
import Reports from "./ReportchartsSection/Reports";
import News from "./Newsection/News";
import TopSelling from "./TopsellingSection/TopSelling";

const DashboardBody = () => {
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-4">
              <HorizontalCard
                cardtitle="Orders"
                icon="bi bi-person-fill-gear"
                cardbody="4"
              />
            </div>
            <div className="col-12 col-md-4">
              <HorizontalCard
                cardtitle="Completed Orders"
                icon="bi bi-person-check"
                cardbody="4"
              />
            </div>
            <div className="col-12 col-md-4">
              <HorizontalCard
                cardtitle="Pending Orders"
                icon="bi bi-pause-circle"
                cardbody="0"
              />
            </div>
            <div className="col-12">
              <Reports />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
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
