import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton({className, content}) {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className={className}
    >
      {content}
    </button>
  );
}

export default LoginButton;
