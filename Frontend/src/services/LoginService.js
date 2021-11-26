const basePath = process.env.REACT_APP_ENDPOINT;

const LoginService = {
  login: (username, password) => {
    const options = {
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    };

    return fetch(`${basePath}/users/login`, options)
      .then((response) => response.json())
      .then((data) => data.data)
      .catch((err) => {
        throw err;
      });
  },

  register: ({ username, password, passwordConfirm }) => {
    const options = {
      body: JSON.stringify({ username, password, passwordConfirm }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    };

    return fetch(`${basePath}/users/create`, options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  logout: (username, token) => {
    const options = {
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json", Authorization: token },
      method: "POST",
    };

    return fetch(`${basePath}/users/logout`, options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  settings: ({
    user,
    userName,
    email,
    first_name,
    last_name,
    address,
    phone,
  }) => {
    const options = {
      body: JSON.stringify({
        userName,
        email,
        first_name,
        last_name,
        address,
        phone,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      method: "PUT",
    };

    return fetch(`${basePath}/users/settings/${user.username}`, options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },
};

export { LoginService };
