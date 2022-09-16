import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
  return (
    <section className="landing__container">
      <h1>Food Recipes</h1>
      <Link to={'/home'}>Go to Recipies</Link>
    </section>
  );
}

export default LandingPage;
