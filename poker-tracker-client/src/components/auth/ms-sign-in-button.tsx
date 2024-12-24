import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./auth.config";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: 'popup' | 'redirect') => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <div>
      <button onClick={() => handleLogin("popup")}>Sign in using Popup</button>
    </div>
  );
};
