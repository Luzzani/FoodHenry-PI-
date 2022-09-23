import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function LogoutButton({ className }) {
  const { logout } = useAuth0();

  return (
    <>
      <button onClick={() => logout()} className={className}>
        Logout
      </button>
      <Link to={"/profile"}>
        <button className={className}>Profile</button>
      </Link>
    </>
  );
}

export default LogoutButton;
