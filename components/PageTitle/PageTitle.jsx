"use client";
import React from 'react';
import './pageTitle.css';
import NextBreadcrumb from '../Breadcrumb/breadcrumb';

function PageTitle({pathname}) {
  return (
    <div className="pagetitle">
      <h1>{pathname}</h1>
      <NextBreadcrumb capitalizeLinks />
    </div>
  );
}

export default PageTitle;
