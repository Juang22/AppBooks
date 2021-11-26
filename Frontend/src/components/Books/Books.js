// import { CardBook } from '../CardBook/CardBook';
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { CardBook } from "../CardBook/CardBook";
import "./Books.css";

import Spinner from "react-bootstrap/Spinner";
import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";
import { mdiEmoticonSad } from "@mdi/js";
const basePath = process.env.REACT_APP_ENDPOINT;
export function Books() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { userName, user, setUser, setUserLoggedIn, logout } = useAuthContext();

  // gets the full list of books of the user from the db
  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      method: "GET",
    };
    fetch(`${basePath}/users/books/${userName}`, options)
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setData(result);
      })
      .catch((err) => {
        setIsLoaded(true);
        throw err;
      });
  }, [userName, user.token]);

  // if  the token is not valid or is expired, the user is logged out and redirects to the login page
  if (data.message === "Token not on DB" || data.message === "Expired token") {
    setUser(null);
    setUserLoggedIn(false);
    logout();
    return (
      <div className="error-msg">
        <Icon
          path={mdiAlertCircle}
          title="alert"
          size={1}
          className=" waitAnimate"
        />
        <h4>Session expired</h4>
      </div>
    );
  } //if no data recieved from the db, shows an error
  else if (data.data === undefined) {
    return (
      <div className="error-msg">
        <Icon
          path={mdiAlertCircle}
          title="alert"
          size={1}
          className=" waitAnimate"
        />
        <h4>{data.message}</h4>
      </div>
    );
  } //if length of data is 0, there is no books to show
  else if (data.data.length === 0) {
    return (
      <div className="error-msg">
        <Icon
          path={mdiEmoticonSad}
          title="alert"
          size={1}
          className=" waitAnimate"
        />
        <h4>There is no books in your collection</h4>
      </div>
    );
  } //if isLoaded is false, shows a spinner
  else if (!isLoaded) {
    return (
      <Spinner animation="grow" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } //if there is data, shows the books
  else {
    return (
      <div className="books-container">
        {data.data.map((item, index) => (
          <CardBook key={index} item={item} />
        ))}
      </div>
    );
  }
}
