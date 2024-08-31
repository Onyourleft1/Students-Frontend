import React, { useEffect, useState } from "react";
import "./Card.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Card(props) {
	const product = props.product;
	const navigate = useNavigate();
	const [image, setImage] = useState("");

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
	}, [product.id]);

	return (
		<div id="card_container">
			<img
				src={image}
				alt="iii"
				onClick={(e) => {
					e.preventDefault();
					navigate(`/products/${product.name}`);
				}}
			/>
			<h4
				onClick={(e) => {
					e.preventDefault();
					navigate(`/products/${product.name}`);
				}}
			>
				{product.name}
			</h4>
			<h5>{product.price}$</h5>
			<Link to={`/products/${product.name}`}>View Product</Link>
		</div>
	);
}

export default Card;
