import { createContext, useContext, useState } from "react";
import { LoginService } from "../../services";

const AuthContext = createContext();

const initialState = null;
const initialStateUser = false;
const initialUsername = "";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);

  const [userLoggedIn, setUserLoggedIn] = useState(initialStateUser);
  const [userName, setUserName] = useState(initialUsername);
  const [userExists, setUserExists] = useState(false);

  const login = ({ username, password }, onLogin) => {
    LoginService.login(username, password).then((result) => {
      setUser(result); //recieves user.token user.username if the user is in the db, else recieves undefined  and a message

      if (result === undefined) {
        setUserLoggedIn(false);
        onLogin(false);
      } else {
        setUserLoggedIn(true);
        onLogin(true);
        setUserName(result.username);
      }
    });
  };

  const logout = (onLogout) => {
    LoginService.logout(user.username, user.token).then(() => {
      setUser(null);
      if (onLogout) {
        onLogout();
      }
    });
  };

  const register = ({ username, password, passwordConfirm }, onRegister) => {
    const userRegister = { username, password, passwordConfirm };
    LoginService.register(userRegister).then((result) => {
      if (!!result.data) {
        // username created succesfuly
        setUserExists(true);
        onRegister(true);
      } else {
        onRegister(false);
      }
    });
  };

  const settings = (
    { userName, email, first_name, last_name, address, phone },
    onSettings
  ) => {
    const userSettings = {
      user,
      userName,
      email,
      first_name,
      last_name,
      address,
      phone,
    };
    LoginService.settings(userSettings).then(() => {
      onSettings();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        userLoggedIn,
        userName,
        userExists,
        setUser,
        setUserLoggedIn,
        register,
        settings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == null) throw new Error("Missing AuthProvider");
  return context;
}
