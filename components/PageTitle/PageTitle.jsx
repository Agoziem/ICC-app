"use client";
import React from 'react';
import './pageTitle.css';
import NextBreadcrumb from '../Breadcrumb/breadcrumb';

function PageTitle({pathname}) {
  return (
    <div className="pagetitle">
      <h4>{pathname}</h4>
      <NextBreadcrumb capitalizeLinks />
    </div>
  );
}

export default PageTitle;
