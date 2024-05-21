import React from "react";

const StatisticsSection = () => {
  return (
    <section className="statistics px-2 px-md-5">
      <div className="row align-items-center px-0 px-md-4">
        <div className="col-12 col-md text-center text-md-start">
          <h5 className="text-white" style={{
            lineHeight: "1.8rem",
          }}>
            Trust us with your Admission related Services and we will never
            disappoint you.
          </h5>
        </div>
        <div className="col-12 col-md text-center text-md-start">
          <div className="d-flex justify-content-center flex-wrap mt-4 mt-md-0">
            <div className="me-2 mx-md-4">
              <h2 className="text-white">24/7</h2>
              <p className=" text-white small">Active</p>
            </div>
            <div className="mx-2 mx-md-4">
              <h2 className="text-white">200+</h2>
              <p className=" text-white small">clients</p>
            </div>
            <div className="mx-2 mx-md-4">
              <h2 className="text-white">10+</h2>
              <p className="small text-white">Services</p>
            </div>
            <div className="ms-2 mx-md-4">
              <h2 className="text-white">5+</h2>
              <p className=" text-white small">Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
