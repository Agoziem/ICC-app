"use client";
import HorizontalCard from "./Card/horizontalcard";
// import RecentActivity from "./RecentactionsSections/RecentActivity";
import RecentSales from "./RecentsalesSection/RecentSales";
// import Reports from "./ReportchartsSection/Reports";
import News from "./Newsection/News";
import TopSelling from "./TopsellingSection/TopSelling";
import { useSession } from "next-auth/react";
import { useAdminContext } from "@/data/payments/Admincontextdata";
import { useUserContext } from "@/data/payments/usercontextdata";
import CartButton from "../../custom/Offcanvas/CartButton";
import { useServiceContext } from "@/data/services/Servicescontext";
import useSWR from "swr";
import { fetchServices, servicesAPIendpoint } from "@/data/services/fetcher";
import { fetchProducts, productsAPIendpoint } from "@/data/product/fetcher";
import { fetchVideos, vidoesapiAPIendpoint } from "@/data/videos/fetcher";
import { getOrderReport, paymentsAPIendpoint } from "@/data/payments/fetcher";

const DashboardBody = () => {
  const { orders } = useAdminContext();
  const { userOrders } = useUserContext();
  const { data: session } = useSession();
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  const page = 1
  const pageSize = 6

  // fetch Order Report (Customers)
  const { data: orderReport } = useSWR(
    `${paymentsAPIendpoint}/getorderreport/${Organizationid}`,
    getOrderReport
  );

  // fetchServices
  const {
    data: services,
    isLoading: loadingServices,
    error: serviceserror,
  } = useSWR(
    `${servicesAPIendpoint}/services/${Organizationid}/?category=All&page=${page}&page_size=${pageSize}`,
    fetchServices
  );

  // fetchProducts
  const {
    data: products,
    isLoading: loadingProducts,
    error: productserror,
  } = useSWR(
    `${productsAPIendpoint}/products/${Organizationid}/?category=All&page=${page}&page_size=${pageSize}`,
    fetchProducts
  );

   // fetchProducts
   const {
    data: videos,
    isLoading: loadingVideos,
    error: videoerror,
  } = useSWR(
    `${vidoesapiAPIendpoint}/videos/${Organizationid}/?category=All&page=${page}&page_size=${pageSize}`,
    fetchVideos
  );

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
                    cardtitle="Services"
                    icon="bi bi-person-fill-gear"
                    cardbody={services?.count}
                    cardspan="Services"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="secondary"
                    cardtitle="Orders"
                    icon="bi bi-cart3"
                    cardbody={userOrders?.length}
                    cardspan={`Service${userOrders?.length > 1 ? "s" : ""} Ordered`}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <HorizontalCard
                    iconcolor="success"
                    cardtitle="Customers"
                    icon="bi bi-people"
                    cardbody={orderReport?.customers?.length}
                    cardspan={`Total Customer${orderReport?.customers?.length > 1 ? "s" : ""}`}
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
                      cardtitle="Services"
                      icon="bi bi-person-fill-gear"
                      cardbody={services?.count}
                      cardspan="Services"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <HorizontalCard
                      iconcolor="secondary"
                      cardtitle="Orders"
                      icon="bi bi-person-check"
                      cardbody={userOrders?.length}
                      cardspan="Orders"
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <HorizontalCard
                      iconcolor="success"
                      cardtitle="Completed Orders"
                      icon="bi bi-cart-check"
                      cardbody={
                        userOrders &&
                        userOrders.filter((item) => item.status === "Completed")
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

            {/* Display Services Available */}
            <div className="col-12">
              <TopSelling itemName={"Services"} data = {services?.results} itemCount = {services?.count} />
            </div>

            {/* Display Products Available */}
            <div className="col-12">
              <TopSelling itemName={"Products"} data = {products?.results} itemCount = {products?.count} />
            </div>

            {/* Display Videos Available */}
            <div className="col-12">
              <TopSelling itemName={"Videos"} data = {videos?.results} itemCount = {videos?.count} />
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
