import { Link } from "react-router-dom";
import "./Menu.css";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

import Icon from "@mdi/react";
import { mdiAccountEdit, mdiLogout } from "@mdi/js";

import { NavDropdown } from "react-bootstrap";
const basePath = process.env.REACT_APP_ENDPOINT;

export function Menu() {
  const { userName, setUser, setUserLoggedIn, logout } = useAuthContext();

  const handleClickLogout = () => {
    setUser(null);
    setUserLoggedIn(false);
    logout();
  };

  return (
    <div className="Menu">
      <ul>
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/private">Books</Link>
        </li>
        <li className="menu-item">
          <a href={`${basePath}/api-docs`} target="_blank" rel="noreferrer">
            API doc
          </a>
        </li>
        <li id="username">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={`WELCOME, ${userName.toUpperCase()}!`}
            menuVariant="dark"
            size="sm"
            align="end"
            autoClose="true"
          >
            <NavDropdown.Item className="username-item">
              <Link to="/settings">
                <Icon
                  path={mdiAccountEdit}
                  title="User Profile"
                  size={0.8}
                  color="#def1f0"
                />
                {" Settings"}
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="username-item">
              <Link to="/" onClick={handleClickLogout}>
                <Icon
                  path={mdiLogout}
                  title="User Profile"
                  size={0.8}
                  color="#def1f0"
                />
                {"Logout"}
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </li>
      </ul>
    </div>
  );
}
