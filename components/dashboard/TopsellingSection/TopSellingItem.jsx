import { useCart } from "@/data/Cartcontext";
import React from "react";

function TopSellingItem({ item }) {
  const { cart, addToCart, removeFromCart } = useCart();
  return (
    <tr>
      <th scope="row">
        {item.img_url ? (
          <img src={item.img_url} alt="" className="shadow-sm" />
        ) : (
          <div
            className="rounded d-flex justify-content-center align-items-center"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "var(--bgDarkColor)",
              color: "var(--bgDarkerColor)",
            }}
          >
            <i className="bi bi-person-fill-gear h3 mb-0"></i>
          </div>
        )}
      </th>
      <td className="text-primary fw-bold">{item.name}</td>
      <td>{item.category.category}</td>
      <td>&#8358;{parseFloat(item.price)}</td>
      <td>
        {cart.find((service) => service.id === item.id) ? (
          <span
            className="badge bg-secondary-light text-secondary p-2"
            style={{ cursor: "pointer" }}
            onClick={() => removeFromCart(item.id)}
          >
            remove Service {"  "}
            <i className="bi bi-cart-dash"></i>
          </span>
        ) : (
          <span
            className="badge bg-success-light text-success p-2"
            style={{ cursor: "pointer" }}
            onClick={() => addToCart(item)}
          >
            Add Service {"  "}
            <i className="bi bi-cart-plus"></i>
          </span>
        )}
      </td>
    </tr>
  );
}

export default TopSellingItem;
