import React, { useEffect, useState } from "react";
import "./Card.scss";
import axios from "axios";

function Card(props) {
  const cartItem = props.cartItem;
  const fetchCart = props.fetchCart;
  const uid = props.uid;

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_URL}/Products/get/?id=${cartItem.product_id}`
      )
      .then((response) => {
        setProduct(response.data);
      });
  }, [cartItem.product_id]);

  const removeFromCart = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_BACK_URL}/Cart/removeFromCart/${cartItem.id}`
      )
      .then(() => {
        fetchCart(uid);
      });
  };

  return (
    <div id="cart_card_container">
      <h6>
        <span>Name:</span>
        {product.name}
      </h6>
      <h6>
        <span>Price:</span>
        {product.price}$
      </h6>
      <h6>
        <span>Desc:</span>
        {product.description}
      </h6>
      <button onClick={removeFromCart}>Remove From Cart</button>
    </div>
  );
}

export default Card;
