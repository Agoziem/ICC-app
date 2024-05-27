import React from 'react';

function RecentSalesTable({ items,session }) {
  const handleStatus = status => {
    switch (status) {
      case 'Approved':
        return 'success';
        break;
      case 'Pending':
        return 'secondary';
        break;
      case 'Rejected':
        return 'danger';
        break;
      default:
        return 'success';
    }
  };

  return (
    <table className="table table-bordered datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">Order id</th>
          {
            session?.user?.is_staff ? <th scope="col">Customer</th> : null
          }
          <th scope="col">Order (Services/Products)</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody > 
        {items &&
          items.length > 0 &&
          items.map(item => (
            <tr key={item._id}>
              <th scope="row">
                <a href="#">{item._id}</a>
              </th>
              {
                session?.user?.is_staff ? <td>{item.customer}</td> : null
              }
              <td>
                <a href="#" className="text-primary">
                  {item.product}
                </a>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <span className={`badge text-${handleStatus(item.status)} bg-${handleStatus(item.status)}-light px-2`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentSalesTable;
