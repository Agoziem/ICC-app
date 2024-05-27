import React, { useState, useEffect } from 'react';
import CardFilter from "../Card/CardFilter";
import RecentSalesTable from './RecentSalesTable';
import './recentSales.css';

function RecentSales() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('Today');
  const handleFilterChange = filter => {
    setFilter(filter);
  };

  // you need intall the json server to run the backend api
  // npm i json-server -g
  // once installed globally, run the following code in terminal
  // json-server --watch --port 4000 ./api/info.json
  const fetchData = () => {
    fetch('http://localhost:4000/recentsales')
      .then(res => res.json())
      .then(data => {
        setItems(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card recent-sales overflow-auto">
      <div className="d-flex justify-content-end pe-4 pt-3">
        <CardFilter filterChange={handleFilterChange} />
      </div>
      <div className="card-body">
        <h5 className="card-title pb-3">
          Recent Sales <span>| {filter}</span>
        </h5>
        <RecentSalesTable items={items} />
      </div>
    </div>
  );
}

export default RecentSales;
