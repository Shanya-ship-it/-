//создали страаницу. Далее в апп.тхс
//эта страница будет доступна для всех
//export const TestAuth = ({ onLogin }: { onLogin: React.MouseEventHandler<HTMLButtonElement> }) just
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

export const TestAuth = () => {
  const { onLogin } = useAuth();
  return (
    <>
      <h1>TEST AUTH </h1>
      <button type="button" onClick={onLogin}>
        Sign in
      </button>
    </>
  );
};
