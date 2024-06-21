import React from "react";

function RecentSalesTable({ items, session }) {
  const handleStatus = (status) => {
    switch (status) {
      case "Completed":
        return "success";
        break;
      case "Pending":
        return "secondary";
        break;
      case "Failed":
        return "danger";
        break;
      default:
        return "secondary";
    }
  };

  return (
    <table className="table table-bordered datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">Order id</th>
          {session?.user?.is_staff ? <th scope="col">Customer</th> : null}
          <th scope="col">Order (Services/Products)</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.slice(0, 10).map((item) => (
            <tr key={item.id}>
              <th scope="row">
                <a href="#">{item.id}</a>
              </th>
              {session?.user?.is_staff ? <td>{item.customer.name}</td> : null}
              <td>
                <a href="#" className="text-primary">
                  <ul className="list-unstyled">
                    {item.services &&
                      item.services.map((service) => (
                        <li key={service.id}>{service.name}</li>
                      ))}
                  </ul>
                </a>
              </td>
              <td>
                <ul className="list-unstyled">
                  {item.services &&
                    item.services.map((service) => (
                      <li key={service.id}>&#8358;{service.price}</li>
                    ))}
                </ul>
              </td>
              <td className="fw-bold">
                &#8358;
                {item.services &&
                  item.services.reduce((acc, item) => acc + item.price, 0)}
              </td>
              <td>
                <span
                  className={`badge text-${handleStatus(
                    item.status
                  )} bg-${handleStatus(item.status)}-light px-2`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center fw-bold  py-4">
              No Order Yet
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default RecentSalesTable;
