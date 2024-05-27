"use client";
import React, { useState } from 'react';
import "./card.css";
const HorizontalCard = ({cardtitle,icon,cardbody}) => {
    const [filter, setFilter] = useState('Today');
  // const handleFilterChange = filter => {
  //   setFilter(filter);
  // };

  return (
    
      <div className={`card info-card
        ${cardtitle === "Orders" ? "primary" :
        cardtitle === "Completed Orders" ? "secondary" :
        cardtitle === "Pending Orders" ? "success" :
        "primary"}
      `} >
        <div className="card-body">
          <h5 className="card-title pt-2 pb-3">
            {cardtitle}
          </h5>

          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={icon}></i>
            </div>
            <div className="ps-3">
              <h6>
                {cardbody} 
              </h6>
              <span className="card-small text-muted small pt-2 ps-1">
                {
                  cardtitle === "Orders" ? "orders made" :
                  cardtitle === "Completed Orders" ? "completed orders" :
                  cardtitle === "Pending Orders" ? "pending orders" :
                  "orders made"
                }
              </span>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default HorizontalCard