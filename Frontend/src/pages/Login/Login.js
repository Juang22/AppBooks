import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import Swal from "sweetalert2";
import "./Login.css";
import { Form, Card, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (!password || !username) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you have to complete all fields",
        footer: "Try again",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    auth.login({ username, password }, (status) => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.

      if (!status) {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Failed to login",
          showConfirmButton: false,
          timer: 2500,
        });
        const from = location.state?.from?.pathname || "/login";
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: "success",
          title: 'Great"!',
          text: "Welcome!",
          showConfirmButton: false,
          timer: 2500,
        });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <>
      <Header />
      <Card className="card-login">
        <Card.Body>
          <Card.Text>
            <div className="form-login">
              <h3>Login </h3>
              <Form onSubmit={onSubmit} className="form-table">
                <div className="table-login">
                  <div className="input-group-login">
                    <div className="input">
                      {/* <span className="input-group-text">User Name</span> */}

                      <input
                        type="text"
                        aria-label="Username"
                        name="username"
                        className="form-control"
                        placeholder=" User Name"
                      />
                    </div>
                    <div className="input">
                      {/* <span className="input-group-text">Password</span> */}

                      <input
                        type="password"
                        aria-label="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                {/* <input name="username" placeholder="Username" type="text" />
      <input name="password" placeholder="Password" type="password" /> */}
                {/* <button type="submit">Login</button> */}

                <Button variant="outline-warning" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
}
