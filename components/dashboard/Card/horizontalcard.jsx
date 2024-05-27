"use client";
import React, { useState } from "react";
import "./card.css";
import CardFilter from "./CardFilter";
const HorizontalCard = ({ cardspan, iconcolor, cardtitle, icon, cardbody }) => {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div
      className={`card info-card
        ${iconcolor}
      `}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title pt-2 pb-3">{cardtitle}</h5>
          <CardFilter filterChange={handleFilterChange} />
        </div>

        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={icon}></i>
          </div>
          <div className="ps-3">
            <h4>{cardbody}</h4>
            <span className="card-small text-muted small pt-2 ps-1">
              {cardspan}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
