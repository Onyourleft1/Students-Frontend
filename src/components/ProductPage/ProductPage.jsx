import React, { useContext, useEffect, useState } from "react";
import "./ProductPage.scss";
import axios from "axios";
import { LoginContext, UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

function ProductPage(props) {
  const product = props.product;
  const [image, setImage] = useState("");
  const [login] = useContext(LoginContext);
  const [user] = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_URL}/ProductsFiles/get/${product.id}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setImage(imageUrl);
      })
      .catch((err) => {
        console.error(err.response);
      });
    axios
      .get(
        `${process.env.REACT_APP_BACK_URL}/ProductsGallery/get/${product.id}`
      )
      .then((response) => {
        console.log(response.data);
        setGallery(response.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, [product.id]);

  const addToCart = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACK_URL}/Cart/addToCart`, {
        user_id: user.id,
        product_id: product.id,
        quantity: quantity,
      })
      .then(() => {
        navigate("/cart");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  return (
    <div id="product_page_container">
      <div id="container">
        <img src={image} alt="iii" />
        <div id="info">
          <h1>{product.name}</h1>
          <h3>{product.price}$</h3>
          {login ? (
            <>
              <label htmlFor="qua">Quantity:</label>
              <input
                id="qua"
                type="number"
                onChange={handleQuantity}
                min={1}
                max={product.quantity}
              />
              <button onClick={addToCart}>Add To Cart</button>
            </>
          ) : (
            <p>
              Please <Link to={"/login"}>Login</Link> To add to cart
            </p>
          )}
        </div>
      </div>
      <div id="des">
        <h3>Description:</h3>
        <p>{product.description}</p>
      </div>
      <div id="gallery">
        <h3>Gallery</h3>
        <div id="images">
          {gallery.map((src, i) => {
            return (
              <img
                src={`${process.env.REACT_APP_BACK_URL}/${src.path}`}
                alt={src.name}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
