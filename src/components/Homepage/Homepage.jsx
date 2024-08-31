import React from "react";
import Banner from "./Banner/Banner";
import Gallery from "./Gallery/Gallery";
import "./Homepage.scss";

function Homepage() {
  return (
    <div id="homepage_container">
      <Banner />
      <Gallery />
    </div>
  );
}

export default Homepage;
