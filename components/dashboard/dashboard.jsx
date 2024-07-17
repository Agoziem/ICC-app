import React from "react";
import HorizontalCard from "./Card/horizontalcard";
import RecentActivity from "./RecentactionsSections/RecentActivity";
import RecentSales from "./RecentsalesSection/RecentSales";
import Reports from "./ReportchartsSection/Reports";
import News from "./Newsection/News";
import TopSelling from "./TopsellingSection/TopSelling";
import { useSession } from "next-auth/react";
import { useAdminContext } from "@/data/Admincontextdata";
import { useUserContext } from "@/data/usercontextdata";
import CartButton from "../Offcanvas/CartButton";
import { useServiceContext } from "@/data/Servicescontext";

const DashboardBody = () => {
  const { totalOrders, totalCustomers } = useAdminContext();
  const { userOrder, totalOrder } = useUserContext();
  const { services, applications } = useServiceContext();
  const { data: session } = useSession();
  return (
    <div className="dashboard">
      <div className="my-4 d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-3 mb-md-0 me-2 me-md-0">
          Welcome, {session?.user?.username}
        </h5>
        <CartButton />
      </div>
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
                    cardtitle="Services & Apps"
                    icon="bi bi-person-fill-gear"
                    cardbody={
                      services &&
                      applications &&
                      services.length + applications.length
                    }
                    cardspan="Services/applications"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="secondary"
                    cardtitle="Orders"
                    icon="bi bi-cart3"
                    cardbody={totalOrders}
                    cardspan={`Service${totalOrders > 1 ? "s" : ""} Ordered`}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="success"
                    cardtitle="Customers"
                    icon="bi bi-people"
                    cardbody={totalCustomers}
                    cardspan={`Total Customer${totalCustomers > 1 ? "s" : ""}`}
                  />
                </div>
              </>
            ) : null}

            {
              // Customers
              session?.user?.is_staff === false ? (
                <>
                  <div className="col-12 col-md-4">
                    <HorizontalCard
                      iconcolor="primary"
                      cardtitle="Services & Apps"
                      icon="bi bi-person-fill-gear"
                      cardbody={
                        services &&
                        applications &&
                        services.length + applications.length
                      }
                      cardspan="Services/applications"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <HorizontalCard
                      iconcolor="secondary"
                      cardtitle="Orders"
                      icon="bi bi-person-check"
                      cardbody={totalOrder}
                      cardspan="Orders"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <HorizontalCard
                      iconcolor="success"
                      cardtitle="Completed Orders"
                      icon="bi bi-cart-check"
                      cardbody={
                        userOrder &&
                        userOrder.filter((item) => item.status === "Completed")
                          .length
                      }
                      cardspan="Completed Orders"
                    />
                  </div>
                </>
              ) : null
            }

            {/* Display Analytics Chart for to the Admin & Customers */}
            {/* <div className="col-12">
              <Reports session={session} />
            </div> */}

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
          {/* <div>
            <RecentActivity />
          </div> */}
          <div>
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
