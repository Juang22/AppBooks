import { Link } from "react-router-dom";
import "./MenuPublic.css";
const basePath = process.env.REACT_APP_ENDPOINT;
export function MenuPublic() {
  return (
    <div className="menu-public">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li className="menu-item">
          <a href={`${basePath}/api-docs`} target="_blank" rel="noreferrer">
            API doc
          </a>
        </li>
      </ul>
    </div>
  );
}
