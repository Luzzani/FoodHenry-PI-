import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../LandingPage/LandingPage.css";
import "./Profile.css";
import LoginButton from "../Logbuttons/LoginButton";
import LogoutButton from "../Logbuttons/LogoutButton";
function Profile() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  console.log(useAuth0());

  return (
    <div className="profile__container">
      {isAuthenticated ? (
        <div className="profile__wrapper">
          <div>
            <LogoutButton className="landing__content-button" />
            <Link to={"/createRecipe"}>
            <button className="landing__content-button">Create Recipe</button>
          </Link>
          </div>
          <div className="profile__content">
            <div className="profile__content-top">
              <h2 className="profile__content-nickname">{user.nickname}</h2>
              <img
                src={user.picture}
                alt={user.name}
                className="profile__content-image"
              />
            </div>
            <div className="profile__content-bottom">
              <h2 className="profile__content-title">User: {user.name}</h2>
              <p className="profile__content-email">Email: {user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile__denied">
          <h2>You must log in to view your profile</h2>
          <Link to={"/"}>
            <button className="landing__content-button">Go back</button>
            <span> or </span>
          </Link>
        
          <LoginButton className="landing__content-button" content="Login" />
        </div>
      )}
    </div>
  );
}

export default Profile;
