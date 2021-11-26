import validations from './registerValidations';
import Swal from 'sweetalert2';

export default function validateForm(username, password, confirmPassword) {
  const doesPasswordsMatch = validations.doesPasswordsMatch(
    password,
    confirmPassword
  );

  const isRequired = validations.isRequired(
    password,
    confirmPassword,
    username
  );

  const isPasswordValid = validations.isPasswordValid(password);

  const isUserNameValid = validations.isUserNameValid(username);

  let swalText = '';

  if (isRequired) swalText = 'Complete the required fields.';
  else {
    if (!isPasswordValid)
      swalText = 'Invalid Password. Must have at least 3 characteres.';

    if (!doesPasswordsMatch) swalText = 'Passwords do not match!';

    if (!isUserNameValid)
      swalText =
        'Invalid username. Must only contain letters or numbers and at least 3 characteres.';
  }

  if (swalText !== '') {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: swalText,
      footer: 'Try again',
      showConfirmButton: false,
      timer: 2500,
    });
  } else {
    return false;
  }
}
