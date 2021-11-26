import registerValidations from "./validateForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import "./Register.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuthContext();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (!registerValidations(username, password, passwordConfirm)) {
      auth.register({ username, password, passwordConfirm }, (status) => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        if (status) {
          Swal.fire({
            icon: "success",
            title: 'Great"!',
            text: "you are registred",
            showConfirmButton: false,
            timer: 2500,
          });
          const from = location.state?.from?.pathname || "/login";
          navigate(from, { replace: true });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...!",
            text: "Username exists",
            showConfirmButton: false,
            timer: 2500,
          });
          const from = location.state?.from?.pathname || "/register";
          navigate(from, { replace: true });
        }
      });
    }
  };

  return (
    <>
      <Header />
      <div className="register">
        <div className="content-register">
          <h2 className="title-register">Register</h2>{" "}
          <Form onSubmit={onSubmit} className="table-register">
            <div className="input-group">
              <span className="input-group-text">User Name</span>

              <input
                type="text"
                aria-label="username"
                name="username"
                className="form-control"
                placeholder="required"
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">Password</span>

              <input
                type="password"
                aria-label="password"
                name="password"
                className="form-control"
                p
                placeholder="required"
              />
            </div>
            <div className="input-group">
              <span className="input-group-text"> Repeat Password</span>

              <input
                type="password"
                aria-label="passwordConfirm"
                name="passwordConfirm"
                className="form-control"
                placeholder="required"
              />
            </div>

            <div>
              <Button type="submit" variant="outline-warning">
                Submit
              </Button>{" "}
              <Button type="reset" variant="outline-danger">
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
