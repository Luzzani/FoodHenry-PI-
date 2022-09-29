import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./LandingPage.css";

import LoginButton from "../Logbuttons/LoginButton";
import LogoutButton from "../Logbuttons/LogoutButton";

function LandingPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <section className="landing__container">
      {isAuthenticated ? (
        <>
          <LogoutButton className="landing__content-button" />
          <Link to={"/profile"}>
            <button className="landing__content-button landgin__profile-btn">
              Profile
            </button>
          </Link>
        </>
      ) : (
        <LoginButton className="landing__content-button" content={"Login"} />
      )}

      <h1>Recipes & Recipes</h1>
      <div className="landing__content">
        <article className="landing__content-text">
          <h2 className="landing__content-title">About Us</h2>
          <p className="landing__text">
            Find on our page all kinds of recipes, from the healthiest to the
            fattest. You can filter by type of diet, by its healthy level, and
            by name! By generating a user, you can contribute with your own
            recipes, following the corresponding instructions. You can create
            and delete your own recipes{" "}
            <LoginButton
              className="landing__content-button"
              content={"Register Free"}
            />
          </p>
        </article>
        <Link to={"/home"}>
          <button className="landing__content-button landing__button">
            Go to Recipies
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
