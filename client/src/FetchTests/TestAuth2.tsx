//создали страаницу. Далее в апп.тхс
//эта страница будет доступна только авторизованным

import React from "react";
import { useAuth } from "../App";

export const TestAuth2 = () => {
  const { onLogout, token } = useAuth();
  console.log(token);
  return (
    <div>
      <h1>TEST AUTH 2 </h1>
      <p>Authenticated as {token}</p>
      {token && (
        <button type="button" onClick={onLogout}>
          Sign out
        </button>
      )}
    </div>
  );
};
