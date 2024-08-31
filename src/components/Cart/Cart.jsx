import React, { useContext, useEffect, useState } from "react";
import "./Cart.scss";
import { UserContext } from "../../App";
import axios from "axios";
import Card from "./Card/Card";

function Cart() {
  const [user] = useContext(UserContext);
  const [cart, setCart] = useState([]);

  const fetchCart = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACK_URL}/Cart/get/?id=${id}`)
      .then((res) => {
        setCart(res.data);
      });
  };
  useEffect(() => {
    fetchCart(user.id);
  }, [user.id]);

  return (
    <div id="cart_container">
      <h1>Cart</h1>
      <div id="cart_item_list">
        {cart.map((pro, index) => {
          return (
            <Card
              fet={fetchCart}
              key={index}
              cartItem={pro}
              fetchCart={fetchCart}
              uid={user.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
