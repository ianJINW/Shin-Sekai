import type { FC } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import Button from "../components/ui/button";
import FormAuth from "../components/formAuth";

export interface AuthProps {
  mode: "login" | "register";
}

const Auth: FC<AuthProps> = ({ mode }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useAuthStore((state) => state.logout);

  if (isAuth && mode !== "register") {
    // If authenticated and on login page, redirect to dashboard
    return <Navigate to="/" replace />;
  }

  return (
    <main>
      {isAuth ? (
        <fieldset>
          <legend>Log Out</legend>
          <div className="flex flex-col">
            <p>Are you sure?</p>
            <Button
              variant="primary"
              onClick={() => {
                logout();
              }}
              className="text-black"
            >
              Log Out
            </Button>
          </div>
        </fieldset>
      ) : (
        <FormAuth mode={mode} />
      )}
    </main>
  );
};

export default Auth;
