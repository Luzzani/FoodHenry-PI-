import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton({ className }) {
  const { logout } = useAuth0();

  return (
    <>
      <button
        onClick={() => logout({ returnTo: window.location.origin })}
        className={className}
      >
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
