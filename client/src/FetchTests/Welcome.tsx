import { RegUser } from "../FetchTests/RegUsr";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className="app-tab" style={{ whiteSpace: "pre-wrap" }}>
      {`Пожалуйста войдите в систему`}
      <div>
        <Link to="/user">
          <button>Войти</button>
        </Link>
      </div>
    </div>
  );
};
