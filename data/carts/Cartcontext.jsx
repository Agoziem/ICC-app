"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState, createContext, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserContext } from "../users/usercontextdata";
import { useAdminContext } from "../users/Admincontextdata";
import { useRouter } from "next/navigation";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const router = useRouter();
  const { setUserOrder } = useUserContext();
  const { setOrders } = useAdminContext();
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [storedCart, setStoredCart] = useLocalStorage("cart", cart);
  const [total, setTotal] = useState(0);
  const [reference, setReference] = useState("");

  // ----------------------------------------------------
  // Set Cart from local storage
  // ----------------------------------------------------
  useEffect(() => {
    const isEmptyData = !storedCart || Object.keys(storedCart).length === 0;
    if (isEmptyData) {
      setCart([]);
      setTotal(0);
    } else {
      setCart(storedCart);
      const total = storedCart.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
      );
      setTotal(total);
    }
  }, [storedCart]);

  // ----------------------------------------------------
  // Add to Cart
  // ----------------------------------------------------

  const addToCart = (item, type) => {
    const newItem = { ...item, cartType: type };
    setCart([...cart, newItem]);
    setStoredCart([...cart, newItem]);
    setTotal(total + parseFloat(item.price));
  };
  
  // ----------------------------------------------------
  // Remove from Cart
  // ----------------------------------------------------
  const removeFromCart = (itemId, type) => {
    const itemToRemove = cart.find((item) => item.id === itemId && item.cartType === type);
    setCart(cart.filter((item) => !(item.id === itemId && item.cartType === type)));
    setStoredCart(cart.filter((item) => !(item.id === itemId && item.cartType === type)));
    setTotal(total - parseFloat(itemToRemove.price));
  };
  

  // ----------------------------------------------------
  // Reset Cart
  // ----------------------------------------------------
  const resertCart = () => {
    setCart([]);
    setTotal(0);
    setStoredCart([]);
  };

  // ----------------------------------------------------
  // Checkout
  // ----------------------------------------------------

  const checkout = (organizationid) => {
    const order = {
      customerid: session?.user.id,
      services: cart.filter((item) => item.cartType === "service").map((item) => item.id),
      products: cart.filter((item) => item.cartType === "product").map((item) => item.id),
      videos: cart.filter((item) => item.cartType === "video").map((item) => item.id),
      total,
    };
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/addpayment/${organizationid}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setUserOrder((prev) => [...prev, data]);
            setOrders((prev) => [...prev, data]);
            setReference(data.reference);
            router.push(`/dashboard/orders`);
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        reference,
        addToCart,
        removeFromCart,
        resertCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
