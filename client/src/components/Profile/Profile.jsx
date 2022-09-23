import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../LandingPage/LandingPage.css";
function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <img src={user.picture} alt={user.name} />
        </>
      ) : (
        <>
          <h2>You must log in to view your profile</h2>
          <Link to={"/"}>
            <button className="landing__content-button">Go back</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
