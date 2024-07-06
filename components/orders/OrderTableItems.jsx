import React from "react";
import "./OrderTableItems.css";
import { useSession } from "next-auth/react";

const OrderTableItems = ({ currentItems }) => {
  const { data: session } = useSession();
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
    <div className="card p-3 overflow-auto">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            {
              session?.user?.is_staff && <th scope="col">Customer</th>
            }
            <th scope="col">Services</th>
            <th scope="col">Prices</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Payment ref</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {
                  session?.user?.is_staff && <td>{item.customer.name}</td>
                }
                <td>
                  <ul>
                    {item.services &&
                      item.services.map((service) => (
                        <li key={service.id}>{service.name}</li>
                      ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {item.services &&
                      item.services.map((service) => (
                        <li key={service.id}>&#8358;{service.price}</li>
                      ))}
                  </ul>
                </td>
                <td>
                  {/* total Amount */}
                  &#8358; {item.amount}
                </td>
                <td>
                  {item.reference}
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
              <td colSpan="7" className="text-center">No order found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default OrderTableItems;
