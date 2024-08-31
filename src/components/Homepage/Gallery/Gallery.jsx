import React, { useContext } from "react";
import "./Gallery.scss";
import { ProductContext } from "../../../App";
import Card from "./Card/Card";

function Gallery() {
	const [products] = useContext(ProductContext);
	return (
		<div id="gallery_container">
			<h2>Gallery</h2>
			<div id="container">
				{products.map((product, index) => {
					return <Card key={index} product={product} />;
				})}
			</div>
		</div>
	);
}

export default Gallery;
