import React from 'react';

function TopSellingItem({ item }) {
  return (
    <tr>
      <th scope="row">
        <a href="#">
          <img src={item.preview} alt="" className='shadow-sm' />
        </a>
      </th>
      <td>
        <a href="#" className="text-primary fw-bold">
          {item.name}
        </a>
      </td>
      <td>${item.price.toFixed(2)}</td>
    </tr>
  );
}

export default TopSellingItem;
