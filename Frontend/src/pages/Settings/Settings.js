import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";
import settingsValidations from "./validateForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Settings.css";

import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";

export function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const first_name = formData.get("firstName");
    const last_name = formData.get("lastName");
    const address = formData.get("address");
    const phone = formData.get("phoneNumber");

    if (!settingsValidations(email, first_name, last_name, address, phone)) {
      auth.settings({ email, first_name, last_name, address, phone }, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.

        Swal.fire({
          icon: "success",
          title: 'Great"!',
          text: "your changes are saved",
          showConfirmButton: false,
          timer: 2500,
        });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <>
      <Header />
      <div className="register">
        <div className="content-register">
          <h2 className="title-register">Settings</h2>{" "}
          <Form onSubmit={onSubmit} className="table-register">
            <div className="input-group">
              <span className="input-group-text">E-mail</span>
              <input
                type="text"
                aria-label="email"
                name="email"
                className="form-control"
                placeholder=""
              />{" "}
            </div>
            <div className="input-group">
              <span className="input-group-text">First Name</span>

              <input
                type="text"
                aria-label="firstName"
                name="firstName"
                className="form-control"
                placeholder=""
              />
              <span className="input-group-text">Last Name</span>

              <input
                type="text"
                aria-label="lastName"
                name="lastName"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">Address </span>
              <input
                type="text"
                aria-label="address"
                name="address"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">Phone Number</span>
              <input
                type="text"
                aria-label="phoneNumber"
                name="phoneNumber"
                className="form-control"
                placeholder=""
              />{" "}
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
