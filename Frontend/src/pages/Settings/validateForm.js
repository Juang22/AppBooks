import validations from "./settingsValidations";
import Swal from "sweetalert2";

export default function validateForm(
  email,
  firstName,
  lastName,
  address,
  phoneNumber
) {
  const isValidEmail = validations.isValidEmail(email);

  const isFirstNameValid = validations.isFirstNameValid(firstName);

  const isLastNameValid = validations.isLastNameValid(lastName);
  const isAddressValid = validations.isAddressValid(address);

  const isPhoneValid = validations.isPhoneValid(phoneNumber);

  let swalText = "";

  if (!isPhoneValid)
    swalText = "Invalid phone. Must have at least 10 characteres.";

  if (!isAddressValid)
    swalText = "Invalid address. Must have at least 3 characteres.";

  if (!isFirstNameValid)
    swalText =
      "Invalid name. Must only contain letters and at least 3 characteres.";

  if (!isLastNameValid)
    swalText =
      "Invalid last name. Must only contain letters and at least 3 characteres.";

  if (!isValidEmail)
    swalText = `Invalid email. Must look like this 'example@example.com' `;

  if (swalText !== "") {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: swalText,
      footer: "Try again",
      showConfirmButton: false,
      timer: 2500,
    });
  } else {
    return false;
  }
}
