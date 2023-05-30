//создали страаницу. Далее в апп.тхс
//эта страница будет доступна только авторизованным

import React from "react";
import { useAuth } from "../App";

export const TestAuth2 = () => {
  const { onLogout, token } = useAuth();
  return (
    <div>
      <h1>TEST AUTH 2 </h1>
      Authenticated as {token}
      {token && (
        <button type="button" onClick={onLogout}>
          Sign out
        </button>
      )}
    </div>
  );
};
