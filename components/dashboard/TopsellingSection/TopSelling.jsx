import React, { useState, useEffect } from 'react';
import TopSellingItem from './TopSellingItem';
import './topSelling.css';

function TopSelling() {
  const [items, setItems] = useState([]);


  // you need intall the json server to run the backend api
  // npm i json-server -g
  // once installed globally, run the following code in terminal
  // json-server --watch --port 4000 ./api/info.json
  const fetchData = () => {
    fetch('http://localhost:4000/topselling')
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
    <div className="card top-selling overflow-auto p-3">

      <div className="card-body pb-0">
        <h5 className="card-title pb-2">
          Services & Products <span>| Top Selling</span>
        </h5>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map(item => <TopSellingItem key={item._id} item={item} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopSelling;
