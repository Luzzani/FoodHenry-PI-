import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
  return (
    <section className="landing__container">
      <h1>Recipes & Recipes</h1>
      <div>
        <article>
          <h2>About Us</h2>
          <p>
            Find on our page all kinds of recipes, from the healthiest to the
            fattest. You can filter by type of diet, by its healthy level, and
            by name! By generating a user, you can contribute with your own
            recipes, following the corresponding instructions. You can create
            and delete your own recipes <button>Register Free</button>
          </p>
        </article>
      </div>
      <Link to={"/home"}>Go to Recipies</Link>
    </section>
  );
}

export default LandingPage;
