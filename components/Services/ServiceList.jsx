// components/ServiceList.js
import React, { useContext, useEffect } from 'react';
import { ServiceContext } from '../context/ServiceContext';

const ServiceList = () => {
  const { services, fetchServices, loading, error } = useContext(ServiceContext);

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Service List</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
